import requests

from django.conf import settings


class GeocodingService:

    @staticmethod
    def get_coordinates(location, country):

        url = "https://graphhopper.com/api/1/geocode"

        params = {
            "q": f"{location}, {country}",
            "limit": 1,
            "key": settings.GRAPHHOPPER_API_KEY
        }

        response = requests.get(
            url=url,
            params=params
        )

        response.raise_for_status()

        data = response.json()

        hits = data.get("hits", [])

        if not hits:
            raise Exception(
                f"No location found for {location}"
            )

        point = hits[0]["point"]

        return {

            "latitude": point["lat"],

            "longitude": point["lng"]

        }

    @staticmethod
    def reverse_geocode(
        latitude,
        longitude
    ):

        url = (
            "https://graphhopper.com/api/1/geocode"
        )

        params = {

            "reverse": True,

            "point":
            f"{latitude},{longitude}",

            "key":
            settings.GRAPHHOPPER_API_KEY

        }


        response = requests.get(

            url=url,

            params=params

        )


        response.raise_for_status()


        data = response.json()


        hits = data.get(
            "hits",
            []
        )


        if not hits:

            return {

                "city": None,

                "country": None

            }


        address = (
            hits[0]
            .get(
                "address",
                {}
            )
        )


        return {

            "city":
            address.get(
                "city"
            ),

            "country":
            address.get(
                "country"
            )

        }