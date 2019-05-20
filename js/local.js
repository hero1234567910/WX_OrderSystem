$(function() {
    FastClick.attach(document.body);
});

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