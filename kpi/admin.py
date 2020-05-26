#coding:utf-8
from django.contrib import admin
from .models import *
from import_export.formats import base_formats
from import_export import resources
base_formats.DEFAULT_FORMATS = [fmt for fmt in (
    base_formats.XLS,
    base_formats.XLSX,
    base_formats.TSV,
    base_formats.ODS,
    base_formats.JSON,
    base_formats.YAML,
    base_formats.HTML,
) if fmt.is_available()]
from import_export.admin import ImportExportModelAdmin

admin.site.site_header = '陕西联通项目工参管理系统'
admin.site.site_title = '登录系统后台'
admin.site.index_title = '后台管理'
admin.AdminSite.site_url= '/admin'

class SitinfoResource(resources.ModelResource):
    class Meta:
        model = Lte_site_info
        export_order = ('city','district','enodebid','ci','cellid','enodebname','cellname','grid_old','grid_marketing','grid_branch','subnet_id','tac','pci','band','sectorid','eci','enblongitude','enblatitude','celllongitude','celllatitude','cover_type','site_type','site_height','site_azimuth','mechanics_angle','electrical_angle','commonmsg','bandwidth','freq_ul','freq_dl','tower_type','common_type','antenna_type','address','howtogo','buid_period','co_3grncnodeb','co_3grnccellid','co_2gcellid','site_state','onair_date','networking_type','ground','device_types','ip')
        import_id_fields= ['id']
        skip_unchanged = True
        report_skipped = True

@admin.register(Lte_site_info)
class SiteInfoImport(ImportExportModelAdmin):
    list_filter = ['city']  # 管理页过滤项
    search_fields = ['cellid', 'cellname']  # 管理搜索项
    list_display = ['cellname', 'city', 'district',  'enodebid', 'cellid',
                    'tac', 'pci', 'bandwidth', 'freq_dl']
    resource_class = SitinfoResource


# class SiteInfoAdmin(admin.ModelAdmin):
#     list_filter = ['city']  # 管理页过滤项
#     search_fields = ['cellid','cellname']  # 管理搜索项
#     list_display = ['cellname','city', 'district','equipmentvendors','enbid','cellid','longitude','latitude','praiseground','groundclass1','groundclass2','coveragetype']

# class Lte_busy_Admin(admin.ModelAdmin):
#     #显示标题
#     list_display = ['id']
# admin.site.register(Lte_site_info,SiteInfoAdmin)
# admin.site.register(Lte_site_info,SiteInfoImport)
# admin.site.register(Lte_Kpi_Busy,Lte_busy_Admin)
# Register your models here.
