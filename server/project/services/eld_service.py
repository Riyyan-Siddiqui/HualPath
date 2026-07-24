
from datetime import datetime, timedelta
from math import ceil

from constant import (
    MAX_DRIVING_HOURS,
)

class ELDService:

    @staticmethod
    def calculate_total_days(route):
        driving_hours = route["duration_hours"]
        return max(1, ceil(driving_hours / MAX_DRIVING_HOURS))

    @staticmethod
    def generate_daily_logs(route, timeline):

        def new_day(day_number, date):
            return {
                "day": day_number,
                "date": date.strftime("%Y-%m-%d"),
                "driving_hours": 0,
                "off_duty_hours": 0,
                "on_duty_hours": 0,
                "sleeper_hours": 0,
                "events": [],
            }

        def add_duration(day, event_type, duration):
            if event_type == "Driving":
                day["driving_hours"] += duration
            elif event_type == "30 Minute Break":
                day["sleeper_hours"] += duration
            elif event_type == "10 Hour Off Duty":
                day["off_duty_hours"] += duration
            else:
                day["on_duty_hours"] += duration

        logs = []
        current_day = None
        day_number = 0

        for event in timeline:
            start = event["arrival_dt"]
            end = event["departure_dt"]
            segment_start = start

            while True:
                midnight = datetime.combine(
                    segment_start.date(), datetime.min.time()
                ) + timedelta(days=1)

                segment_end = min(end, midnight)
                duration = (segment_end - segment_start).total_seconds() / 3600

                segment_date_str = segment_start.strftime("%Y-%m-%d")
                if current_day is None or current_day["date"] != segment_date_str:
                    if current_day is not None:
                        logs.append(current_day)
                    day_number += 1
                    current_day = new_day(day_number, segment_start)

                clean_event = {k: v for k, v in event.items() if k not in ("arrival_dt", "departure_dt")}
                current_day["events"].append({
                    **clean_event,
                    "arrival_time": segment_start.strftime("%I:%M %p"),
                    "departure_time": segment_end.strftime("%I:%M %p"),
                    "duration_hours": round(duration, 2),
                })
                add_duration(current_day, event["event"], duration)

                if segment_end >= end:
                    break
                segment_start = segment_end

        if current_day and current_day["events"]:
            logs.append(current_day)

        return {
            "total_days": len(logs),
            "daily_logs": logs,
        }