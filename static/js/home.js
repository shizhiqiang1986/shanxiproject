$(function(){
	$('#TabTitleContainer span').click(function(){
		$(this).parent().removeClass("tabTitle").addClass("activeTabTitle").siblings().removeClass("activeTabTitle").addClass("tabTitle");
		var iframid=$(this).parent().index();
		var tabTitleText=$(this).text();
		$("#iframpool div").eq(iframid).css({'display':'block'}).siblings().css({'display':'none'});
		document.title=tabTitleText;
	})
});


// function closediv() {
// 	if($(this).parent().attr('class')=='activeTabTitle'){
// 			if($(this).parent().parent().children().length==1){return} else {
// 			if($(this).parent().prev().index()==-1){
// 				$(this).parent().next().removeClass("tabTitle").addClass("activeTabTitle");
// 				$("#iframpool div").eq($(this).parent().next().index()).css({'display':'block'})
// 			}else{
// 				$(this).parent().prev().removeClass("tabTitle").addClass("activeTabTitle");
// 				$("#iframpool div").eq($(this).parent().prev().index()).css({'display':'block'})
// 			}
// 		}}else{
// 	};
// 	$(this).parent().remove();
// 	$("#iframpool div").eq($(this).parent().index()).remove();
// };

$(function () {
	$('.tab-close').click(function(){
		// console.log($("#iframpool div").eq($(this).parent().index()).length==1)
		// if ($("#iframpool div").eq($(this).parent().index()).length==1){
		// 	return;}
		if($(this).parent().parent().children().length==1){return}
		if($(this).parent().attr('class')=='activeTabTitle'){
			if($(this).parent().prev().index()==-1){
				$(this).parent().next().removeClass("tabTitle").addClass("activeTabTitle");
				$("#iframpool div").eq($(this).parent().next().index()).css({'display':'block'})
			}else{
				$(this).parent().prev().removeClass("tabTitle").addClass("activeTabTitle");
				$("#iframpool div").eq($(this).parent().prev().index()).css({'display':'block'})
			}
		}else{
		}


		$("#iframpool div").eq($(this).parent().index()).remove();
		$(this).parent().remove();
		 })
		});

function creatediv(tittle,divid) {
	if($("#"+divid).length==0){
		flag=0
		var pE=document.createElement('div');
		var pClass= document.createAttribute('class');
		pClass.value = 'activeTabTitle';
		var pid= document.createAttribute('id');
		pid.value=divid;


		var ospan=document.createElement('span');
		var t=document.createTextNode(tittle);
		var otittle= document.createAttribute('tittle');
		otittle.value=tittle;


		var qE=document.createElement('div');
		var qclass= document.createAttribute('class');
		var qtittle= document.createAttribute('tittle');
		qclass.value = 'tab-close';
		qtittle.value='关闭本页';

		pE.setAttributeNode(pClass);
		pE.setAttributeNode(pid);
		ospan.setAttributeNode(otittle);
		qE.setAttributeNode(qclass);
		qE.setAttributeNode(qtittle);

		ospan.appendChild(t);
		pE.appendChild(ospan);
		pE.appendChild(qE);
		$('#TabTitleContainer').append(pE)
	} else{flag=1}
	$("#"+divid).removeClass("tabTitle").addClass("activeTabTitle").siblings().removeClass("activeTabTitle").addClass("tabTitle");
	$("#iframpool div").eq($("#"+divid).index()).css({'display':'block'}).siblings().css({'display':'none'});

	//重新绑定样式切换事件
		$(function(){
		$(ospan).click(function(){
			$(this).parent().removeClass("tabTitle").addClass("activeTabTitle").siblings().removeClass("activeTabTitle").addClass("tabTitle");
			var iframid=$(this).parent().index();
			var tabTitleText=$(this).text();
			$("#iframpool div").eq(iframid).css({'display':'block'}).siblings().css({'display':'none'});
			document.title=tabTitleText;
		})
	});
	//重新绑定删除iframe事件
	$(function () {
		if(flag==1){return}
		$('#'+divid+' .tab-close').click(function(){
		if($(this).parent().parent().children().length==1){return}
		if($(this).parent().attr('class')=='activeTabTitle'){
			if($(this).parent().prev().index()==-1){
				$(this).parent().next().removeClass("tabTitle").addClass("activeTabTitle");
				$("#iframpool div").eq($(this).parent().next().index()).css({'display':'block'})
			}else{
				$(this).parent().prev().removeClass("tabTitle").addClass("activeTabTitle");
				$("#iframpool div").eq($(this).parent().prev().index()).css({'display':'block'})
			}
		}
		$("#iframpool div").eq($(this).parent().index()).remove();
		$(this).parent().remove();
		 })
		});

}

function createiframe(p_Page,p_iframe,url) {
	if($("#"+p_Page).length==0){
		$('#iframpool').children().css({'display':'none'});
		var div = document.createElement('div');
		var pid= document.createAttribute('id');
		pid.value=p_Page;
		var pclass= document.createAttribute('class');
		pclass.value='tabPage';
		var pstyle= document.createAttribute('style');
		pstyle.value='display:block;';
		div.setAttributeNode(pid);
		div.setAttributeNode(pclass);
		div.setAttributeNode(pstyle);

		var iframe = document.createElement('iframe');
		var iid= document.createAttribute('id');
		var isrc= document.createAttribute('src');
		var iframeborde= document.createAttribute('frameborde');
		iid.value=p_iframe;
		isrc.value=url;
		iframeborde.value='0';
		iframe.setAttributeNode(iid);
		iframe.setAttributeNode(isrc);
		iframe.setAttributeNode(iframeborde);
		div.append(iframe)
		$('#iframpool').append(div);
}
}

function overShow() {
	$("#navgit").show()
}

function outHide() {
	$("#navgit").hide()
}
