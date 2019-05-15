$('#toSave').click(function() {
	var params2 = {};

	params2['hosUserName'] = $('#hosUserName').val();
	params2['hosUserMobile'] = $('#hosUserMobile').val();
	params2['rowGuid'] = $('#rowGuid').val();
	params2['hosInpatient'] = $('#hosInpatient').val();
	params2['hosStorey'] = $('#hosStorey').val();
	params2['hosBedNumber'] = $('#hosBedNumber').val();
	params2['hosUserGuid'] = localStorage.getItem('userGuid');

	checkName(params2['hosUserName'], '用户名格式错误');
	//panNull(params2['hosUserMobile'], '手机号不能为空');
	checkMobile(params2['hosUserMobile'], '手机号格式错误');
	panNull(params2['hosInpatient'], '病区不能为空');
	panNull(params2['hosStorey'], '楼层不能为空');
	panNull(params2['hosBedNumber'], '床号不能为空');

	if (GetQueryString('rowGuid') == null) {
		$.ajax({
			url: '/sys/hosaddress/add',
			contentType: 'application/json;charset=utf-8',
			method: 'post',
			data: JSON.stringify(params2),
			dataType: 'JSON',
			success: function(res) {
				if (res.code == '0') {
					console.log(res); //打印服务端返回的数据(调试用)
					location.href = "../../../../WX_OrderSystem/pages/addressMG/address.html";
				}
				if (res.code == '500') {
					console.log(res.msg);
				}
			}
		});
	} else {
		$.ajax({
			url: '/sys/hosaddress/update',
			contentType: 'application/json;charset=utf-8',
			method: 'put',
			data: JSON.stringify(params2),
			dataType: 'JSON',
			success: function(res) {
				if (res.code == '0') {
					console.log("修改成功");
					location.href = "../../../../WX_OrderSystem/pages/addressMG/address.html";
				}
				if (res.code == '500') {
					console.log(res.msg);
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

$('#rowGuid').val(rowGuid);
$('#hosUserName').val(hosUserName);
$('#hosUserMobile').val(hosUserMobile);
$('#hosInpatient').val(hosInpatient);
$('#hosStorey').val(hosStorey);
$('#hosBedNumber').val(hosBedNumber);

//获取url中的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
	if (r != null) return decodeURI(r[2]);
	return null;
}

function panNull(ele, str) {
	if (ele == null || ele == '') {
		$.alert(str, '警告');
		return ;
	}
}

function checkName(ele, str) {
	var patrn = /^[\u2E80-\u9FFF]+$/;
	if (!patrn.test(ele)) {
		$.alert(str, '警告');
		return ;
	}
}

function checkMobile(ele, str) {
	var tel = $('#hosUserMobile').val();
	var patrn = /^[1][3,4,5,7,8][0-9]{9}$/;
	if (tel == null || tel == '') {
		$.alert(str, '警告');
		return ;
	} else if (patrn.test(tel) == false) {
		$.alert(str, '警告');
		return ;
	}
}
