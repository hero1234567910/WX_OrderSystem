$("#toSave").click(function() {
  var params2 = {};

  params2["hosUserName"] = $("#hosUserName").val();
  params2["hosUserMobile"] = $("#hosUserMobile").val();
  params2["rowGuid"] = $("#rowGuid").val();
  params2["hosInpatient"] = $("#hosInpatient").val();
  params2["hosStorey"] = $("#hosStorey").val();
  params2["hosBedNumber"] = $("#hosBedNumber").val();
  params2["hosUserGuid"] = localStorage.getItem("userGuid");

  if (
    panNull($("#hosUserName").val(), "用户名不能为空") ||
    checkName($("#hosUserName").val(), "用户名格式错误") ||
    panNull($("#hosUserMobile").val(), "手机号码不能为空") ||
    checkMobile($("#hosUserMobile").val(), "手机号格式错误") ||
    panNull($("#hosInpatient").val(), "病区不能为空") ||
    checkAddress($("#hosInpatient").val(), "病区格式错误") ||
    panNull($("#hosStorey").val(), "楼层不能为空") ||
    checkAddress($("#hosStorey").val(), "楼层格式错误") ||
    panNull($("#hosBedNumber").val(), "床号不能为空") ||
    checkAddress($("#hosBedNumber").val(), "床号格式错误")
  ) {
    return;
  }

  var flag = GetQueryString("flag");
  if (GetQueryString("rowGuid") == null) {
    $.ajax({
      url: "/wx/sys/hosaddress/add",
      contentType: "application/json;charset=utf-8",
      method: "post",
      data: JSON.stringify(params2),
      dataType: "JSON",
      success: function(res) {
        if (res.code == "0") {
          if (flag) {
            $.toast("保存成功", function() {
              location.href =
                "../../../../WXOrderSystem/pages/order/orderLocationList.html";
            });
          } else {
            $.toast("保存成功", function() {
              location.href =
                "../../../../WXOrderSystem/pages/addressMG/address.html";
            });
          }
        }
        if (res.code == "500") {
          console.log(res.msg);
        }
      }
    });
  } else {
    $.ajax({
      url: "/wx/sys/hosaddress/update",
      contentType: "application/json;charset=utf-8",
      method: "put",
      data: JSON.stringify(params2),
      dataType: "JSON",
      success: function(res) {
        if (res.code == "0") {
          $.toast("保存成功", function() {
            location.href =
              "../../../../WXOrderSystem/pages/addressMG/address.html";
          });
        }
        if (res.code == "500") {
          console.log(res.msg);
        }
      }
    });
  }
});

$().ready(function() {
  var rowGuid = GetQueryString("rowGuid");
  var hosUserName = GetQueryString("hosUserName");
  var hosUserMobile = GetQueryString("hosUserMobile");
  var hosInpatient = GetQueryString("hosInpatient2");
  //console.log(hosInpatient);
  if (hosInpatient == "null") {
    hosInpatient = GetQueryString("hosInpatient");
  }

  var hosStorey = GetQueryString("hosStorey2");
  if (hosStorey == "null") {
    hosStorey = GetQueryString("hosStorey");
  }
  //console.log(hosStorey);
  var hosBedNumber = GetQueryString("hosBedNumber2");
  if (hosBedNumber == "null") {
    hosBedNumber = GetQueryString("hosBedNumber");
  }
  $("#rowGuid").val(rowGuid);
  $("#hosUserName").val(hosUserName);
  $("#hosUserMobile").val(hosUserMobile);
  $("#hosInpatient").val(hosInpatient);
  $("#hosStorey").val(hosStorey);
  $("#hosBedNumber").val(hosBedNumber);
});


//获取url中的参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
  if (r != null) return decodeURI(r[2]);
  return null;
}

function panNull(ele, str) {
  if (ele == null || ele == "") {
    $.alert(str, "警告");
    return true;
  } else {
    return false;
  }
}

function checkName(ele, str) {
  var patrn = /^[\u2E80-\u9FFF]+$/;
  if (!patrn.test(ele)) {
    $.alert(str, "警告");
    return true;
  } else {
    return false;
  }
}

function checkMobile(ele, str) {
  var tel = $("#hosUserMobile").val();
  var patrn = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!patrn.test(tel)) {
    $.alert(str, "警告");
    return true;
  } else {
    return false;
  }
}

function checkAddress(ele, str) {
  var patrn = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
  if (!patrn.test(ele)) {
    $.alert(str, "警告");
    return true;
  } else {
    return false;
  }
}
