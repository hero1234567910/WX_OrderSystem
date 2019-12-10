//创建vue实例化对象
var vm = new Vue({
	el: '#vueConfig',
	data: {
		// 数据创建
		roles: [],
		departmentShow:false,
		patientShow:true
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
					if (res.code == '0') {
						self.addressList = res.data;
						// if(res.data[0].department!=null||res.data[0].department!=''){
						// 	self.departmentShow = true;
						// 	self.patientShow = false;
						// }
						localStorage.setItem('defaultName',res.data[0].hosUserName);
						localStorage.setItem('defaultMobile',res.data[0].hosUserMobile);
						localStorage.setItem('defaultInpatient',res.data[0].hosInpatient);
						localStorage.setItem('defaultStorey',res.data[0].hosStorey);
						localStorage.setItem('defaultBedNumber',res.data[0].hosBedNumber);
						localStorage.setItem('defaultDepartment',res.data[0].department);
					}
					if (res.code == '500') {
//						layer.msg(res.msg);
					}
				}
			});
		},
		selectFunction(ele){
			let self = this;
			if(ele == true){
				let hosInpatient2 = localStorage.getItem("def_hosInpatient");
				//console.log(hosInpatient2);
				let hosStorey2 = localStorage.getItem("def_hosStorey");
				//console.log(hosStorey2);
				let hosBedNumber2 = localStorage.getItem("def_hosBedNumber");
				window.top.location.href = "../order/orderLocation.html?flag="+true+"&hosInpatient2="+hosInpatient2+ "&hosStorey2=" + hosStorey2
				+"&hosBedNumber2="+hosBedNumber2;
			}else{
				let department2 = localStorage.getItem("def_department");
				//console.log(hosInpatient2);
				let hosStorey2 = localStorage.getItem("def_hosStorey");
				//console.log(hosStorey2);
				window.top.location.href = "../order/workerLocation.html?flag="+true+"&hosStorey2=" + hosStorey2
				+"&department2="+department2;
			}
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
	var department = $(this).children('.weui-cell__bd').children('.loca-x').children('.p-location').children('#department').text().trim();
	window.top.location.href = "../order/orderSubmit.html?hosUserName=" + hosUserName + "&hosUserMobile=" + hosUserMobile +
		"&hosInpatient=" + hosInpatient +
		"&hosStorey=" + hosStorey + "&hosBedNumber=" + hosBedNumber + "&department=" + department;
})


// $('#addressAdd').click(function() {
// 	var hosInpatient2 = localStorage.getItem("def_hosInpatient");
// 	//console.log(hosInpatient2);
// 	var hosStorey2 = localStorage.getItem("def_hosStorey");
// 	//console.log(hosStorey2);
// 	var hosBedNumber2 = localStorage.getItem("def_hosBedNumber");
// 	window.top.location.href = "../order/orderLocation.html?flag="+true+"&hosInpatient2="+hosInpatient2+ "&hosStorey2=" + hosStorey2
// 	+"&hosBedNumber2="+hosBedNumber2;
// });
