from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import TokenView, RegisterView

urlpatterns = [
    path('login/', TokenView.as_view(), name='token'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
]
