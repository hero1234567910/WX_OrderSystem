//创建vue实例化对象
var vm = new Vue({
    el: '#vueGoodsList',
    data: {
        // 数据创建
        goodsTypeList:[],
        orderList:[]
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            let self = this;
            //获取订餐用户对象
//          var userGuid = JSON.parse(window.localStorage.getItem('userGuid'))
//          if (userGuid == null) {
//              window.top.location.href = 'index.html';
//          }
            //获取订餐时间点分类code
           	var code = localStorage.getItem('goodsCode');
           	console.log(code)
            //根据分类code获取菜品列表
            $.ajax({
                url: '/wx/sys/hosgoodstype/getHosGoodsByPcode',
                contentType: 'application/json;charset=utf-8',
                method: 'post',
                data:code,
                dataType: 'JSON',
                success: function (res) {
                    if (res.code == '0') {
                        self.goodsTypeList = res.data;
                        console.log(self.goodsTypeList)
                    }
                    if(res.code == '500'){
                    	
                    }
                }
            });
        }
    }

})
////jquery实现平滑过渡效果（锚点）
// $(document).ready(function() {  
//	  $('a[href*=#],area[href*=#]').click(function() {
//	  	console.log("aaaaaaa")
//	    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//	      var $target = $(this.hash);
//	      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
//	      if ($target.length) {
//	        var targetOffset = $target.offset().top;
//	        $('html,body').animate({
//	          scrollTop: targetOffset
//	        },
//	        1000);
//	        return false;
//	      }
//	    }
//	})
//});

var orderItem = new Array;

//加
$('body').on('click','.add-shopCar',function(){
	
   $(this).nextAll().css("display", "inline-block");
    var n = $(this).next().text();
    var num = parseInt(n) + 1;
    if (num == 0) { return; }
    //判断是否已经存在该商品
    var goodsGuid = $(this).parents('.orderFood-item-right').children('.orderFood-item-inp').val();
    if(n == 0){
    	var item = {};
    	//菜品guid
    	item['goodsGuid'] = goodsGuid;
		//菜品数量
		item['goodsCount'] = num;
		//菜品名称
		item['goodsName'] = $(this).parents('.orderFood-item-right').children('.orderFood-item-h').text().trim();
		//菜品单价
		item['goodsPrice'] = $(this).parents('.orderFood-item-d').children('.orderFood-item-d-left').children('.goods-price').text().trim();
		//菜品图片
		item['goodsImgUrl'] = $(this).parents('.orderFood-item').children('.orderFood-item-left').children('.goodsImg').attr('src');
    	orderItem.push(item);
    }else{
    	//直接将该商品数量加1
    	for(var i=0;i<orderItem.length;i++){
    		if(orderItem[i].goodsGuid == goodsGuid){
    			orderItem[i].goodsCount = num;
    		}
    	}
    }
    
    $(this).next().text(num);
    var par = $(this).parent();
    var danjia = par.prev().children('.goods-price').text();//获取单价
	  var a = $("#totalpriceshow").html();//获取当前所选总价
	  $("#totalpriceshow").html((a * 1 + danjia * 1).toFixed(2));//计算当前所选总价
//	  console.log(orderItem);
//	  var nm = $("#totalcountshow").html();//获取数量
//	  $("#totalcountshow").html(nm*1+1);
//	  jss();//改变按钮样式h
});

//减
$('body').on('click','.add-shopCar-d',function(){
	var n = $(this).prev().text();
    var num = parseInt(n) - 1;
 
    $(this).prev().text(num);//减1
 
 	var danjia = $(this).parent().prev().children('.goods-price').text();//获取单价
    var a = $("#totalpriceshow").html();//获取当前所选总价
    $("#totalpriceshow").html((a * 1 - danjia * 1).toFixed(2));//计算当前所选总价
   	var goodsGuid = $(this).parents('.orderFood-item-right').children('.orderFood-item-inp').val();
   	if(n > 1){
   		//直接将该商品数量加1
    	for(var i=0;i<orderItem.length;i++){
    		if(orderItem[i].goodsGuid == goodsGuid){
    			orderItem[i].goodsCount = num;
    		}
    	}
   	}else{
   		//当数量等于1时移除该
   		for(var i=0;i<orderItem.length;i++){
    		if(orderItem[i].goodsGuid == goodsGuid){
    			orderItem.splice(i,1);
    		}
    	}
   	}
   
//  var nm = $("#totalcountshow").html();//获取数量
//  $("#totalcountshow").html(nm * 1 - 1);
    //如果数量小于或等于0则隐藏减号和数量
    if (num <= 0) {
        $(this).css("display", "none");
         return
    }

});

$('#toSubmit').click(function(){
	//获取金额
	var orderPrice = $('#totalpriceshow').text();
	if(orderPrice == 0){
		$.alert("请至少选择一个菜品", "警告");
		return;
	}
	localStorage.setItem('orderItem',JSON.stringify(orderItem));
	window.top.location.href = "../../../../WXOrderSystem/pages/order/orderSubmit.html?orderPrice="+orderPrice;
})

