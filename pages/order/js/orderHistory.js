var OrderItemGuid = "";
var vm = new Vue({
	el:'#vueConfig',
	data: {
		orderList: []
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
				url: '/wx/sys/hosorder/getOrderListByUserGuid',
				contentType: 'application/json;charset=utf-8',
				method: 'post',
				data: UserGuid,
				dataType: 'JSON',
				success: function(res) {
					if (res.code == '0') {
						self.orderList = res.data;
						localStorage.setItem('orderList',JSON.stringify(res.data));
					}
					if (res.code == '500') {
						layer.msg(res.msg);
					}
				}
			});
		}
	}
});

$('body').on('click','.weui-media-box.weui-media-box_appmsg',function(){
	var orderGuid = $(this).children('#orderGuid').text().trim();
	window.top.location.href="orderDetail.html?orderGuid="+orderGuid;
})

$('.weui-media-box.weui-media-box_appmsg').click(function(){
})
