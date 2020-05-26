from django.db import models

class Lte_site_info(models.Model):
    city = models.CharField(max_length=10, null=True, blank=True)
    district = models.CharField(max_length=10, null=True, blank=True)
    enodebid = models.IntegerField(null=True, blank=True)
    ci = models.IntegerField(null=True, blank=True)
    cellid = models.CharField(max_length=20)
    enodebname = models.CharField(max_length=100, null=True, blank=True)
    cellname = models.CharField(max_length=100, null=True, blank=True)
    grid_old = models.CharField(max_length=10, null=True, blank=True)
    grid_marketing = models.CharField(max_length=10, null=True, blank=True)
    grid_branch = models.CharField(max_length=10, null=True, blank=True)
    subnet_id = models.IntegerField(null=True, blank=True)
    tac = models.IntegerField(null=True, blank=True)
    pci = models.IntegerField(null=True, blank=True)
    band = models.IntegerField(null=True, blank=True)
    sectorid = models.IntegerField(null=True, blank=True)
    eci = models.IntegerField(null=True, blank=True)
    enblongitude = models.FloatField(null=True, blank=True)
    enblatitude = models.FloatField(null=True, blank=True)
    celllongitude = models.FloatField(null=True, blank=True)
    celllatitude = models.FloatField(null=True, blank=True)
    cover_type = models.CharField(max_length=10, null=True, blank=True)
    site_type = models.CharField(max_length=20, null=True, blank=True)
    site_height = models.IntegerField(null=True, blank=True)
    site_azimuth = models.IntegerField(null=True, blank=True)
    mechanics_angle = models.IntegerField(null=True, blank=True)
    electrical_angle = models.IntegerField(null=True, blank=True)
    commonmsg = models.CharField(max_length=20, null=True, blank=True)
    bandwidth = models.IntegerField(null=True, blank=True)
    freq_ul = models.FloatField(null=True, blank=True)
    freq_dl = models.FloatField(null=True, blank=True)
    tower_type = models.CharField(max_length=20, null=True, blank=True)
    common_type = models.CharField(max_length=100, null=True, blank=True)
    antenna_type = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    howtogo = models.CharField(max_length=200, null=True, blank=True)
    buid_period = models.CharField(max_length=20, null=True, blank=True)
    co_3grncnodeb = models.IntegerField(null=True, blank=True)
    co_3grnccellid = models.IntegerField(null=True, blank=True)
    co_2gcellid = models.CharField(max_length=20,null=True, blank=True)
    site_state = models.CharField(max_length=20, null=True, blank=True)
    onair_date = models.DateField(null=True, blank=True)
    networking_type = models.CharField(max_length=100, null=True, blank=True)
    ground = models.CharField(max_length=100, null=True, blank=True)
    device_types = models.CharField(max_length=100, null=True, blank=True)
    ip = models.CharField(max_length=20, null=True, blank=True)
    class Meta:
        db_table = 'lte_site_info'
    def __str__(self):
        return self.cellname

class Lte_Kpi_Busy(models.Model):
    time=models.DateField()
    cell_id =models.CharField(max_length=20)
    cell_name = models.ForeignKey(Lte_site_info, on_delete=models.SET_NULL,null=True,blank=True)
    RTWPperrb=models.FloatField(null=True,blank=True)
    RRC_congestion_num =models.IntegerField(null=True,blank=True)
    ERAB_congestion_num =models.IntegerField(null=True,blank=True)
    RRC_connectuser_avg=models.FloatField(null=True,blank=True)
    RRC_license_num=models.IntegerField(null=True,blank=True)
    RRC_connectuser_num_max =models.IntegerField(null=True,blank=True)
    RRC_connect_succ_num=models.IntegerField(null=True,blank=True)
    RRC_connect_req_num =models.IntegerField(null=True,blank=True)
    RRC_connect_rate =models.FloatField(null=True,blank=True)
    RRC_reconnect_succ_num=models.IntegerField(null=True,blank=True)
    RRC_reconnect_req_num =models.IntegerField(null=True,blank=True)
    RRC_reconnect_rate =models.FloatField(null=True,blank=True)
    ERAB_connect_succ_num=models.IntegerField(null=True,blank=True)
    ERAB_connect_req_num =models.IntegerField(null=True,blank=True)
    ERAB_connect_rate =models.FloatField(null=True,blank=True)
    Connection_rate =models.FloatField(null=True,blank=True)
    ERAB_release_anomalous_num =models.IntegerField(null=True,blank=True)
    ERAB_release_att_num =models.IntegerField(null=True,blank=True)
    ERAB_drop_rate =models.FloatField(null=True,blank=True)
    handover_intra_succ_num=models.IntegerField(null=True,blank=True)
    handover_intra_req_num =models.IntegerField(null=True,blank=True)
    handover_intra_rate =models.FloatField(null=True,blank=True)
    handover_inter_succ_num=models.IntegerField(null=True,blank=True)
    handover_inter_req_num =models.IntegerField(null=True,blank=True)
    handover_inter_rate =models.FloatField(null=True,blank=True)
    handover_x2_num =models.IntegerField(null=True,blank=True)
    handover_s1_num =models.IntegerField(null=True,blank=True)
    handover_x2_rate =models.FloatField(null=True,blank=True)
    CQI_upto6_num=models.IntegerField(null=True,blank=True)
    CQI_att_num =models.IntegerField(null=True,blank=True)
    CQI_upto6_rate =models.FloatField(null=True,blank=True)
    CQI_AVG =models.FloatField(null=True,blank=True)
    PRB_usage_num_dl=models.FloatField(null=True,blank=True)
    PRB_att_num_dl =models.IntegerField(null=True,blank=True)
    PRB_utilization_dl=models.FloatField(null=True,blank=True)
    TTI_schedule_num_dl =models.IntegerField(null=True,blank=True)
    Sensing_rate_ul=models.FloatField(null=True,blank=True)
    Sensing_rate_dl =models.FloatField(null=True,blank=True)
    throughput =models.FloatField(null=True,blank=True)
    TB_one_num=models.IntegerField(null=True,blank=True)
    TB_double_num =models.IntegerField(null=True,blank=True)
    TB_double_rate =models.FloatField(null=True,blank=True)
    LTE_UTRAN_redirect_blind=models.IntegerField(null=True,blank=True)
    LTE_UTRAN_redirect_noblind=models.IntegerField(null=True,blank=True)
    LTE_GSM_redirect_blind=models.IntegerField(null=True,blank=True)
    LTE_GSM_redirect_noblind=models.IntegerField(null=True,blank=True)
    RLC_PDU_retrans_num=models.IntegerField(null=True,blank=True)
    RLC_PDU_att_num =models.IntegerField(null=True,blank=True)
    RLC_PDU_retrans_rate =models.FloatField(null=True,blank=True)
    Out_of_service_time=models.IntegerField(null=True,blank=True)
    Running_att_time=models.IntegerField(null=True,blank=True)
    Cell_usage_rate=models.FloatField(null=True,blank=True)
    poor_Connection_rate=models.BooleanField()
    poor_Drop_rate = models.BooleanField()
    poor_intrahand_rate = models.BooleanField()
    poor_CQI_rate = models.BooleanField()
    poor_RTWP = models.BooleanField()
    poor_Sensing_rate = models.BooleanField()
    poor_X2handover_rate = models.BooleanField()
    poor_interhand_rate = models.BooleanField()
    poor_RRCongestion_mun = models.BooleanField()
    poor_ERABcongestion_mun = models.BooleanField()
    poor_rediricttoUMTS_mun = models.BooleanField()
    poor_rediricttoGSM_mun = models.BooleanField()
    poor_zerothroughput = models.BooleanField()
    poor_Cellusage_rate = models.BooleanField()
    poor_num = models.IntegerField(null=True,blank=True)

    class Meta:
        db_table='lte_kpi_busy'


class Lte_Kpi_Daily(models.Model):
    time=models.DateField()
    cell_id =models.CharField(max_length=20)
    cell_name = models.ForeignKey(Lte_site_info, on_delete=models.SET_NULL,null=True,blank=True)
    RTWPperrb=models.FloatField(null=True,blank=True)
    RRC_congestion_num =models.IntegerField(null=True,blank=True)
    ERAB_congestion_num =models.IntegerField(null=True,blank=True)
    RRC_connectuser_avg=models.FloatField(null=True,blank=True)
    RRC_license_num=models.IntegerField(null=True,blank=True)
    RRC_connectuser_num_max =models.IntegerField(null=True,blank=True)
    RRC_connect_succ_num=models.IntegerField(null=True,blank=True)
    RRC_connect_req_num =models.IntegerField(null=True,blank=True)
    RRC_connect_rate =models.FloatField(null=True,blank=True)
    RRC_reconnect_succ_num=models.IntegerField(null=True,blank=True)
    RRC_reconnect_req_num =models.IntegerField(null=True,blank=True)
    RRC_reconnect_rate =models.FloatField(null=True,blank=True)
    ERAB_connect_succ_num=models.IntegerField(null=True,blank=True)
    ERAB_connect_req_num =models.IntegerField(null=True,blank=True)
    ERAB_connect_rate =models.FloatField(null=True,blank=True)
    Connection_rate =models.FloatField(null=True,blank=True)
    ERAB_release_anomalous_num =models.IntegerField(null=True,blank=True)
    ERAB_release_att_num =models.IntegerField(null=True,blank=True)
    ERAB_drop_rate =models.FloatField(null=True,blank=True)
    handover_intra_succ_num=models.IntegerField(null=True,blank=True)
    handover_intra_req_num =models.IntegerField(null=True,blank=True)
    handover_intra_rate =models.FloatField(null=True,blank=True)
    handover_inter_succ_num=models.IntegerField(null=True,blank=True)
    handover_inter_req_num =models.IntegerField(null=True,blank=True)
    handover_inter_rate =models.FloatField(null=True,blank=True)
    handover_x2_num =models.IntegerField(null=True,blank=True)
    handover_s1_num =models.IntegerField(null=True,blank=True)
    handover_x2_rate =models.FloatField(null=True,blank=True)
    CQI_upto6_num=models.IntegerField(null=True,blank=True)
    CQI_att_num =models.IntegerField(null=True,blank=True)
    CQI_upto6_rate =models.FloatField(null=True,blank=True)
    CQI_AVG =models.FloatField(null=True,blank=True)
    PRB_usage_num_dl=models.FloatField(null=True,blank=True)
    PRB_att_num_dl =models.IntegerField(null=True,blank=True)
    PRB_utilization_dl=models.FloatField(null=True,blank=True)
    TTI_schedule_num_dl =models.IntegerField(null=True,blank=True)
    Sensing_rate_ul=models.FloatField(null=True,blank=True)
    Sensing_rate_dl =models.FloatField(null=True,blank=True)
    throughput =models.FloatField(null=True,blank=True)
    TB_one_num=models.IntegerField(null=True,blank=True)
    TB_double_num =models.IntegerField(null=True,blank=True)
    TB_double_rate =models.FloatField(null=True,blank=True)
    LTE_UTRAN_redirect_blind=models.IntegerField(null=True,blank=True)
    LTE_UTRAN_redirect_noblind=models.IntegerField(null=True,blank=True)
    LTE_GSM_redirect_blind=models.IntegerField(null=True,blank=True)
    LTE_GSM_redirect_noblind=models.IntegerField(null=True,blank=True)
    RLC_PDU_retrans_num=models.IntegerField(null=True,blank=True)
    RLC_PDU_att_num =models.IntegerField(null=True,blank=True)
    RLC_PDU_retrans_rate =models.FloatField(null=True,blank=True)
    Out_of_service_time=models.IntegerField(null=True,blank=True)
    Running_att_time=models.IntegerField(null=True,blank=True)
    Cell_usage_rate=models.FloatField(null=True,blank=True)
    poor_Connection_rate=models.BooleanField()
    poor_Drop_rate = models.BooleanField()
    poor_intrahand_rate = models.BooleanField()
    poor_CQI_rate = models.BooleanField()
    poor_RTWP = models.BooleanField()
    poor_Sensing_rate = models.BooleanField()
    poor_X2handover_rate = models.BooleanField()
    poor_interhand_rate = models.BooleanField()
    poor_RRCongestion_mun = models.BooleanField()
    poor_ERABcongestion_mun = models.BooleanField()
    poor_rediricttoUMTS_mun = models.BooleanField()
    poor_rediricttoGSM_mun = models.BooleanField()
    poor_zerothroughput = models.BooleanField()
    poor_Cellusage_rate = models.BooleanField()
    poor_num = models.IntegerField(null=True,blank=True)
    class Meta:
        db_table='lte_kpi_daily'

