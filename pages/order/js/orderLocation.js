$('#toSave').click(function(){
	var params1 = {};
	var params2 = {};
	
	params1['hosUserName'] = $('#hosUserName').val();
	params1['hosUserMobile']= $('#hosUserMobile').val();
	params1['rowGuid']= localStorage.getItem('userGuid');
	
	params2['rowGuid'] = $('#rowGuid').val();
	params2['hosInpatient'] = $('#hosInpatient').val();
	params2['hosStorey'] = $('#hosStorey').val();
	params2['hosBedNumber'] = $('#hosBedNumber').val();
	params2['hosUserGuid'] = localStorage.getItem('userGuid');
	
	panNull(params1['hosUserName'],'用户名不能为空');
	panNull(params1['hosUserMobile'],'手机号不能为空');
	panNull(params2['hosInpatient'],'病区不能为空');
	panNull(params2['hosStorey'],'楼层不能为空');
	panNull(params2['hosBedNumber'],'床号不能为空');
	
	if(GetQueryString('rowGuid')==null){
		$.ajax({
			url:'/sys/hosaddress/add',
			contentType: 'application/json;charset=utf-8',
			method: 'post',
			data: JSON.stringify(params2),
			dataType: 'JSON',
			success: function (res) {
                    if (res.code == '0') {
						console.log(res);//打印服务端返回的数据(调试用)
						$.ajax({
							url:'/sys/hosuser/add',
							contentType: 'application/json;charset=utf-8',
							method: 'post',
							data: JSON.stringify(params1),
							dataType: 'JSON',
							success: function (res) {
							    if (res.code == '0') {
									location.href="../../../../WX_OrderSystem/pages/addressMG/address.html"
							    }
							    if(res.code == '500'){
							    	console.log(res.msg);
							    }
							}
						});
                    }
                },
                error : function() {
                    alert("异常！");
                }
		});
	}else{
		$.ajax({
			url:'/sys/hosaddress/update',
			contentType: 'application/json;charset=utf-8',
			method:'put',
			data: JSON.stringify(params2),
			dataType: 'JSON',
			success: function (res) {
			        if (res.code == '0') {
						console.log("修改成功");
						$.ajax({
								url:'/sys/hosuser/update',
								contentType: 'application/json;charset=utf-8',
								method: 'put',
								data: JSON.stringify(params1),
								dataType: 'JSON',
								success: function (res) {
								    if (res.code == '0') {
										location.href="../../../../WX_OrderSystem/pages/addressMG/address.html"
								    }
								    if(res.code == '500'){
								    	console.log(res.msg);
								    }
								}
							});
						}
			        }
		});
	}
	
})

var rowGuid = GetQueryString('rowGuid');
var hosUserName = GetQueryString('hosUserName');
var hosUserMobile = GetQueryString('hosUserMobile');
var hosInpatient = GetQueryString('hosInpatient');
var hosStorey = GetQueryString('hosStorey');
var hosBedNumber = GetQueryString('hosBedNumber');
console.log(rowGuid);
$('#rowGuid').val(rowGuid);
$('#hosUserName').val(hosUserName);
$('#hosUserMobile').val(hosUserMobile);
$('#hosInpatient').val(hosInpatient);
$('#hosStorey').val(hosStorey);
$('#hosBedNumber').val(hosBedNumber);
console.log($('#hosUserName').val());
//获取url中的参数
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
     if(r!=null)return  decodeURI(r[2]); return null;
}

function panNull(ele,str){
	if(ele == null || ele == ''){
		$.alert(str,'警告');
		return
	}
}