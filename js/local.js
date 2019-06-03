$(function() {
    FastClick.attach(document.body);
});

//时间格式化
function frontOneHour (fmt,currentTime) {
    var o = {
      'M+': currentTime.getMonth() + 1, // 月份
      'd+': currentTime.getDate(), // 日
      'h+': currentTime.getHours(), // 小时
      'm+': currentTime.getMinutes(), // 分
      's+': currentTime.getSeconds(), // 秒
      'q+': Math.floor((currentTime.getMonth() + 3) / 3), // 季度
      'S': currentTime.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentTime.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  }

//aes 加密
function encrypt(data) {
    var key  = CryptoJS.enc.Latin1.parse('ea3ac5b2af5c11e8');
    var iv   = CryptoJS.enc.Latin1.parse('f92aaa9aaf5c11e8');
    return CryptoJS.AES.encrypt(data, key, {iv:iv, mode:CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding}).toString();
}

function dcrypt(data){
	var key  = CryptoJS.enc.Latin1.parse('ea3ac5b2af5c11e8');
    var iv   = CryptoJS.enc.Latin1.parse('f92aaa9aaf5c11e8');
    return CryptoJS.AES.decrypt(data, key, {iv:iv, mode:CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding}).toString(CryptoJS.enc.Utf8);
}


//获取通告信息
function getInforMation(){
	var info = '';
	$.ajax({
		async:false,
		url: '/wx/sys/hosuser/getInforMation',
        contentType: 'application/json;charset=utf-8',
        method: 'get',
        dataType: 'JSON',
        success: function (res) {
            if (res.code = '0') {
            	info = res.data;
            } else
                alert(res.msg);
        }
	});
	return info;
}

////模块初始化
//var init=function () {
//  key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(ym.hezubao).toString());
//  iv = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(key).toString().substr(0,16));
//}
//function encrypt(data) {
//  var encrypted='';
//  if(typeof(data)=='string')
//  {
//    encrypted = CryptoJS.AES.encrypt(data,key,{
//      iv : iv,
//      mode : CryptoJS.mode.CBC,
//      padding : CryptoJS.pad.ZeroPadding
//    });
//  }else if(typeof(data)=='object'){
//    data = JSON.stringify(data);
//    encrypted = CryptoJS.AES.encrypt(data,key,{
//      iv : iv,
//      mode : CryptoJS.mode.CBC,
//      padding : CryptoJS.pad.ZeroPadding
//    })
//  }
//  return encrypted.toString();
//}
///*AES解密
//* param : message 密文
//* return : decrypted string 明文
//*/
//function decrypt(message) {
//  decrypted='';
//  decrypted=CryptoJS.AES.decrypt(message,key,{
//    iv : iv,
//    mode : CryptoJS.mode.CBC,
//    padding : CryptoJS.pad.ZeroPadding
//  });
//  return decrypted.toString(CryptoJS.enc.Utf8);
//}

//$.ajaxSetup({
//  headers: {
//      "Content-Type": "application/json;charset=utf-8",
//      "token": window.localStorage.getItem('m_token')
//  },
//  complete: function (res) {
//      if (JSON.parse(res.responseText).code == '401') {
//          window.top.location.href = 'index.html';
//      }
//  }
//});