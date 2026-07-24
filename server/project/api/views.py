from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from services.trip_planner_service import TripPlannerService

from api.serializers.request import TripPlannerSerializer

class PlanTripAPIView(APIView):


    def post(self,request):

        serializer = (
            TripPlannerSerializer(
                data=request.data
            )
        )


        # serializer.is_valid(
        #     raise_exception=True
        # )

        if not serializer.is_valid():

            print(serializer.errors)

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )


        response = (

            TripPlannerService
            .plan_trip(

                serializer.validated_data

            )

        )


        return Response(
            response
        )