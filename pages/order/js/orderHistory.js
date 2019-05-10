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
			var UserGuid = "23351565-7757-4cf8-8906-f39e43264195";

			$.ajax({
				async: false,
				url: '/sys/hosorder/getOrderListByUserGuid',
				contentType: 'application/json;charset=utf-8',
				method: 'post',
				data: UserGuid,
				dataType: 'JSON',
				success: function(res) {
					console.log(res.data);
					if (res.code == '0') {
						self.orderList = res.data;
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
