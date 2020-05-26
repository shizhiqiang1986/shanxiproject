#codding:utf-8
from rest_framework import serializers
from .models import *


class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lte_site_info
        fields = "__all__"

class InfoSerializerb(serializers.ModelSerializer):
    class Meta:
        model = Lte_site_info
        fields = ["cellname"]

class BusySerializer(serializers.ModelSerializer):
    cell_name = InfoSerializerb()
    class Meta:
        model = Lte_Kpi_Busy
        fields ="__all__"