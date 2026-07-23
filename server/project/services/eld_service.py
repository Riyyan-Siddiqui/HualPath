from math import ceil

from constant import (
    MAX_DRIVING_HOURS,
    OFF_DUTY_HOURS
)


class ELDService:

    @staticmethod
    def calculate_total_days(route):

        driving_hours = route["duration_hours"]

        return max(
            1,
            ceil(driving_hours / MAX_DRIVING_HOURS)
        )

    @staticmethod
    def generate_daily_logs(route, timeline):

        logs = []

        current_day = {
            "day": 1,
            "driving_hours": 0,
            "on_duty_hours": 0,
            "break_hours": 0,
            "off_duty_hours": 0,
            "events": []
        }

        day = 1

        for event in timeline:

            duration = event.get("duration_hours", 0)

            current_day["events"].append(event)

            if event["event"] == "Driving":

                current_day["driving_hours"] += duration

            elif event["event"] == "30 Minute Break":

                current_day["break_hours"] += duration

            elif event["event"] == "10 Hour Off Duty":

                current_day["off_duty_hours"] += duration

                logs.append(current_day)

                day += 1

                current_day = {
                    "day": day,
                    "driving_hours": 0,
                    "on_duty_hours": 0,
                    "break_hours": 0,
                    "off_duty_hours": 0,
                    "events": []
                }

            else:

                current_day["on_duty_hours"] += duration

        if current_day["events"]:

            logs.append(current_day)

        return {
            "total_days": len(logs),
            "daily_logs": logs
        }