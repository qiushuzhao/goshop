function cmainFrame() {
	debugger
	var hmain = document.getElementById("mainFrame");
	var bheight = document.documentElement.clientHeight;
	hmain.style.width = '100%';
	hmain.style.height = (bheight - 85) + 'px';
}
cmainFrame();
window.onresize = function() {
	cmainFrame();
};
// 获取菜单
function goTo(menuId,url) {
	var hmain = document.getElementById("mainFrame");
	hmain.src = url ;
}

/**
 * 退出
 */

function off() {
	$.ajax({
        cache: true,
        type: "POST",
        url:"logout",
        async: false,
        success: function(data) {
        	var obj = eval('(' + data + ')');
        	if(obj.success){
        		 window.location.href = '/goshop/login';
        	}else{
        		layer.msg(obj.msg,{icon: 2});
        	}
         },
        error: function(request) {
            layer.msg("Connection error",{icon: 2});
        }
    });
}