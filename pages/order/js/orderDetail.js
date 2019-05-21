var vm = new Vue({
	el:'#vueConfig',
	data: {
		orderGuid:'',
		orderData:{}
	},
	created() {
		this.getOrderDetail();
	},
	methods: {
		getOrderDetail(){
			let self = this;
			var orderGuid = GetQueryString('orderGuid');
			self.orderGuid = orderGuid;
			//和list匹配获取数据
			var orderList = JSON.parse(localStorage.getItem('orderList'));
			for(var i=0;i<orderList.length;i++){
				if(orderList[i].rowGuid == orderGuid){
					self.orderData = orderList[i];
				}
			}
			localStorage.removeItem('orderList');
			console.log(self.orderData.orderStatusText == '待支付')
		},
		toSubmit(){
			let self = this;
			//交互，提交订单，发起微信统一订单
			var params = {};
			//准备参数
			params['orderUserGuid'] = localStorage.getItem('userGuid');
			params['orderMoney'] = self.orderData.orderMoney;
			params['merchantNumber'] = self.orderData.merchantNumber;
			
			$.ajax({
				url: '/wx/common/placeOrderAgain',
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
		}
	}
});

//获取url中的参数
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
     if(r!=null)return  unescape(r[2]); return null;
}
