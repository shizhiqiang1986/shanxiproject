var table=$(function () {
        var myDate = new Date();
        var tables = $('#siteinfotables').DataTable({
        dom: 'Bfrt<"#tools"ilp>',
        scrollY: '460px',
        scrollX: true,
        pageLength:25,
        scrollCollapse: true,
        retrieve: true,
        autoWidth: true,        //自定义列宽
        bStateSave: true,  //刷新后不变
        columnDefs: [
            { "width": "20%", "targets": 0 }
          ],
        buttons: [
            {
                extend: "excelHtml5",
                text: '导出',
                className: "btn-sm",
                title:"公参导出"+ myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+(myDate.getDate())
            }],
        ajax: {
            url: 'api/siteinfo',
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
            },
        },
        "columns": [
            {"data": "city"},
            {"data": "district"},
            {"data": "enodebid"},
            {"data": "ci"},
            {"data": "cellid"},
            {"data": "enodebname"},
            {"data": "cellname"},
            {"data": "grid_old"},
            {"data": "grid_marketing"},
            {"data": "grid_branch"},
            {"data": "subnet_id"},
            {"data": "tac"},
            {"data": "pci"},
            {"data": "band"},
            {"data": "sectorid"},
            {"data": "eci"},
            {"data": "enblongitude"},
            {"data": "enblatitude"},
            {"data": "celllongitude"},
            {"data": "celllatitude"},
            {"data": "cover_type"},
            {"data": "site_type"},
            {"data": "site_height"},
            {"data": "site_azimuth"},
            {"data": "mechanics_angle"},
            {"data": "electrical_angle"},
            {"data": "commonmsg"},
            {"data": "bandwidth"},
            {"data": "freq_ul"},
            {"data": "freq_dl"},
            {"data": "tower_type"},
            {"data": "common_type"},
            {"data": "antenna_type"},
            {"data": "address"},
            {"data": "howtogo"},
            {"data": "buid_period"},
            {"data": "co_3grncnodeb"},
            {"data": "co_3grnccellid"},
            {"data": "co_2gcellid"},
            {"data": "site_state"},
            {"data": "onair_date"},
            {"data": "networking_type"},
            {"data": "ground"},
            {"data": "device_types"},
            {"data": "ip"}
        ]
    });

    $('#siteinfofilter').click(function() {
    var parameter = 'api/siteinfo?' + $('#siteinfoquery').serialize();
    tables.ajax.url(parameter).load();
});

});

function filteinfo(cellname) {
        var table_problem = $('#siteinfotables').DataTable();
        var parameter = 'api/siteinfo?cellname='+cellname;
        table_problem.ajax.url(parameter).load();
    }

function infoupdate() {
    $("#INFO_Page",window.parent.document).css({display:'none'});
    $("#UPDATE_Page",window.parent.document).css({display:'block'});
    $("#UPDATE_Tittle",window.parent.document).addClass('activeTabTitle').removeClass('tabTitle');
    $("#INFO_Tittle",window.parent.document).addClass('tabTitle').removeClass('activeTabTitle');
}