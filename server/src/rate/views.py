from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Rate
from .serializers import RateSerializer


class RateViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Rate.objects.all()
    serializer_class = RateSerializer

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return None
        return self.request.user.rates
