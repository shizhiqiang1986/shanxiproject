# Generated by Django 2.2.5 on 2020-04-16 02:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kpi', '0006_auto_20200407_1047'),
    ]

    operations = [
        migrations.AddField(
            model_name='lte_site_info',
            name='cover_type',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='lte_site_info',
            name='co_2gcellid',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
