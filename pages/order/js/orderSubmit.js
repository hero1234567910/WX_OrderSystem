//创建vue实例化对象
var vm = new Vue({
	el: '#vueConfig',
	data: {
		// 数据创建
		orderDate: '',
		orderItem: [],
		orderPrice: '',
		hosInpatient: '',
		hosStorey: '',
		hosBedNumber: '',
		hosUserName: '',
		hosUserMobile: ''
	},
	mounted() {

	},
	created() {
		this.getGoodsPrice();
		this.getTime();
	},
	methods: {
		getTime(){
			let self = this;
			var now = new Date();
			var time = now.getTime() + 1000*60*30;
			self.orderDate = localStorage.getItem('orderDate') +" "+frontOneHour('hh:mm:ss',new Date(time));
		},
		getGoodsPrice() {
			let self = this;
			var array = JSON.parse(localStorage.getItem('orderItem'));
			var orderPrice = 0;
			for (var i = 0; i < array.length; i++) {
				array[i]['totalPrice'] = accMul(array[i].goodsCount, array[i].goodsPrice);
				orderPrice = accAdd(orderPrice, array[i]['totalPrice'])
			}
			self.orderItem = array;
			self.orderPrice = orderPrice;
			var hosInpatient = GetQueryString('hosInpatient');
			if (hosInpatient == null) {
				self.hosUserName =localStorage.getItem('defaultName');
				self.hosUserMobile =localStorage.getItem('defaultMobile');
				self.hosInpatient =localStorage.getItem('defaultInpatient');
				self.hosStorey =localStorage.getItem('defaultStorey');
				self.hosBedNumber = localStorage.getItem('defaultBedNumber');
			} else {
				self.hosInpatient = GetQueryString('hosInpatient');
				self.hosStorey = GetQueryString('hosStorey');
				self.hosBedNumber = GetQueryString('hosBedNumber');
				self.hosUserName = GetQueryString('hosUserName');
				self.hosUserMobile = GetQueryString('hosUserMobile');
			}
		}


		//      getGoodsList() {
		//          let self = this;
		//          //获取订餐用户对象
		////          var userGuid = JSON.parse(window.localStorage.getItem('userGuid'))
		////          if (userGuid == null) {
		////              window.top.location.href = 'index.html';
		////          }
		//          //获取订餐时间点分类code
		//         	var code = localStorage.getItem('goodsCode');
		//         	console.log(code)
		//          //根据分类code获取菜品列表
		//          $.ajax({
		//              url: '/sys/hosgoodstype/getHosGoodsByPcode',
		//              contentType: 'application/json;charset=utf-8',
		//              method: 'post',
		//              data:code,
		//              dataType: 'JSON',
		//              success: function (res) {
		//                  if (res.code == '0') {
		//                      self.goodsTypeList = res.data;
		//                  }
		//                  if(res.code == '500'){
		//                  	layer.msg(res.msg);
		//                  }
		//              }
		//          });
		//      }
	}

})

$().ready(function() {
})

var hosUserName = GetQueryString('hosUserName');
var hosUserMobile = GetQueryString('hosUserMobile');
var hosInpatient = GetQueryString('hosInpatient');
var hosStorey = GetQueryString('hosStorey');
var hosBedNumber = GetQueryString('hosBedNumber');

// if (hosInpatient == null) {
// 	$('#hosUserName').val(localStorage.getItem('defaultName'));
// 	$('#hosUserMobile').val(localStorage.getItem('defaultMobile'));
// 	$('#hosInpatient').val(localStorage.getItem('defaultInpatient'));
// 	$('#hosStorey').val(localStorage.getItem('defaultStorey'));
// 	$('#hosBedNumber').val(localStorage.getItem('defaultBedNumber'));
// } else {
// 	$('#hosUserName').val(hosUserName);
// 	$('#hosUserMobile').val(hosUserMobile);
// 	$('#hosInpatient').val(hosInpatient);
// 	$('#hosStorey').val(hosStorey);
// 	$('#hosBedNumber').val(hosBedNumber);
// }

$('#submitOrder').click(function() {

	//交互，提交订单，发起微信统一订单
	var params = {};
	//准备参数
	params['orderUserGuid'] = localStorage.getItem('userGuid');
	params['consigneeName'] = $('#hosUserName').text().trim();
	params['consigneeMobile'] = $('#hosUserMobile').text().trim();
	params['consigneeInpatient'] = $('#hosInpatient').text().trim();
	params['consigneeStorey'] = $('#hosStorey').text().trim();
	params['consigneeBedNumber'] = $('#hosBedNumber').text().trim();
	params['remark'] = $('#remark').val();
	params['reserveTime'] = localStorage.getItem('orderDate');
	params['reserveTimeSuffix'] = $('#reserveTime').text().trim();
	params['orderMoney'] = $('#totalMoney').text().trim();
	params['orderItem'] = JSON.stringify(vm.orderItem);
	
	var array = new Array();
	if (panNull(params['orderUserGuid'], '用户不能为空') ||
		panNull(params['consigneeName'], '收货人不能为空') ||
		panNull(params['consigneeMobile'], '手机号码不能为空') ||
		panNull(params['consigneeInpatient'], '地址不能为空') ||
		panNull(params['consigneeStorey'], '地址不能为空') ||
		panNull(params['consigneeBedNumber'], '地址不能为空') ||
		panNull(params['reserveTime'], '送达时间不能为空') ||
		panNull(params['reserveTimeSuffix'], '送达时间不能为空') ||
		panNull(params['orderMoney'], '订单金额不能为空')) {
		return;
	}
	$.ajax({
		url: '/wx/common/placeOrder',
		contentType: 'application/json;charset=utf-8',
		method: 'post',
		data: JSON.stringify(params),
		dataType: 'JSON',
		success: function(res) {
			if (res.code == '0') {
				//下订单
				localStorage.removeItem('orderItem');
				//拼接参数
				var appId = encrypt(res.data.appId);
				var nonceStr = encrypt(res.data.nonceStr);
				var pack = encrypt(res.data.package);
				var paySign = encrypt(res.data.paySign);
				var timestamp = encrypt(res.data.timeStamp+"");
				$.toast("下单成功", function() {
					location.href = "../../../../WXOrderSystem/pages/pay/pay.html?appId="+appId+"&nonceStr="+nonceStr+"&pack="+pack+"&paySign="+paySign+"&timeStamp="+timestamp;
				});
			}
			if (res.code == '500') {
				$.toast(res.msg, "forbidden");
			}
		}
	});


})

//计算相乘
function accMul(arg1, arg2) {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {}
	try {
		m += s2.split(".")[1].length
	} catch (e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//相加
function accAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return (arg1 * m + arg2 * m) / m
}

//判空
function panNull(ele, str) {
	if (ele == null || ele == '') {
		$.alert(str, '警告');
		return true;
	} else {
		return false;
	}
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
	if (r != null) return decodeURI(r[2]);
	return null;
}

function addressChange() {
	window.top.location.href = "../order/orderLocationList.html";
}

//时间格式化
function frontOneHour (fmt,currentTime) {
    var o = {
      'M+': currentTime.getMonth() + 1, // 月份
      'd+': currentTime.getDate(), // 日
      'h+': currentTime.getHours(), // 小时
      'm+': currentTime.getMinutes(), // 分
      's+': currentTime.getSeconds(), // 秒
      'q+': Math.floor((currentTime.getMonth() + 3) / 3), // 季度
      'S': currentTime.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentTime.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  }