$().ready(function(){
	
	var code = GetQueryString('code');
	//获取用户授权信息
	$.ajax({
	    url: '/sys/wx/common/code2Token',
	    contentType: 'application/json;charset=utf-8',
	    method: 'post',
	    dataType: 'JSON',
	    data:code,
	    success: function (res) {
	        if (res.code == '0') {
	            //存储用户信息
	            localStorage.setItem("userGuid",res.data.rowGuid);
	            localStorage.setItem("hosHeadImgUrl",res.data.hosHeadImgUrl);
	            localStorage.setItem("hosUserName",res.data.hosUserName);
	        }
	        else{
	        	console.log(res.msg);
	        }
	    }
	});
	
	//获取select下拉框值
	$.ajax({
	    url: '/sys/hosgoodstype/getTopGoodsType',
	    contentType: 'application/json;charset=utf-8',
	    method: 'post',
	    dataType: 'JSON',
	    success: function (res) {
	        if (res.code == '0') {
	            var datalist = new Array();
                for (var i = 0; i < res.data.length; i++) {
                    var info = { "title": res.data[i].typeName, "value": res.data[i].goodsTypeCode};
                    datalist.push(info);
                }
                console.log(datalist)
                $("#select1").select({
                    title: "选择饭点",
                    items: datalist
                });
	        }
	        else{
	        	console.log(res.msg);
	        }
	    }
	});
	
});

//获取url中的参数
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
     if(r!=null)return  unescape(r[2]); return null;
}

function toMain(){
	//获取菜品分类code
	var code = $('#select1')[0].getAttribute('data-Values');
	var date = $('#we-date').val();
	if(code == null || code == undefined || code == '' || date == null || date == undefined || date == ''){
		$.alert("请填写订餐时间", "警告");
		return;
	}
	localStorage.setItem('goodsCode',code);
	localStorage.setItem('orderDate',date);
	location.href="main.html";
}


