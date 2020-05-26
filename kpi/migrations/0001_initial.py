# Generated by Django 2.2.5 on 2020-03-25 06:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Lte_site_info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=10, null=True)),
                ('district', models.CharField(max_length=10, null=True)),
                ('equipmentvendors', models.CharField(max_length=10, null=True)),
                ('enbid', models.IntegerField(null=True)),
                ('cellid', models.CharField(max_length=20)),
                ('cellname', models.CharField(max_length=100, null=True)),
                ('longitude', models.FloatField(null=True)),
                ('latitude', models.FloatField(null=True)),
                ('praiseground', models.CharField(max_length=20, null=True)),
                ('groundclass1', models.CharField(max_length=20, null=True)),
                ('groundclass2', models.CharField(max_length=50, null=True)),
                ('coveragetype', models.CharField(max_length=10, null=True)),
            ],
            options={
                'db_table': 'lte_site_info',
            },
        ),
        migrations.CreateModel(
            name='Lte_Kpi_Daily',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('RTWPperrb', models.FloatField(null=True)),
                ('RRC_congestion_num', models.IntegerField(null=True)),
                ('ERAB_congestion_num', models.IntegerField(null=True)),
                ('RRC_connectuser_avg', models.FloatField(null=True)),
                ('RRC_license_num', models.IntegerField(null=True)),
                ('RRC_connectuser_num_max', models.IntegerField(null=True)),
                ('RRC_connect_succ_num', models.IntegerField(null=True)),
                ('RRC_connect_req_num', models.IntegerField(null=True)),
                ('RRC_connect_rate', models.FloatField(null=True)),
                ('RRC_reconnect_succ_num', models.IntegerField(null=True)),
                ('RRC_reconnect_req_num', models.IntegerField(null=True)),
                ('RRC_reconnect_rate', models.FloatField(null=True)),
                ('ERAB_connect_succ_num', models.IntegerField(null=True)),
                ('ERAB_connect_req_num', models.IntegerField(null=True)),
                ('ERAB_connect_rate', models.FloatField(null=True)),
                ('Connection_rate', models.FloatField(null=True)),
                ('ERAB_release_anomalous_num', models.IntegerField(null=True)),
                ('ERAB_release_att_num', models.IntegerField(null=True)),
                ('ERAB_drop_rate', models.FloatField(null=True)),
                ('handover_intra_succ_num', models.IntegerField(null=True)),
                ('handover_intra_req_num', models.IntegerField(null=True)),
                ('handover_intra_rate', models.FloatField(null=True)),
                ('handover_inter_succ_num', models.IntegerField(null=True)),
                ('handover_inter_req_num', models.IntegerField(null=True)),
                ('handover_inter_rate', models.FloatField(null=True)),
                ('handover_x2_num', models.IntegerField(null=True)),
                ('handover_s1_num', models.IntegerField(null=True)),
                ('handover_x2_rate', models.FloatField(null=True)),
                ('CQI_upto6_num', models.IntegerField(null=True)),
                ('CQI_att_num', models.IntegerField(null=True)),
                ('CQI_upto6_rate', models.FloatField(null=True)),
                ('CQI_AVG', models.FloatField(null=True)),
                ('PRB_usage_num_dl', models.FloatField(null=True)),
                ('PRB_att_num_dl', models.IntegerField(null=True)),
                ('PRB_utilization_dl', models.FloatField(null=True)),
                ('TTI_schedule_num_dl', models.IntegerField(null=True)),
                ('Sensing_rate_ul', models.FloatField(null=True)),
                ('Sensing_rate_dl', models.FloatField(null=True)),
                ('throughput', models.FloatField(null=True)),
                ('TB_one_num', models.IntegerField(null=True)),
                ('TB_double_num', models.IntegerField(null=True)),
                ('TB_double_rate', models.FloatField(null=True)),
                ('LTE_UTRAN_redirect_blind', models.IntegerField(null=True)),
                ('LTE_UTRAN_redirect_noblind', models.IntegerField(null=True)),
                ('LTE_GSM_redirect_blind', models.IntegerField(null=True)),
                ('LTE_GSM_redirect_noblind', models.IntegerField(null=True)),
                ('RLC_PDU_retrans_num', models.IntegerField(null=True)),
                ('RLC_PDU_att_num', models.IntegerField(null=True)),
                ('RLC_PDU_retrans_rate', models.FloatField(null=True)),
                ('Out_of_service_time', models.IntegerField(null=True)),
                ('Running_att_time', models.IntegerField(null=True)),
                ('Cell_usage_rate', models.FloatField(null=True)),
                ('poor_Connection_rate', models.BooleanField()),
                ('poor_Drop_rate', models.BooleanField()),
                ('poor_intrahand_rate', models.BooleanField()),
                ('poor_CQI_rate', models.BooleanField()),
                ('poor_RTWP', models.BooleanField()),
                ('poor_Sensing_rate', models.BooleanField()),
                ('poor_X2handover_rate', models.BooleanField()),
                ('poor_interhand_rate', models.BooleanField()),
                ('poor_RRCongestion_mun', models.BooleanField()),
                ('poor_ERABcongestion_mun', models.BooleanField()),
                ('poor_rediricttoUMTS_mun', models.BooleanField()),
                ('poor_rediricttoGSM_mun', models.BooleanField()),
                ('poor_zerothroughput', models.BooleanField()),
                ('poor_Cellusage_rate', models.BooleanField()),
                ('poor_num', models.IntegerField(null=True)),
                ('cell_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='kpi.Lte_site_info')),
            ],
            options={
                'db_table': 'lte_kpi_daily',
            },
        ),
        migrations.CreateModel(
            name='Lte_Kpi_Busy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateField()),
                ('cell_id', models.CharField(max_length=20)),
                ('RTWPperrb', models.FloatField(null=True)),
                ('RRC_congestion_num', models.IntegerField(null=True)),
                ('ERAB_congestion_num', models.IntegerField(null=True)),
                ('RRC_connectuser_avg', models.FloatField(null=True)),
                ('RRC_license_num', models.IntegerField(null=True)),
                ('RRC_connectuser_num_max', models.IntegerField(null=True)),
                ('RRC_connect_succ_num', models.IntegerField(null=True)),
                ('RRC_connect_req_num', models.IntegerField(null=True)),
                ('RRC_connect_rate', models.FloatField(null=True)),
                ('RRC_reconnect_succ_num', models.IntegerField(null=True)),
                ('RRC_reconnect_req_num', models.IntegerField(null=True)),
                ('RRC_reconnect_rate', models.FloatField(null=True)),
                ('ERAB_connect_succ_num', models.IntegerField(null=True)),
                ('ERAB_connect_req_num', models.IntegerField(null=True)),
                ('ERAB_connect_rate', models.FloatField(null=True)),
                ('Connection_rate', models.FloatField(null=True)),
                ('ERAB_release_anomalous_num', models.IntegerField(null=True)),
                ('ERAB_release_att_num', models.IntegerField(null=True)),
                ('ERAB_drop_rate', models.FloatField(null=True)),
                ('handover_intra_succ_num', models.IntegerField(null=True)),
                ('handover_intra_req_num', models.IntegerField(null=True)),
                ('handover_intra_rate', models.FloatField(null=True)),
                ('handover_inter_succ_num', models.IntegerField(null=True)),
                ('handover_inter_req_num', models.IntegerField(null=True)),
                ('handover_inter_rate', models.FloatField(null=True)),
                ('handover_x2_num', models.IntegerField(null=True)),
                ('handover_s1_num', models.IntegerField(null=True)),
                ('handover_x2_rate', models.FloatField(null=True)),
                ('CQI_upto6_num', models.IntegerField(null=True)),
                ('CQI_att_num', models.IntegerField(null=True)),
                ('CQI_upto6_rate', models.FloatField(null=True)),
                ('CQI_AVG', models.FloatField(null=True)),
                ('PRB_usage_num_dl', models.FloatField(null=True)),
                ('PRB_att_num_dl', models.IntegerField(null=True)),
                ('PRB_utilization_dl', models.FloatField(null=True)),
                ('TTI_schedule_num_dl', models.IntegerField(null=True)),
                ('Sensing_rate_ul', models.FloatField(null=True)),
                ('Sensing_rate_dl', models.FloatField(null=True)),
                ('throughput', models.FloatField(null=True)),
                ('TB_one_num', models.IntegerField(null=True)),
                ('TB_double_num', models.IntegerField(null=True)),
                ('TB_double_rate', models.FloatField(null=True)),
                ('LTE_UTRAN_redirect_blind', models.IntegerField(null=True)),
                ('LTE_UTRAN_redirect_noblind', models.IntegerField(null=True)),
                ('LTE_GSM_redirect_blind', models.IntegerField(null=True)),
                ('LTE_GSM_redirect_noblind', models.IntegerField(null=True)),
                ('RLC_PDU_retrans_num', models.IntegerField(null=True)),
                ('RLC_PDU_att_num', models.IntegerField(null=True)),
                ('RLC_PDU_retrans_rate', models.FloatField(null=True)),
                ('Out_of_service_time', models.IntegerField(null=True)),
                ('Running_att_time', models.IntegerField(null=True)),
                ('Cell_usage_rate', models.FloatField(null=True)),
                ('poor_Connection_rate', models.BooleanField()),
                ('poor_Drop_rate', models.BooleanField()),
                ('poor_intrahand_rate', models.BooleanField()),
                ('poor_CQI_rate', models.BooleanField()),
                ('poor_RTWP', models.BooleanField()),
                ('poor_Sensing_rate', models.BooleanField()),
                ('poor_X2handover_rate', models.BooleanField()),
                ('poor_interhand_rate', models.BooleanField()),
                ('poor_RRCongestion_mun', models.BooleanField()),
                ('poor_ERABcongestion_mun', models.BooleanField()),
                ('poor_rediricttoUMTS_mun', models.BooleanField()),
                ('poor_rediricttoGSM_mun', models.BooleanField()),
                ('poor_zerothroughput', models.BooleanField()),
                ('poor_Cellusage_rate', models.BooleanField()),
                ('poor_num', models.IntegerField(null=True)),
                ('cell_name', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='kpi.Lte_site_info')),
            ],
            options={
                'db_table': 'lte_kpi_busy',
            },
        ),
    ]
