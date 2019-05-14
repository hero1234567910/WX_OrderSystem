$(function() {
    FastClick.attach(document.body);
});
$.ajaxSetup({
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "token": window.localStorage.getItem('m_token')
    },
    complete: function (res) {
        if (JSON.parse(res.responseText).code == '401') {
            window.top.location.href = 'index.html';
        }
    }
});