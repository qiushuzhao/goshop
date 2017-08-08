(function($) {
	// 封装验证规则
	$.validator.setDefaults({
		wrapper : "tr",
	// showErrors: function (errorMap, errorArr) {
	// //获取焦点
	// $(errorArr[0].element).focus();
	// this.defaultShowErrors();
	// }
	});
	// 重写
	jQuery
			.extend(
					jQuery.validator.messages,
					{
						required2 : "<font color='#ff0000'>请填写必填项</font>",
						required4 : "<font color='#ff0000'>内容不可为空</font>",
						required5 : "<font color='#ff0000'>消息类型不可为空</font>",
						required6 : "<font color='#ff0000'>请选择产品的供应商</font>",
						remote : "<font color='#ff0000'>请修正该字段</font>",
						email : "<font color='#ff0000'>请输入正确格式的电子邮件</font>",
						url : "<font color='#ff0000'>请输入合法的网址</font>",
						date : "<font color='#ff0000'>请输入合法的日期</font>",
						dateISO : "<font color='#ff0000'>请输入合法的日期 (ISO).</font>",
						number : "<font color='#ff0000'>&nbsp;请输入合法的数字</font>",
						digits : "<font color='#ff0000'>只能输入整数</font>",
						creditcard : "<font color='#ff0000'>请输入合法的信用卡号</font>",
						equalTo : "<font color='#ff0000'>请再次输入相同的值</font>",
						accept : "<font color='#ff0000'>请输入拥有合法后缀名的字符串</font>",
						maxlength : jQuery.validator
								.format("<font color='#ff0000'>请输入一个最大位数为{0} 的数字</font>"),
						minlength : jQuery.validator
								.format("<font color='#ff0000'>请输入一个 长度最少是 {0} 的字符串</font>"),
						rangelength : jQuery.validator
								.format("<font color='#ff0000'>请输入 一个长度介于 {0} 和 {1} 之间的字符串</font>"),
						range : jQuery.validator
								.format("<font color='#ff0000'>请输入一个介于 {0} 和 {1} 之间的值</font>"),
						max : jQuery.validator
								.format("<font color='#ff0000'>请输入一个最大数为{0} 的数字</font>"),
						min : jQuery.validator
								.format("<font color='#ff0000'>请输入一个最小为{0} 的值</font>")
					});
	// 邮政编码验证
	jQuery.validator.addMethod("isZipCode", function(value, element) {
		var tel = /^[0-9]{6}$/;
		return this.optional(element) || (tel.test(value));
	}, "<font color='#ff0000'>&nbsp;请正确填写您的邮政编码</font>");
	// 固话和手机验证
	jQuery.validator
			.addMethod(
					"phone",
					function(value, element) {
						var tel = /^(?:13\d|14\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$|^\d{3,4}-\d{7,8}$|^\d{3,4}-\d{3}-\d{4,5}$/;
						return this.optional(element) || (tel.test(value));
					},
					"<font color='#ff0000'>&nbsp;请正确填写电话号码(如025-8889999,13888888888,400-873-1118)</font>");

	// 手机号码验证规则
	jQuery.validator.addMethod("isMobile", function(value, element) {
		var isMobile = /^(?:13\d|14\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/; // ^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$
		return this.optional(element) || (isMobile.test(value));
	}, "<font color='#ff0000'>&nbsp;请正确填写手机号码</font>");

	// 座机验证规则
	jQuery.validator
			.addMethod("isPhone", function(value, element) {
				var isPhone = /^\d{3,4}-\d{3}-\d{4,5}$|^\d{3,4}-\d{7,8}$/;
				return this.optional(element) || (isPhone.test(value));
			},
					"<font color='#ff0000'>&nbsp;请正确填写座机号(0518-8731118,400-873-1118)</font>");
	// 身份证验证规则
	jQuery.validator
			.addMethod(
					"isKA",
					function(value, element) {
						var isKA = /^[\d]{6}((19[\d]{2})|(200[0-8]))((0[1-9])|(1[0-2]))((0[1-9])|([12][\d])|(3[01]))[\d]{3}[0-9xX]$/;
						return this.optional(element) || (isKA.test(value));
					}, "<font color='#ff0000'>&nbsp;请正确填写您的身份证号码</font>");

	// 密码验证正则表达式
	jQuery.validator
			.addMethod(
					"regexPassword",
					function(value, element) {
						var isPWD = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
						return this.optional(element) || (isPWD.test(value));
					},
					"<font color='#ff0000'>&nbsp;密码至少包一个大写字母、一个小写字母及一个符号，长度至少8位</font>");
	// 二次输入密码验证
	// messages 下 二次输入密码Id: { required: true, rangelength: [8, 15], equalTo:
	// "#一次密码Id" }

	//消息标题校验不为空
	jQuery.validator.addMethod("required3", function(value, element) {
		return $.trim(value)==""?false:true;
	}, "<font color='#ff0000'>&nbsp;标题不可为空</font>");


	//消息标题校验不为空
	jQuery.validator.addMethod("required4", function(value, element) {
		return $.trim(value)==""?false:true;
	}, "<font color='#ff0000'>&nbsp;内容不可为空</font>");

	//消息标题校验不为空
	jQuery.validator.addMethod("requiredByC", function(value, element) {
		return $.trim(value)==""?false:true;
	}, "");

	
	//消息标题校验不为空
	jQuery.validator.addMethod("required5", function(value, element) {
		return $.trim(value)==""?false:true;
	}, "<font color='#ff0000'>&nbsp;消息类型不可为空</font>");

	//供应商校验不为空
	jQuery.validator.addMethod("required6", function(value, element) {
		return $.trim(value)==""?false:true;
	}, "<font color='#ff0000'>&nbsp;请选择产品的供应商</font>");

	//系统升级通知内容不为空
	jQuery.validator.addMethod("required7", function(value, element) {
		return $.trim(value)==""?false:true;
	}, "<font color='#ff0000'>&nbsp;请填写维护通知内容！</font>");
	
	//系统升级通知开始时间不为空
	jQuery.validator.addMethod("required8", function(value, element) {
		return $.trim(value)==""?false:true;
	}, "<font color='#ff0000'>&nbsp;请选择通知开始时间！</font>");
	
	//系统升级通知结束时间不为空
	jQuery.validator.addMethod("required9", function(value, element) {
		return $.trim(value)==""?false:true;
	}, "<font color='#ff0000'>&nbsp;请选择通知结束时间！</font>");
	
	// 系统升级通知内容校验
	jQuery.validator.addMethod("updateContent2", function(value, element) {
		var updateContent2=/^[A-Za-z0-9\u4e00-\u9fa5\-！!_——，,。?？；;]+$/;
		return (value == "") || (updateContent2.test(value));
	}, "<font color='#ff0000'>&nbsp;维护通知内容请输入100字以内汉字数字或者字母及常用标点符号</font>");
	
	// 密码验证正则表达式
	jQuery.validator.addMethod("PassWord", function(value, element) {
		var isPWD = /^\d{4}$/;
		return this.optional(element) || (isPWD.test(value));
	}, "<font color='#ff0000'>&nbsp;密码要以纯数字只能设置4位</font>");
	// 标题
	jQuery.validator.addMethod("title", function(value, element) {
		var istitle1 = /^[\w\u4e00-\u9fa5].*[\w\u4e00-\u9fa5]$/;
		return this.optional(element) || (istitle1.test(value));
	}, "<font color='#ff0000'>&nbsp;只能输入汉字、字母、数字、小数点</font>");
	// 名称
	jQuery.validator.addMethod("title2", function(value, element) {
		var istitle = /^[a-zA-Z0-9\u4e00-\u9fa5]*[a-zA-Z0-9\u4e00-\u9fa5]$/;
		return (value == "") || (istitle.test(value));
	}, "<font color='#ff0000'>&nbsp;只能输入汉字、字母、数字</font>");
	//校验  汉字、字母、数字或-、#
	jQuery.validator.addMethod("title3", function(value, element) {
		var title3 = /^[-# a-zA-Z0-9\u4e00-\u9fa5\u3002\uff1f\uff1b\uff08\uff09\u3001]*$/;
		return this.optional(element) || (title3.test(value));
	}, "<font color='#ff0000'>&nbsp;只能输入汉字、字母、数字或-、#</font>");
	
	// 二次输入密码验证
	// messages 下 二次输入密码Id: { required: true, rangelength: [8, 15], equalTo:
	// "#一次密码Id" }
	$.validator.addMethod("alphanumeric", function(value, element) {
		return this.optional(element) || /^[A-Za-z0-9\\_\\.]+$/i.test(value);
	}, "<font color='#ff0000'>&nbsp;只能输入字母、数字、_和.</font>");

	$.validator.addMethod("numberTwo", function(value, element) {
		return this.optional(element) || /^[A-Za-z0-9\\-]+$/i.test(value);
	}, "<font color='#ff0000'>&nbsp;只能输入字母、数字、中划线(-)</font>");

	// IP地址验证
	jQuery.validator
			.addMethod(
					"ip",
					function(value, element) {
						var ip = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
						return this.optional(element)
								|| (ip.test(value) && (RegExp.$1 < 256
										&& RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256));
					}, "<font color='#ff0000'>&nbsp;Ip地址格式错误</font>");

	// 字母和数字的验证
	jQuery.validator.addMethod("chrnum", function(value, element) {
		var chrnum = /^([a-zA-Z0-9]+)$/;
		return this.optional(element) || (chrnum.test(value));
	}, "<font color='#ff0000'>&nbsp;只能输入数字和字母(字符A-Z, a-z, 0-9)</font>");
	
	// 字母和数字、中文、通用字符的验证
	jQuery.validator.addMethod("zzstValidate", function(value, element) {
		var zzstValidate = /^[-`~·！!@#￥$%^……&*（） ()_——+=《》<>，,.。/、；：;:‘’'“”"|\][、{}【】？?/a-zA-Z0-9\u4e00-\u9fa5\u3002\uff1f\uff1b\uff08\uff09\u3001]*$/;
		return this.optional(element) || (zzstValidate.test(value));
	}, "<font color='#ff0000'>&nbsp;只能输入字母和数字、中文、通用字符</font>");
	
	// 汉字的验证
	jQuery.validator.addMethod("chinese", function(value, element) {
		var chinese = /^[\u4e00-\u9fa5]+$/;
		return this.optional(element) || (chinese.test(value));
	}, "<font color='#ff0000'>&nbsp;只能输入汉字</font>");

	// 不能汉字的验证
	jQuery.validator.addMethod("chineseNo", function(value, element) {
		var chineseNo = /^[\u4e00-\u9fa5]+$/;
		return this.optional(element) || (!chineseNo.test(value));
	}, "<font color='#ff0000'>&nbsp;请勿输入汉字</font>");

	// 正浮点型验证
	jQuery.validator.addMethod("float", function(value, element) {
		// var float = /^(([1-9]\d*)|0)(\.\d{2}|\.\d{1})?$/;
		var float = /^(([1-9]\d*)|0)(\.(\d){1,2})?$/;
		return this.optional(element) || (float.test(value));
	}, "<font color='#ff0000'>&nbsp;请输入大于或等于0的数字</font>");

	// 验证有两位小数的正实数
	jQuery.validator.addMethod("priceInfo", function(value, element) {
		// var float = /^(([1-9]\d*)|0)(\.\d{2}|\.\d{1})?$/;
		var float = /^(([1-9]\d*)|0)(\.\d{1,2})?$/;
		return this.optional(element) || (float.test(value));
	}, "<font color='#ff0000'>&nbsp;请输入正确的数值</font>");

	jQuery.validator.addMethod("longfloat", function(value, element) {
		var float = /^([1-9][\d]{0,7}|0)(\.\d*[1-9]\d*)?$/;
		return this.optional(element) || (float.test(value));
	}, "<font color='#ff0000'>&nbsp;请输入大于或等于0的数字</font>");

	// 正整数验证
	jQuery.validator.addMethod("isInteger", function(value, element) {
		var integer = /^(0|([1-9]\d*))$/;
		return this.optional(element) || (integer.test(value));
	}, "<font color='#ff0000'>&nbsp;请输入正整数</font>");

	// 金额最大长度验证
	jQuery.validator.addMethod("maxMoney", function(value, element) {
		// var float = /^(0|([1-9]\d*))$/;
		return this.optional(element) || (value < 10000000);
	}, "<font color='#ff0000'>&nbsp;请输入一千万以内的金额</font>");

	// 字母和数字的验证
	jQuery.validator.addMethod("checkNumandHg", function(value, element) {
		var checkNumandHg = /^[0-9\-]+$/;
		return this.optional(element) || (checkNumandHg.test(value));
	}, "<font color='#ff0000'>&nbsp;只能输入数字和'-'</font>");
	// 下拉框验证
	jQuery.validator.addMethod("selectNone", function(value, element) {
		var selectNone = /^[^0][\d]?$/;
		return this.optional(element) || (selectNone.test(value));
	}, "<font color='#ff0000'>&nbsp;必须选择一项</font>");
	// return value == "请选择";
	// }, "<font color='#ff0000'>必须选择一项1<font>");
	// qq验证
	jQuery.validator.addMethod("qq", function(value, element) {
		var tel = /^[1-9]\d*$/;
		return this.optional(element) || (tel.test(value));
	}, "<font color='#ff0000'>&nbsp;qq号码格式错误</font>");

	jQuery.validator.addMethod("checktitle", function(value, element) {
		var ctitle = /^[\w\u4e00-\u9fa5].*[\w\u4e00-\u9fa5]$/;
		return this.optional(element) || (ctitle.test(value));
	}, "<font color='#ff0000'>&nbsp;只能输入汉字、字母、数字、小数点</font>");
	// 字节长度验证
	jQuery.validator
			.addMethod(
					"byteRangeLength",
					function(value, element, param) {
						var length = value.length;
						for ( var i = 0; i < value.length; i++) {
							if (value.charCodeAt(i) > 127) {
								length++;
							}
						}

						return this.optional(element)
								|| (length >= param[0] && length <= param[1]);
					},
					$.validator
							.format("<font color='#ff0000'>请确保输入的值在{0}-{1}个字节之间(一个汉字字算2个字节)</font>"));
})(jQuery);

// 6位数验证码验证
jQuery.validator.addMethod("veriCode", function(value, element) {
	var veriCode = /^\d{6}$/;
	return this.optional(element) || (veriCode.test(value));
}, "<font color='#ff0000'>&nbsp;请输入6位数字验证码</font>");

// 4位正整数验证
jQuery.validator.addMethod("pointInteger", function(value, element) {
	var isIntegers = /^[1-9]\d{0,3}$/;
	return this.optional(element) || (isIntegers.test(value));
}, "<font color='#ff0000'>&nbsp;只支持4位正整数</font>");

// 6位数验证码验证
jQuery.validator.addMethod("sixNum", function(value, element) {
	var sixNum = /^\d{6}$/;
	return this.optional(element) || (sixNum.test(value));
}, "<font color='#ff0000'>&nbsp;请输入6位数字工号</font>");

// 10位-11位数验证码验证
jQuery.validator.addMethod("usaMobile", function(value, element) {
	var usaMobile = /^\d{10,11}$/;
	return this.optional(element) || (usaMobile.test(value));
}, "<font color='#ff0000'>&nbsp;只支持10-11位数字</font>");

// 美国姓名验证
jQuery.validator.addMethod("usaName", function(value, element) {
	var usaName = /^[a-zA-Z\u4e00-\u9fa5]+$/;
	return this.optional(element) || (usaName.test(value));
}, "<font color='#ff0000'>&nbsp;只支持30位中英文字符</font>");

// 6-15位字符，包含字母，数字组合
jQuery.validator.addMethod("regexPassword2", function(value, element) {
	var regexPassword2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
	return this.optional(element) || (regexPassword2.test(value));
}, "<font color='#ff0000'>&nbsp;请输入6-15位字符，包含字母，数字组合</font>");

//正整数验证(>1)
jQuery.validator.addMethod("isIntegerUpOne", function(value, element) {
    var integer = /^(([1-9]\d*))$/;
    return this.optional(element) || (integer.test(value));
}, "<font color='#ff0000'>&nbsp;请输入大于0的正整数</font>");

function fmoney(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	t = "";
	for ( var i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "" : "");
	}
	return t.split("").reverse().join("") + "." + r;
}