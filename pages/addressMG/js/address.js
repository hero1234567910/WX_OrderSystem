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
           	var hosUserGuid = "23351565-7757-4cf8-8906-f39e43264195";
            //根据用户行标获取地址列表
            $.ajax({
                async: false,
                url: '/sys/hosaddress/getAddressListByUserGuid',
                contentType: 'application/json;charset=utf-8',
                method: 'post',
                data:hosUserGuid,
                dataType: 'JSON',
                success: function (res) {
                	console.log(res);
                    if (res.code == '0') {
                        self.addressList = res.data;
                    }
                    if(res.code == '500'){
                    	layer.msg(res.msg);
                    }
                }
            });
        }
    }

})