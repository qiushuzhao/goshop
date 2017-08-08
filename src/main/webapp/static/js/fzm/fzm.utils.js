
/**
 * 公共帮助类
 */
var commUtils = {
		
		/**
		 * 重置
		 * @param obj 重置范围对象
		 */
		resetVal:function resetInputVal(inputArr){
			
			//文本框
			$("input[type='text'],input[type='password']",inputArr).val("");
			
			//select
			$("select",inputArr).val("");
			
			//radio
			$("input[type='radio']",inputArr).attr("checked",false);
			
			//radio
			$("input[type='checkbox']",inputArr).attr("checked",false);
			
		},
		disabledVal:function disabledInputVal(inputArr){
			$("input",inputArr).each(function(){
				$(this).attr("disabled",true);
			});
			
			$("select",inputArr).each(function(){
				$(this).attr("disabled",true);
			});
			
			$("textarea",inputArr).each(function(){
				$(this).attr("disabled",true);
			});
			$(".btn-primary",inputArr).hide();
			$(".btn-success",inputArr).hide(); 
			$("font",inputArr).hide(); 
			//文本框
			/*$("input[type='text'],input[type='password']",inputArr).val("");
			
			//select
			$("select",inputArr).val("");
			
			//radio
			$("input[type='radio']",inputArr).attr("checked",false);
			
			//radio
			$("input[type='checkbox']",inputArr).attr("checked",false);*/
			
		},
		setVal:function(reginObj, jsonObj) {

			// 循环赋值
			reginObj.find("input[name]").each(function() {
				var name = $(this).attr("name");
				var startIndex = name.lastIndexOf(".");

				// 如果包含.把点前的字符截取掉
				if (startIndex > -1) {
					name = name.substr(startIndex + 1, name.length);
				}

				// 设置值
				var val = jsonObj[name];
				if (val != null && val != "")
				{
					$(this).val(val);
				}
				
			});
		},
		setJsonValue:function(inputArr, jsonObj) {

			// 循环赋值
			$("input",inputArr).each(function(){
				$(this).val(jsonObj[$(this).attr("name")]);
			});
			$("select",inputArr).each(function(){
				$(this).val(jsonObj[$(this).attr("name")]);
			});
		},
		signObj:function(obj, sign) {
			// 循环结束后为标记的下一级
			var isFlag = true;
			while (isFlag) {
				obj = $(obj).parent();
				isFlag = !obj.is(sign);
			}
			return obj;
		},
		downMoveDiv:function(obj,sign) {
			var curDiv = commUtils.signObj(obj,sign);
			curDiv.next("div").after(curDiv);
		},
		upMoveDiv:function(obj,sign) {
			var curDiv = commUtils.signObj(obj,sign);
			curDiv.prev("div").before(curDiv);
		},
		delDiv:function(obj,sign){
			var curDiv = commUtils.signObj(obj,sign);
			curDiv.remove();
		},
		setFileName:function(obj){
			$(obj).parent().prev().find("[fileName]").val($(obj).val());
		},
		setIndexNum:function(reginObj,sign){
			reginObj.children().each(
					function(i) {

						// 设置所有name属性值的序列
						$(this).find("input[name]").each(
								function() {
									$(this).attr(
											"name",
											$(this).attr("name").replace("[]",
													"[" + i + "]"));
								});

						// 设置轮播图片的顺序
						$(this).find("input[name$='"+sign+"']").val(i + 1);
					});
		},
		setSelected:function(obj){
			var val = $(obj).val();
			$(obj).find("option[selected='selected']").removeAttr("selected");
			$(obj).find("option[value='"+val+"']").attr("selected","selected");
		}
};

