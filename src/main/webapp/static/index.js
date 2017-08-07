function logout(){
	layer.confirm('确定退出？', {
	  btn: ['是','否'] //按钮
	},function(){
		$.ajax({
			type : 'POST',
			url : "logout",
			dataType : "json",
			cache : false,
			success : function(){
    		  window.location.href = '/goshop/index';
    		  layer.msg('退出成功', {icon: 1});
			}
		});
	});
}