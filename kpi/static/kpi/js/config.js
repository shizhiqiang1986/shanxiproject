$(function(){
	$('.tools ul li img').addClass('bulge');
	$('#lte').removeClass('bulge').addClass('concave');
});
var wgs84Sphere = new ol.Sphere(6378137);
var source = new ol.source.Vector();
var vector = new ol.layer.Vector({
	source: source,
	style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 255, 1)'
		}),
		stroke: new ol.style.Stroke({
			color: "red",
			width: 3
		}),
		image: new ol.style.Circle({
			radius: 7,
			fill: new ol.style.Fill({
				color: '#ffcc33'
			})
		})
	})
});
var tiandi_img = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'https://t{0-7}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=51785629e1d5cd834b4bf66e13e177e7'
	}),
	visible: false
});

var tiandi_cia = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'https://t{0-7}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=51785629e1d5cd834b4bf66e13e177e7'
	}),
	visible: false
});

var tiandi_vec = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'https://t{0-7}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=51785629e1d5cd834b4bf66e13e177e7'
	}),
	visible: true
});

var tiandi_cva = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'https://t{0-7}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=51785629e1d5cd834b4bf66e13e177e7'
	}),
	visible: true
});
var sketch;
var helpTooltipElement;
var helpTooltip;
var measureTooltipElement;
var measureTooltip;
var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    //坐标格式
    projection: 'EPSG:4326',
    //地图投影坐标系
    className: 'custom-mouse-position',
    //坐标信息显示样式
    // 显示鼠标位置信息的目标容器
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp' //未定义坐标的标记
});


var map = new ol.Map({
	layers: [tiandi_vec,tiandi_cva,tiandi_img,tiandi_cia,vector],
	target: 'map',
	controls: ol.control.defaults().extend([mousePositionControl]),
	view: new ol.View({
		center: [108.94228, 34.26105],
		zoom: 16,
		projection: "EPSG:4326"
	})
});

var lte = new getwms(sources("shanxi:lte", null, null));
var wcdma = new getwms(sources("shanxi:wcdma", null, null));
var mdt = new getwms(sources("shanxi:mdt_all", null, null));
var mdt_line = new getwms(sources("shanxi:mdt_line", null, rasterid = '10000000'));
var style = null;
var cql = null;
map.addLayer(mdt);
map.addLayer(mdt_line);
map.addLayer(lte);

var pt, wx = 0;
function change1(self) {
	if (pt == 0) {
		self.className = "bluebg";
		document.getElementById("whitebg").className = "whitebg";
		map.getLayers().item(0).setVisible(true);
		map.getLayers().item(1).setVisible(true);
		map.getLayers().item(2).setVisible(false);
		map.getLayers().item(3).setVisible(false);
		pt = 1;
		wx = 0;
	}
}
function change2(self) {
	if (wx == 0) {
		self.className = "bluebg";
		document.getElementById("bluebg").className = "whitebg";
		map.getLayers().item(0).setVisible(false);
		map.getLayers().item(1).setVisible(false);
		map.getLayers().item(2).setVisible(true);
		map.getLayers().item(3).setVisible(true);
		pt = 0;
		wx = 1;
	}
}


map.on('singleclick',
function(evt) {
	var view = map.getView();
	var viewResolution = view.getResolution();
	var source = mdt.getSource();
	var url = source.getGetFeatureInfoUrl(evt.coordinate, viewResolution, view.getProjection(), {
		'INFO_FORMAT': 'application/json',
		'FEATURE_COUNT': 1
	});
	$(function() {
		$.ajax({
			type: "get",
			//请求方式
			url: url,
			//地址，就是json文件的请求路径
			dataType: "json",
			//数据类型可以为 text xml json  script  jsonp
			success: function(result) { //返回的参数就是 action里面所有的有get和set方法的参数
				try {
					var rasterid = result['features'][0]['properties']['rasterid'];
					var rastercql = "rasterid='" + rasterid + "'";
					mdt_line.setSource(sources('shanxi:mdt_line', null, rastercql));
				} catch(e) {
					console.log("无MR采样点")
				}
			}
		});
	});
});

var getflag = 1

function nodelist() {
	if (getflag == 1) {
		getnodelist();
		getflag = 0;

	} else {
		dropnodelist();
		getflag = 1
	}
}

function getnodelist() {
	$(function() {
		$('#info').attr("class",'concave');
		$('#mouse').css({display:'block'});
        $('.ol-viewport').mousemove(function (e) {
            $("#mouse").css({ left: e.pageX-14, top: e.pageY-30 });
         });
	});
	key = map.on('singleclick',
	function(evt) {
		var nodeview = map.getView();
		var nodeviewResolution = nodeview.getResolution();
		var nodesource = lte.getSource();
		var strd = "";
		var nodeurl = nodesource.getGetFeatureInfoUrl(evt.coordinate, nodeviewResolution, nodeview.getProjection(), {
			'INFO_FORMAT': 'application/json',
			'FEATURE_COUNT': 10
		});

		$(function() {
			$.ajax({
				type: "get",
				//请求方式
				url: nodeurl,
				//地址，就是json文件的请求路径
				//async: false,//异步模式
				dataType: "json",
				//数据类型可以为 text xml json  script  jsonp
				success: function(result) { //返回的参数就是 action里面所有的有get和set方法的参数
					try {
						$.each(result.features,
						function(i, item) {
							var str = '<div><div class="triangle" onclick="changetriangle(this)"></div><div class="nodeinfo"><p>小区名:<em>' + item.properties.小区名称 + '</em></p></div>' + '<div id="nodeinfo_extend" class="nodeinfo_extend"><p>Cellid：<em>' + item.properties.enbcellid1 + '</em></p>' + '<p>PCI：<em>' + item.properties.pci + '</em></p>' + '<p>下行频点：<em>' + item.properties.下行中心频点 + '</em></p>' + '<p>下行带宽：<em>' + item.properties.下行带宽 + '</em></p></div>' + '</div>';
							strd += str;
							document.getElementById('my_dialog').innerHTML = strd;
							document.getElementById('dialog').style.display = 'block';
						})
					} catch(e) {
						console.log("无站点信息")
					}
				}
			});

		});

	}.bind(this));

}

function changetriangle(self) {
	if (self.parentNode.children[2].style.display == 'block') {
		self.parentNode.children[2].style.display = 'none';
		self.style['border-left-color'] = 'brown';
		self.style['border-top-color'] = 'transparent';
	} else {
		self.parentNode.children[2].style.display = 'block';
		self.style['border-left-color'] = 'transparent';
		self.style['border-top-color'] = 'brown';
	}
}

function dropnodelist() {
	ol.Observable.unByKey(key);
	$(function() {
		$('#mouse').css({display:'none'});
		$('#info').attr("class",'bulge');
	})
}

var x = 2,
y = 1,
xlte = 1,
xfilte = 2;

function getwms(ss) {
	this.wmsLayer = new ol.layer.Tile({
		source: ss
	});
	return this.wmsLayer;
}

function sources(layer_temp, style_temp, cql_temp) {
	return new ol.source.TileWMS({
		url: "http://10.93.57.7:8080/geoserver/shanxi/wms",
		params: {
			'VERSION': '1.1.1',
			'LAYERS': layer_temp,
			'TILED': true,
			'CQL_FILTER': cql_temp,
			'STYLES': style_temp
		},
		transition: 0
	})
}


function wcdmalayer() {
	$('#wcdma').toggleClass('bulge concave');
	if (x % 2 == 0) {
		map.addLayer(wcdma);
	} else {
		map.removeLayer(wcdma);
	};
	x += 1
}

function ltelayer() {
	$('#lte').toggleClass('bulge concave');
	if (xlte % 2 == 0) {
		map.addLayer(lte);
	} else {
		map.removeLayer(lte);
	};
	xlte += 1
}

function filtelayer(cellid) {
            if(cellid){
              var enbid = cellid.split('.')[1]+cellid.split('.')[2]
              var cql = "enbcellid1 like '" + enbid + "%'";
            } else {
				var enbid = document.getElementById("filter").value;
				var cql = "enbcellid1 like '" + enbid + "%'";}
				if (/^\d{5,9}$/.test(enbid)) {
					mdt.setSource(sources('shanxi:mdt_all', style, cql));

				} else {
					alert('基站或小区id不正确');
					return;
				}




            $(function() {
                var wfsParams = {
                    service: 'WFS',
                    version: '1.0.0',
                    request: 'GetFeature',
                    typeName: 'shanxi:lte',
                    //图层名称
                    outputFormat: 'application/json',
                    maxFeatures: '1',
                    cql_filter: cql,
                };

                var url = 'http://10.93.57.7:8080/geoserver/wfs';
                $.ajax({
                    type: "get",
                    //请求方式
                    url: url,
                    //地址，就是json文件的请求路径
                    data: $.param(wfsParams),
                    dataType: "json",
                    //数据类型可以为 text xml json  script  jsonp
                    　　　　　　　　success: function(result) {
                        try {
                            var changecenter = [result['features'][0]['properties']['小区经度'], result['features'][0]['properties']['小区纬度']];
                            map.getView().setCenter(changecenter);
                        } catch(e) {
                            console.log("无该小区信息")
                        }
                    }
                })
            });
        }

function resetFilter() {
	mdt.setSource(sources('shanxi:mdt_all', null, null));
	cql = null
}
function selectlayer(selObj) { 
	if (document.getElementById("menu").style.display == "block") {
		$('#layer').attr("class",'bulge');
		$("#menu").css({
			display: "none"
		});
	} else {
		$('#layer').attr("class",'concave');
		$("#menu").css({
			display: "block"
		});
	}
}
function changestyle(selObj) { 
	if (selObj == 'SINR') {
		style = "shanxi:sinr";
		mdt.setSource(sources('shanxi:mdt_all', style, cql));
		$("#menu").css({
			display: "none"
		});
	} 
	else {
		style = null;
		mdt.setSource(sources('shanxi:mdt_all', style, cql)); 
		$("#menu").css({
			display: "none"
		});

	};
	$('#layer').attr("class",'bulge');
}


var draw;
var formatLength = function(line) {
	var length;
	var coordinates = line.getCoordinates();
	length = 0;
	var sourceProj = map.getView().getProjection();
	for (var i = 0,
	ii = coordinates.length - 1; i < ii; ++i) {
		var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
		var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
		length += wgs84Sphere.haversineDistance(c1, c2);
	}
	var output;
	if (length > 100) {
		output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
	} else {
		output = (Math.round(length * 100) / 100) + ' ' + 'm';
	}
	return output;
};

var formatArea = function(polygon) {
	var area;
	var sourceProj = map.getView().getProjection();
	var geom =
	/** @type {ol.geom.Polygon} */
	(polygon.clone().transform(sourceProj, 'EPSG:4326'));
	var coordinates = geom.getLinearRing(0).getCoordinates();
	area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
	var output;
	if (area > 10000) {
		output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
	} else {
		output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
	}
	return output;
};

function drawcontrol(self) {
	drop();
	addInteraction(self);
}

function addInteraction(typeSelect) {

	var type = (typeSelect == 'area' ? 'Polygon': 'LineString');
	if (type == 'Polygon') {
		$('#area').attr("class",'concave');
//		$(function() {
//			$("#area").css({
//				'box-shadow': "0px -2px 0px rgba( 255, 255, 250, 1) inset,0px 2px 0px rgba( 0, 0, 0, 0.2) inset"
//			});
//		})
	} else {
		$('#lenght').attr("class",'concave');
//		$(function() {
//			$("#lenght").css({
//				'box-shadow': "0px -2px 0px rgba( 255, 255, 250, 1) inset,0px 2px 0px rgba( 0, 0, 0, 0.2) inset"
//			});
//		})
	};
	draw = new ol.interaction.Draw({
		source: source,
		type:
		/** @type {ol.geom.GeometryType} */
		(type),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 1)'
			}),
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 1)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 5,
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 1)'
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 1)'
				})
			})
		})
	});
	map.addInteraction(draw);

	createMeasureTooltip();
	createHelpTooltip();

	var listener;
	draw.on('drawstart',
	function(evt) {
		// set sketch
		sketch = evt.feature;
		var tooltipCoord = evt.coordinate;
		listener = sketch.getGeometry().on('change',
		function(evt) {
			var geom = evt.target;
			var output;
			if (geom instanceof ol.geom.Polygon) {
				output = formatArea(geom);
				tooltipCoord = geom.getInteriorPoint().getCoordinates();
			} else if (geom instanceof ol.geom.LineString) {
				output = formatLength(geom);
				tooltipCoord = geom.getLastCoordinate();
			}
			measureTooltipElement.innerHTML = output;
			measureTooltip.setPosition(tooltipCoord);
		});
	},
	this);

	draw.on('drawend',
	function() {
		measureTooltipElement.className = 'tooltip tooltip-static';
		measureTooltip.setOffset([0, -7]);
		sketch = null;
		measureTooltipElement = null;
		createMeasureTooltip();
		ol.Observable.unByKey(listener);
	},
	this);
}

function createHelpTooltip() {
	if (helpTooltipElement) {
		helpTooltipElement.parentNode.removeChild(helpTooltipElement);
	}
	helpTooltipElement = document.createElement('div');
	helpTooltipElement.className = 'tooltip hidden';
	helpTooltip = new ol.Overlay({
		element: helpTooltipElement,
		offset: [15, 0],
		positioning: 'center-left'
	});
	map.addOverlay(helpTooltip);
}

function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
}

$(function() {
	$("#ereser").mousedown(function() {
		$("#ereser").attr("class",'concave');
	});
	$("#ereser").mouseup(function() {
		$("#ereser").attr("class",'bulge');
	});
	$("#search").mousedown(function() {
		$("#search").attr("class",'concave');
	});
	$("#search").mouseup(function() {
		$("#search").attr("class",'bulge');
	});
	$("#reset").mousedown(function() {
		$("#reset").attr("class",'concave');
	});
	$("#reset").mouseup(function() {
		$("#reset").attr("class",'bulge');
	});

})

function drop() {
	map.getOverlays().clear();
	source.clear();
	map.removeInteraction(draw);
	$("#area,#lenght").attr("class",'bulge');
}

function showPic(){
	$(function(){
		$('#showlegend').toggleClass('bulge concave');
		$('#legend').fadeToggle();
	})

}



$(function() {
	$(".close_btn").hover(function() {
		$(this).css({
			color: '#999'
		})
	},
	function() {
		$(this).css({
			color: 'black'
		})
	}).on('click',
	function() {
		$("#dialog").css({
			display: 'none'
		});
	});
});




