// Unicode 编码转汉字
function reconvert(str) {
    str = str.replace(/(\\u)(\w{1,4})/gi, function ($0) {
        return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)));
    });
    str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
    });
    str = str.replace(/(&#)(\d{1,6});/gi, function ($0) {
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
    });

    return str;
}

// 日期对象转换成字符串
function date2String(date) {

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var monthStr = (month <= 9 ? '0' : '') + month;
    var dayStr = (day <= 9 ? '0' : '') + day;
    var hourStr = (hour <= 9 ? '0' : '') + hour;
    var minuteStr = (minute <= 9 ? '0' : '') + minute;
    var secondStr = (second <= 9 ? '0' : '') + second;
    return year + '-' + monthStr + '-' + dayStr + ' ' + hourStr + ':' + minuteStr + ':' + secondStr;
}

// 获取 form 表单 json 数据
function getFormJson(form) {
    var o = {};
    var a = $(form).serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

// 打开弹出框
function openFrame(url) {
    layer.open({
        type: 2,
        title: '',
        shadeClose: false,
        shade: 0.8,
        area: ['60%', '60%'],
        content: url //iframe的url
    });
}