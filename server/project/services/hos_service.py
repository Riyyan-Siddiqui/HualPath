from constant import (
    MAX_DRIVING_HOURS,
    BREAK_AFTER_HOURS,
    BREAK_DURATION,
    OFF_DUTY_HOURS,
    PICKUP_DURATION,
    DROPOFF_DURATION
)
from services.grasshopper_service import GraphHopperService


class HOSService:

    @staticmethod
    def calculate_hos(data, route, coordinates):

        driving_schedule = (
            HOSService.calculate_driving_schedule(
                data,
                route,
                coordinates
            )
        )

        return {

            "can_complete_trip":
            HOSService.is_cycle_valid(
                data,
                route
            ),

            "driving_schedule":
            driving_schedule,

            "remaining_cycle_hours":
            HOSService.calculate_remaining_cycle_hours(
                data,
                route
            ),

            "requires_34_hour_reset":
            not HOSService.is_cycle_valid(
                data,
                route
            )

        }


    @staticmethod
    def calculate_driving_schedule(
        data,
        route,
        coordinates
    ):

        origin = {
            "latitude": coordinates[0]["latitude"],
            "longitude": coordinates[0]["longitude"]
        }

        duration = route.get(
            "duration_hours",
            0
        )

        schedule = []

        # Driving Schedule
        while duration > 0:

            # Full Shift
            if duration > MAX_DRIVING_HOURS:

                # First 8 hours driving
                schedule.append({

                    "event": "Driving",

                    "duration_hours":
                    BREAK_AFTER_HOURS, 

                })


                # Mandatory 30 minute break
                schedule.append({

                    "event": "30 Minute Break",

                    "duration_hours":
                    BREAK_DURATION,

                    "after_hours": 8

                })


                # Remaining 3 hours driving
                schedule.append({

                    "event": "Driving",

                    "duration_hours":
                    (
                        MAX_DRIVING_HOURS
                        -
                        BREAK_AFTER_HOURS
                    )

                })


                # Mandatory 10 hour rest
                schedule.append({

                    "event":
                    "10 Hour Off Duty",

                    "duration_hours":
                    OFF_DUTY_HOURS,

                    "after_hours": 11

                })


                duration -= (
                    MAX_DRIVING_HOURS
                )


            # Last Shift
            else:

                if duration >= BREAK_AFTER_HOURS:

                    schedule.append({

                        "event":
                        "Driving",

                        "duration_hours":
                        BREAK_AFTER_HOURS

                    })


                    schedule.append({

                        "event":
                        "30 Minute Break",

                        "duration_hours":
                        BREAK_DURATION,

                        "after_hours": 8

                    })


                    duration -= (
                        BREAK_AFTER_HOURS
                    )


                    if duration > 0:

                        schedule.append({

                            "event":
                            "Driving",

                            "duration_hours":
                            duration

                        })


                else:

                    schedule.append({

                        "event":
                        "Driving",

                        "duration_hours":
                        duration

                    })


                duration = 0


        # Route events (Pickups + Dropoffs)
        current_origin = {
            "latitude": coordinates[0]["latitude"],
            "longitude": coordinates[0]["longitude"]
        }

        total_distance = 0
        coordinate_index = 1

        # Pickups
        for pickup in data.get("pickup_locations", []):

            destination = {
                "latitude": coordinates[coordinate_index]["latitude"],
                "longitude": coordinates[coordinate_index]["longitude"]
            }

            leg = GraphHopperService.get_distance(
                current_origin,
                destination
            )

            total_distance += leg["distance_miles"]

            schedule.append({
                "event": "Pickup",
                "duration_hours": PICKUP_DURATION,
                "location": pickup,
                "latitude": destination["latitude"],
                "longitude": destination["longitude"],
                "distance_miles": total_distance
            })

            current_origin = destination
            coordinate_index += 1


        # Dropoffs
        for dropoff in data.get("dropoff_locations", []):

            destination = {
                "latitude": coordinates[coordinate_index]["latitude"],
                "longitude": coordinates[coordinate_index]["longitude"]
            }

            leg = GraphHopperService.get_distance(
                current_origin,
                destination
            )

            total_distance += leg["distance_miles"]

            schedule.append({
                "event": "Dropoff",
                "duration_hours": DROPOFF_DURATION,
                "location": dropoff,
                "latitude": destination["latitude"],
                "longitude": destination["longitude"],
                "distance_miles": total_distance
            })

            current_origin = destination
            coordinate_index += 1


        return schedule


    @staticmethod
    def calculate_remaining_cycle_hours(
        data,
        route
    ):

        duration = (
            route.get(
                "duration_hours",
                0
            )
        )


        cycle_used = (
            data.get(
                "current_cycle_used",
                0
            )
        )


        pickup_hours = (

            len(
                data.get(
                    "pickup_locations",
                    []
                )
            )

            *
            PICKUP_DURATION

        )


        dropoff_hours = (

            len(
                data.get(
                    "dropoff_locations",
                    []
                )
            )

            *
            DROPOFF_DURATION

        )


        total_hours = (

            duration
            +
            cycle_used
            +
            pickup_hours
            +
            dropoff_hours

        )


        return max(

            70 - total_hours,

            0

        )


    @staticmethod
    def is_cycle_valid(
        data,
        route
    ):

        duration = (
            route.get(
                "duration_hours",
                0
            )
        )


        cycle_used = (
            data.get(
                "current_cycle_used",
                0
            )
        )


        pickup_hours = (

            len(
                data.get(
                    "pickup_locations",
                    []
                )
            )

            *
            PICKUP_DURATION

        )


        dropoff_hours = (

            len(
                data.get(
                    "dropoff_locations",
                    []
                )
            )

            *
            DROPOFF_DURATION

        )


        total_hours = (

            duration
            +
            cycle_used
            +
            pickup_hours
            +
            dropoff_hours

        )


        return total_hours <= 70