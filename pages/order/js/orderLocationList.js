//创建vue实例化对象
var vm = new Vue({
	el: '#vueConfig',
	data: {
		// 数据创建
		roles: []
	},
	created() {
		this.getAddressList()
	},
	methods: {
		getAddressList() {
			let self = this;
			//获取订餐用户对象
			//          var rowGuid = JSON.parse(window.localStorage.getItem('hos_user_guid'))
			//          if (rowGuid == null) {
			//              window.top.location.href = 'login.html';
			//          }
			var hosUserGuid = localStorage.getItem('userGuid');
			
			//根据用户行标获取地址列表
			$.ajax({
				async: false,
				url: '/wx/sys/hosaddress/getAddressListByUserGuid',
				contentType: 'application/json;charset=utf-8',
				method: 'post',
				data: hosUserGuid,
				dataType: 'JSON',
				success: function(res) {
					console.log(res);
					if (res.code == '0') {
						self.addressList = res.data;
					}
					if (res.code == '500') {
//						layer.msg(res.msg);
					}
				}
			});
		}
	}

});

$('.weui-cell.weui-cell_access').click(function(){
	
	console.log(this.te)
	var rowGuid = $(this).children('.weui-cell__bd').children('.loca-name').children('#rowGuid').text().trim();
	var hosUserName = $(this).children('.weui-cell__bd').children('.loca-name').children('#userName').text().trim();
	var hosUserMobile = $(this).children('.weui-cell__bd').children('.loca-mobile').children('#userMobile').text().trim();
	var hosInpatient = $(this).children('.weui-cell__bd').children('.loca-x').children('.p-location').children('#inpatient').text().trim();
	var hosStorey = $(this).children('.weui-cell__bd').children('.loca-x').children('.p-location').children('#storey').text().trim();
	var hosBedNumber = $(this).children('.weui-cell__bd').children('.loca-x').children('.p-location').children('#bedNumber').text().trim();
	location.href = "../order/orderLocation.html?hosUserName=" + hosUserName + "&hosUserMobile=" + hosUserMobile +
		"&hosInpatient=" + hosInpatient +
		"&hosStorey=" + hosStorey + "&hosBedNumber=" + hosBedNumber;
})


$('#addressAdd').click(function() {
	location.href = "../order/orderLocation.html";
});
