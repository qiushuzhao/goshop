// 是否打印debug信息(true:打印, false:不打印)
var isDebugConsoleFlag = true;

/**
 * 添加deubg日志
 * @param msg 提示信息
 */
function addDebugInfo(msg){
    if (isDebugConsoleFlag) {
        var dateObj = new Date();
        console.log(dateObj.format('yyyy-MM-dd h:m:s') + " " + msg);
    }
}


/**
 * 日期格式化
 */
Date.prototype.format = function(format) {
    var date = {
        "M+" : this.getMonth() + 1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth() + 3) / 3),
        "S+" : this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '')
                .substr(4 - RegExp.$1.length));
    }
    for ( var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k]
                    : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
