var OrderItemGuid = "";
var vm = new Vue({
	el:'#vueConfig',
	data: {
		roles: []
	},
	created() {
		this.getOrderList()
		// ,
		// this.getGoodsName()
	},
	methods: {
		getOrderList() {
			let self = this;
			var UserGuid = localStorage.getItem('userGuid');

			$.ajax({
				async: false,
				url: '/sys/hosorder/getOrderListByUserGuid',
				contentType: 'application/json;charset=utf-8',
				method: 'post',
				data: UserGuid,
				dataType: 'JSON',
				success: function(res) {
					if (res.code == '0') {
						self.orderList = res.data;
						localStorage.setItem('orderList',res.data);
					}
					if (res.code == '500') {
						layer.msg(res.msg);
					}
				}
			});
		}
		// ,
		// getGoodsName(){
		// 	let self = this;
		// 	$.ajax({
		// 		async: false,
		// 		url: '/sys/hosgoods/getGoodsNameByItemGuid',
		// 		contentType: 'application/json;charset=utf-8',
		// 		method: 'post',
		// 		data: OrderItemGuid,
		// 		dataType: 'JSON',
		// 		success: function(res) {
		// 			console.log(res);
		// 			if (res.code == '0') {
		// 				self.goodsName = res.data;
		// 			}
		// 			if (res.code == '500') {
		// 				layer.msg(res.msg);
		// 			}
		// 		}
		// 	})
		// }
	}
});
