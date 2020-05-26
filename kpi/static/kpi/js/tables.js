
//初始化KPI表
var table =$(function () {
        var myDate = new Date()
        var table = $('#kpitables').DataTable({
        dom: 'Bfrt<"#tools"ilp>',
        scrollY: '460px',
        scrollX: true,
        pageLength:25,
        scrollCollapse: true,
        retrieve: true,
        bAutowidth: false,        //自定义列宽
        bStateSave: true,  //刷新后不变
        fixedColumns: {
            leftColumns: 3        //固定2列
        },
        columnDefs: [
            { "targets": 2 ,"width": "120px" },
            { "targets": 0 ,"width": "50px" },
            { "targets": 3 ,"width": "25px" },
            { "targets": 4 ,"width": "25px" },
            { "targets": 5 ,"width": "25px" },
            { "targets": 6 ,"width": "25px" },
            { "targets": 7 ,"width": "25px" },
            { "targets": 8 ,"width": "25px" },
            { "targets": 9 ,"width": "25px" },
            { "targets": 10 ,"width": "25px" },
            { "targets": 11 ,"width": "25px" },
            //小区名宽度
          ],

        //修改导出按钮名称
        buttons: [
            {
                extend: "excelHtml5",
                text: '导出',
                className: "btn-sm",
                title:"KPI指标导出"+myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+(myDate.getDate()-1)
            }],
        ajax: {
            url: 'api/busykpiinfo',
            data:{},
            dataSrc: '',
            beforeSend: function () {
                    $(".divBG").show();},
            complete:function () {
                    $(".divBG").hide();
                    },
        },
        language: {
            "copy": "复制",
            "sProcessing": "处理中...",
            "sLengthMenu": "每页显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "columns": [
            {"data": "time"},
            {"data": "cell_id",render: function(cell_id) { return '<a href="javascript:void(0);" onclick="chack_mdt(\''+cell_id+'\');">' + cell_id + ''; } },
            {"data": "cell_name.cellname",render: function(cellname) { return '<a href="javascript:void(0);" onclick="chack_siteinfo(\''+cellname+'\');">' + cellname + ''; }  },
            {"data": "poor_num"},
            {"data": "poor_Connection_rate"},
            {"data": "poor_Drop_rate"},
            {"data": "poor_intrahand_rate"},
            {"data": "poor_CQI_rate"},
            {"data": "poor_RTWP"},
            {"data": "poor_Sensing_rate"},
            {"data": "poor_X2handover_rate"},
            {"data": "poor_interhand_rate"},
            {"data": "poor_RRCongestion_mun"},
            {"data": "poor_ERABcongestion_mun"},
            {"data": "poor_rediricttoUMTS_mun"},
            {"data": "poor_rediricttoGSM_mun"},
            {"data": "poor_zerothroughput"},
            {"data": "poor_Cellusage_rate"},
            {"data": "RTWPperrb"},
            {"data": "RRC_congestion_num"},
            {"data": "ERAB_congestion_num"},
            {"data": "RRC_connectuser_avg"},
            {"data": "RRC_license_num"},
            {"data": "RRC_connectuser_num_max"},
            {"data": "RRC_connect_succ_num"},
            {"data": "RRC_connect_req_num"},
            {"data": "RRC_connect_rate"},
            {"data": "RRC_reconnect_succ_num"},
            {"data": "RRC_reconnect_req_num"},
            {"data": "RRC_reconnect_rate"},
            {"data": "ERAB_connect_succ_num"},
            {"data": "ERAB_connect_req_num"},
            {"data": "ERAB_connect_rate"},
            {"data": "Connection_rate"},
            {"data": "ERAB_release_anomalous_num"},
            {"data": "ERAB_release_att_num"},
            {"data": "ERAB_drop_rate"},
            {"data": "handover_intra_succ_num"},
            {"data": "handover_intra_req_num"},
            {"data": "handover_intra_rate"},
            {"data": "handover_inter_succ_num"},
            {"data": "handover_inter_req_num"},
            {"data": "handover_inter_rate"},
            {"data": "handover_x2_num"},
            {"data": "handover_s1_num"},
            {"data": "handover_x2_rate"},
            {"data": "CQI_upto6_num"},
            {"data": "CQI_att_num"},
            {"data": "CQI_upto6_rate"},
            {"data": "CQI_AVG"},
            {"data": "PRB_usage_num_dl"},
            {"data": "PRB_att_num_dl"},
            {"data": "PRB_utilization_dl"},
            {"data": "TTI_schedule_num_dl"},
            {"data": "Sensing_rate_ul"},
            {"data": "Sensing_rate_dl"},
            {"data": "throughput"},
            {"data": "TB_one_num"},
            {"data": "TB_double_num"},
            {"data": "TB_double_rate"},
            {"data": "LTE_UTRAN_redirect_blind"},
            {"data": "LTE_UTRAN_redirect_noblind"},
            {"data": "LTE_GSM_redirect_blind"},
            {"data": "LTE_GSM_redirect_noblind"},
            {"data": "RLC_PDU_retrans_num"},
            {"data": "RLC_PDU_att_num"},
            {"data": "RLC_PDU_retrans_rate"},
            {"data": "Out_of_service_time"},
            {"data": "Running_att_time"},
            {"data": "Cell_usage_rate"}
        ]
    });

    $('#kpifilter').click(function() {
    var parameter = 'api/busykpiinfo?' + $('#kpiquery').serialize();
    table.ajax.url(parameter).load();
})
});
function chack_mdt(cellid) {
    $("#KPI_Page",window.parent.document).css({display:'none'});
    $("#MDT_Page",window.parent.document).css({display:'block'});
    $("#MDT_Tittle",window.parent.document).addClass('activeTabTitle').removeClass('tabTitle');
    $("#KPI_Tittle",window.parent.document).addClass('tabTitle').removeClass('activeTabTitle');
    console.log($(window.parent.$("#MDT_iframe"))[0]);
    $(window.parent.$("#MDT_iframe"))[0].contentWindow.filtelayer(cellid);
}

function chack_siteinfo(cellname) {
    $("#KPI_Page",window.parent.document).css({display:'none'});
    $("#INFO_Page",window.parent.document).css({display:'block'});
    $("#INFO_Tittle",window.parent.document).addClass('activeTabTitle').removeClass('tabTitle');
    $("#KPI_Tittle",window.parent.document).addClass('tabTitle').removeClass('activeTabTitle');
    console.log($(window.parent.$("#INFO_iframe"))[0]);
    $(window.parent.$("#INFO_iframe"))[0].contentWindow.filteinfo(cellname);
}



