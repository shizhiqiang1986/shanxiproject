from django.urls import path,include,re_path
from .views import *


urlpatterns = [
    path(r"api/siteinfo",SiteInfoApi.as_view(),name="siteinfoapi"),
    path(r"api/busykpiinfo",BusyApi.as_view(),name='busykpiinfoapi'),
    path(r'kpitables',kpitables,name='kpitables'),
    path(r'mdt',mdt,name='mdt'),
    path(r'siteinfo',siteinfo,name='siteinfo'),
]

