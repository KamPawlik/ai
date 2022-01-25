from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from rate.views import RateViewSet

router = DefaultRouter()
router.register('rates', RateViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('auth/', include('auth.urls')),
    path('admin/', admin.site.urls),
]
