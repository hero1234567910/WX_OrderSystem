//创建vue实例化对象
var vm = new Vue({
    el: '#vueConfig',
    data: {
        // 数据创建
        orderDate:localStorage.getItem('orderDate')+' '+localStorage.getItem('mealPoint'),
        orderItem:[]
    },
    mounted(){
    	
    },
    created() {
        this.getGoodsPrice();
		
    },
    methods: {
    	getGoodsPrice(){
    		let self = this;
    		var array = JSON.parse(localStorage.getItem('orderItem'));
    		for(var i=0;i<array.length;i++){
    			array[i]['totalPrice'] = accMul(array[i].goodsCount,array[i].goodsPrice);
    		}
			self.orderItem = array;
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

$().ready(function(){
	
})

var hosUserName = GetQueryString('hosUserName');
var hosUserMobile = GetQueryString('hosUserMobile');
var hosInpatient = GetQueryString('hosInpatient');
var hosStorey = GetQueryString('hosStorey');
var hosBedNumber = GetQueryString('hosBedNumber');

if(hosInpatient==null){
	$('#hosUserName').val("地址为空，请添加地址");
}else{
	$('#hosUserName').val(hosUserName);
	$('#hosUserMobile').val(hosUserMobile);
	$('#hosInpatient').val(hosInpatient);
	$('#hosStorey').val(hosStorey);
	$('#hosBedNumber').val(hosBedNumber);
}

$('#submitOrder').click(function(){
	
	//交互，提交订单，发起微信统一订单
	var params = {};
	//准备参数
	params['orderUserGuid'] = localStorage.getItem('userGuid');
	params['consigneeName'] = $('#consigneeName').text().trim();
	params['consigneeMobile'] = $('#consigneeMobile').text().trim();
	params['consigneeInpatient'] = $('#inpatient').text().trim();
	params['consigneeStorey'] = $('#storey').text().trim();
	params['consigneeBedNumber'] = $('#bedNumber').text().trim();
	params['remark'] = $('#remark').text().trim();
	params['reserveTime'] = localStorage.getItem('orderDate');
	params['reserveTimeSuffix'] = $('#reserveTime').text().trim();
	params['orderMoney'] = $('#totalMoney').text().trim()
	params['orderItem'] = JSON.stringify(vm.orderItem);
	
	var array = new Array();
	if(panNull(params['orderUserGuid'],'用户不能为空') 
	|| panNull(params['consigneeName'],'收货人不能为空')
	|| panNull(params['consigneeMobile'],'手机号码不能为空')
	|| panNull(params['consigneeInpatient'],'地址不能为空')
	|| panNull(params['consigneeStorey'],'地址不能为空')
	|| panNull(params['consigneeBedNumber'],'地址不能为空')
	|| panNull(params['reserveTime'],'送达时间不能为空')
	|| panNull(params['reserveTimeSuffix'],'送达时间不能为空')
	|| panNull(params['orderMoney'],'订单金额不能为空')){
		return;
	}
	$.ajax({
	        url: '/sys/wx/common/placeOrder',
	        contentType: 'application/json;charset=utf-8',
	        method: 'post',
	        data:JSON.stringify(params),
	        dataType: 'JSON',
	        success: function (res) {
	            if (res.code == '0') {
	                //下订单
	                localStorage.removeItem('orderItem');
					location.href="../../../../WX_OrderSystem/pages/pay/pay.html"
	            }
	            if(res.code == '500'){
	            	console.log(res.msg);
	            }
	        }
   		 });
	
	
})

//计算相乘
function accMul(arg1,arg2){
	var m=0,s1=arg1.toString(),s2=arg2.toString();
	try{m+=s1.split(".")[1].length}catch(e){}
	try{m+=s2.split(".")[1].length}catch(e){}
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

//判空
function panNull(ele,str){
	if(ele == null || ele == ''){
		$.alert(str,'警告');
		return true;
	}else{
		return false;
	}
}

function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
     if(r!=null)return  decodeURI(r[2]); return null;
}

function addressChange(){
	location.href = "../order/orderLocationList.html";
}