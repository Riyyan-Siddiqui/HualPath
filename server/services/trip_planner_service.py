from services import grasshopper_service
from services.geocoding_service import GeocodingService
from services.compliance_service import ComplianceService
from services.eld_service import ELDService
from services.fuel_service import FuelService
from services.timeline_service import TimelineService
from services.fuel_service import FuelService
from services.hos_service import HOSService
from rest_framework.exceptions import ValidationError






class TripPlannerService:

    @staticmethod
    def plan_trip(data):

        # validate business rules
        # TripPlannerService.validate_trip(data)

        locations = [

            data["current_location"],

            *data["pickup_locations"],

            *data["dropoff_locations"]

        ]

        coordinates = []
        # country = data["country"]

        for location in locations:
            point = (
                GeocodingService.get_coordinates(location)
            )

            coordinates.append(point)

        route = (
            grasshopper_service.GraphHopperService
            .get_route(
                coordinates
            )
        )

        # map
        # route = MapService.get_route(data)

        # statistics
        # statistics = TripService.calculate_statistics(route)

        # # fuel
        fuel = FuelService.calculate_fuel(data, route)

        # # hos
        hos = HOSService.calculate_hos(
            data,
            route,
            coordinates
        )

        # # timeline
        timeline = TimelineService.generate_timeline(
            route,
            hos,
            fuel
        )

        # # eld logs
        logs = ELDService.generate_daily_logs(
            route,
            timeline
        )

        # # compliance
        # compliance = (
        #     ComplianceService
        #     .check_trip_compliance(
        #         route,
        #         fuel,
        #         hos
        #     )
        # )

        return (
            # TripPlannerService
            # .build_response(
            #     route,
            #     statistics,
            #     fuel,
            #     hos,
            #     timeline,
            #     logs,
            #     compliance
            # )

            {
                "route": route,
                "hos": hos,
                "fuel": fuel,
                "timeline": timeline,
                "eld": logs

            }
        )


    # @staticmethod
    # def build_response(route,
    #                 statistics,
    #                 fuel,
    #                 hos,
    #                 timeline,
    #                 logs,
    #                 compliance):

    #     return{

    #         "trip_summary":{},

    #         "route":route,

    #         "statistics":statistics,

    #         "cycle_hours":hos,

    #         "timeline":timeline,

    #         "daily_logs":logs,

    #         "compliance":compliance

    #     }


    # @staticmethod
    # def validate_trip(data):

    #     if data["current_cycle_used"] > 70:
    #         raise ValidationError({
    #             "current_cycle_used": "Cycle hours cannot exceed 70."
    #         })


    #     if data["current_cycle_used"] < 0:
    #         raise ValidationError()


    #     if (
    #         data["pickup_location"]
    #         ==
    #         data["dropoff_location"]
    #     ):
    #         raise ValidationError({
    #             "pickup_location":
    #             "Pickup location cannot be the same as the dropoff location."
    #         })