import requests

from django.conf import settings


class GraphHopperService:

    @staticmethod
    def get_route(
        locations
    ):

        points = []

        for location in locations:
            point = (
                f"{location['latitude']},"
                f"{location['longitude']}"
            )

            points.append(point)



        params = {

            "point": [
                points
            ],

            "profile": "car",

            "instructions": True,

            "points_encoded": False,

            "key": settings.GRAPHHOPPER_API_KEY,

        }


        response = requests.get(

            settings.GRAPHHOPPER_URL,

            params=params

        )


        response.raise_for_status()


        data = response.json()


        return GraphHopperService.parse_response(data)


    @staticmethod
    def parse_response(data):


        path = data["paths"][0]


        return {

            "distance_miles":
            round(path["distance"]/1609.34,2),


            "duration_hours":
            round(path["time"]/3600000, 2),


            "polyline":
            path["points"]["coordinates"],


            "instructions":
            path["instructions"]

        }

    @staticmethod
    def get_distance(
        origin,
        destination
    ):

        response = requests.get(

            settings.GRAPHHOPPER_URL,

            params={

                "point": [

                    f"{origin['latitude']},{origin['longitude']}",

                    f"{destination['latitude']},{destination['longitude']}"

                ],

                "profile": "car",

                "points_encoded": "false",

                "instructions": "false",

                "key": settings.GRAPHHOPPER_API_KEY

            }

        )

        response.raise_for_status()

        path = response.json()["paths"][0]

        return {

            "distance_miles":
            round(
                path["distance"] / 1609.34,
                2
            ),

            "duration_hours":
            round(
                path["time"] / 3600000,
                2
            )

        }