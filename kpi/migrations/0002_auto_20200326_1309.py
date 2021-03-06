# Generated by Django 2.2.5 on 2020-03-26 05:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('kpi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='lte_kpi_daily',
            name='cell_name',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='kpi.Lte_site_info'),
        ),
        migrations.AlterField(
            model_name='lte_kpi_daily',
            name='cell_id',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='lte_kpi_daily',
            name='time',
            field=models.DateField(),
        ),
    ]
