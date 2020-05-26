from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from django.db.models import Q
import datetime
from django.contrib.auth.decorators import login_required



class SiteInfoApi(generics.ListAPIView):
    # queryset = Lte_site_info.objects.all()[:10]
    serializer_class = InfoSerializer
    def get_queryset(self):
        query_params = self.request.query_params
        try:
            return Lte_site_info.objects.filter(cellname=query_params['cellname'])
        except:

            if len(query_params) == 1 and query_params['_']:
                return Lte_site_info.objects.all()[:100]
            else:
                citydict = {'xa': '西安', 'wn': '渭南', 'ak': '安康', 'xy': '咸阳', 'bj': '宝鸡', 'ya': '延安', 'yl': '榆林'}
                city = citydict[str(query_params['city'])]
                return Lte_site_info.objects.filter(city=city)

class BusyApi(generics.ListAPIView):
    serializer_class = BusySerializer

    def get_queryset(self):
        query_params = self.request.query_params
        if len(query_params)==1 and query_params['_']:
            return Lte_Kpi_Busy.objects.filter(cell_name__city='西安')[:100]
        else:
            if str(query_params['kpitime'])=='busy':
                alldata=Lte_Kpi_Busy.objects
            else:
                alldata = Lte_Kpi_Daily.objects

            citydict = {'xa':'西安','wn':'渭南','ak':'安康','xy':'咸阳','bj':'宝鸡','ya':'延安','yl':'榆林'}
            city=citydict[str(query_params['city'])]
            alldata=alldata.filter(cell_name__city=city)

            if query_params['celllist'] != '':
                celllist = str(query_params['celllist']).split(',')
                alldata = alldata.filter(cell_id__in=celllist)

            if query_params['datetime'] and query_params['datetime'] != '' :
                date = datetime.datetime.strptime(query_params['datetime']+' 00:00:00','%Y-%m-%d %H:%M:%S')
                alldata = alldata.filter(time=date)

            poorcelldict = {"1": "poor_Connection_rate", "2": "poor_Drop_rate", "3": "poor_intrahand_rate", "4": "poor_CQI_rate", "5": "poor_RTWP",
                            "6": "poor_Sensing_rate", "7": "poor_X2handover_rate", "8": "poor_interhand_rate", "9": "poor_RRCongestion_mun", "10": "poor_ERABcongestion_mun",
                            "11": "poor_rediricttoUMTS_mun", "12": "poor_rediricttoGSM_mun", "13": "poor_zerothroughput", "14": "poor_Cellusage_rate"}

            if query_params.getlist('poortype')!=[''] or len(query_params.getlist('poortype'))!=14:
                q = Q()
                for x in query_params.getlist('poortype'):
                    poor = poorcelldict[x]
                    q = q | Q(**{poor:True})
                alldata=alldata.filter(q)

            return alldata

@login_required
def kpitables(request):
    return render(request,'kpi/kpitables.html')
@login_required
def mdt(request):
    return render(request, 'kpi/mdt.html')
@login_required
def siteinfo(request):
    return render(request, 'kpi/siteinfo.html')

