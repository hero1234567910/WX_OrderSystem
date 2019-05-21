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
			// console.log(self.orderData);
		}
	}
});

//获取url中的参数
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
     if(r!=null)return  unescape(r[2]); return null;
}
