from django.urls import path
from .views import *
urlpatterns = [
    path('',loginview),
    path('logout/',logoutview),
]