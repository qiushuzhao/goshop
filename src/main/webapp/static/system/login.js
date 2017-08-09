/**
 * 登录
 */
function submitForm() {
//	debugger
	$.ajax({
        cache: true,
        type: "POST",
        url:"shirologin",
        data:$('#loginform').serialize(),
        async: false,
        success: function(data) {
        	var obj = eval('(' + data + ')');
        	if(obj.success){
        		 window.location.href = '/goshop/index';
        	}else{
        		layer.msg(obj.msg,{icon: 2});
        	}
         },
        error: function(request) {
            layer.msg("Connection error",{icon: 2});
        }
    });
}
