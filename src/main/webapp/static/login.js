/*
 * 获得焦点蒙眼睛
 */
$(function(){
	 // 得到焦点
    $("#password").focus(function () {
        $("#left_hand").animate({
            left: "150",
            top: " -38"
        }, {
            step: function () {
                if (parseInt($("#left_hand").css("left")) > 140) {
                    $("#left_hand").attr("class", "left_hand");
                }
            }
        }, 2000);
        $("#right_hand").animate({
            right: "-64",
            top: "-38px"
        }, {
            step: function () {
                if (parseInt($("#right_hand").css("right")) > -70) {
                    $("#right_hand").attr("class", "right_hand");
                }
            }
        }, 2000);
    });
    // 失去焦点
    $("#password").blur(function () {
        $("#left_hand").attr("class", "initial_left_hand");
        $("#left_hand").attr("style", "left:100px;top:-12px;");
        $("#right_hand").attr("class", "initial_right_hand");
        $("#right_hand").attr("style", "right:-112px;top:-12px");
    });
})

/**
 * 换验证码
 */
$(function(){
	$("#imgid").click(function(){
		$(this).attr("src","captcha.jpg?="+new Date())
	});
});

/**
 * 登录
 */
function submitForm() {
	debugger
	$.ajax({
        cache: true,
        type: "POST",
        url:"shirologin",
        data:$('#loginform').serialize(),// 你的formid
        async: false,
        success: function(data) {
        	var obj = eval('(' + data + ')');
        	if(obj.success){
        		 window.location.href = '/goshop/index?menuId=1';
        	}else{
            		$("#imgid").attr("src","captcha.jpg?="+new Date())
            		layer.msg(obj.msg,{icon: 2});
        	}
         },
        error: function(request) {
            alert("Connection error");
        }
    });
}


