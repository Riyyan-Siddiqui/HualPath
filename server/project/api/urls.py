from django.urls import path
from .views import PlanTripAPIView

urlpatterns = [
    path(
        "plan-trip/create/",
        PlanTripAPIView.as_view(),
        name="plan-trip"
    )
]