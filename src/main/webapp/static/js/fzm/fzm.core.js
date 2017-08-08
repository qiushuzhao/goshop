// 菜单操作模块ID
var menusOperationModuleId="";

/**
 * 加载等待，实现 $(document).ajaxStart(function(){ sajaxbg.show();
 * }).ajaxStop(function(){ ajaxbg.hide(); });
 */

var FZM = {
	mainContent : 'mainContainer',
	keyCode : {
		ENTER : 13,
		ESC : 27,
		END : 35,
		HOME : 36,
		SHIFT : 16,
		TAB : 9,
		LEFT : 37,
		RIGHT : 39,
		UP : 38,
		DOWN : 40,
		DELETE : 46,
		BACKSPACE : 8
	},
	pageInfo : {
		pageNum : "pageNum",
		numPerPage : "numPerPage",
		orderField : "orderField",
		orderDirection : "orderDirection"
	},
	statusCode : {
		ok : 200,
		error : 300,
		timeout : 301,
		verification : 400
	},
	keys : {
		statusCode : "statusCode",
		message : "message",
		operateType : "operateType"
	},
	/*
	 * json to string
	 */
	obj2str : function(o) {
		var r = [];
		if (typeof o == "string")
			return "\""
					+ o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n")
							.replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t")
					+ "\"";
		if (typeof o == "object") {
			if (!o.sort) {
				for ( var i in o)
					r.push(i + ":" + FZM.obj2str(o[i]));
				if (!!document.all
						&& !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/
								.test(o.toString)) {
					r.push("toString:" + o.toString.toString());
				}
				r = "{" + r.join() + "}"
			} else {
				for ( var i = 0; i < o.length; i++) {
					r.push(FZM.obj2str(o[i]));
				}
				r = "[" + r.join() + "]"
			}
			return r;
		}
		return o.toString();
	},
	str2obj : function(data) {
		try {
			if ($.type(data) == 'string')
				return eval('(' + data + ')');
			else
				return data;
		} catch (e) {
			return {};
		}
	},
	ajaxError : function(xhr, ajaxOptions, thrownError) {
		notyUtils.error("<div>Http status: " + xhr.status + " "
				+ xhr.statusText + "</div>" + "<div>ajaxOptions: "
				+ ajaxOptions + "</div>" + "<div>thrownError: " + thrownError
				+ "</div>" + "<div>" + xhr.responseText + "</div>");
	},
	ajaxDone : function(json) {
		if (json[FZM.keys.statusCode] == FZM.statusCode.error) {
			if (json[FZM.keys.message])
				notyUtils.error(json[FZM.keys.message]);
		} else if (json[FZM.keys.statusCode] == FZM.statusCode.timeout) {
			alert(json[FZM.keys.message]);
		} else if (json[FZM.keys.statusCode] == FZM.statusCode.ok) {
			if (json[FZM.keys.message])
				notyUtils.info(json[FZM.keys.message]);
		} else if (json[FZM.keys.statusCode] == FZM.statusCode.verification) {
			if (json[FZM.keys.message])
				notyUtils.warn(json[FZM.keys.message]);
		}
	},
	ajaxDone2 : function(json) {
		if (json[FZM.keys.statusCode] == FZM.statusCode.error) {
			if (json[FZM.keys.message])
				layerMsg.error(json[FZM.keys.message]);
		} else if (json[FZM.keys.statusCode] == FZM.statusCode.timeout) {
			layerMsg.info(json[FZM.keys.message]);
		} else if (json[FZM.keys.statusCode] == FZM.statusCode.ok) {
			if (json[FZM.keys.message])
				layerMsg.success(json[FZM.keys.message]);
		} else if (json[FZM.keys.statusCode] == FZM.statusCode.verification) {
			if (json[FZM.keys.message])
				layerMsg.info(json[FZM.keys.message]);
		}
	},
	ajaxUrl : function(op) {
		var $this = $(this);
		$.ajax({
			type : op.type || 'GET',
			url : op.url,
			data : op.data,
			cache : false,
			success : function(response) {

				if (!op.rel) {
					op.rel = FZM.mainContent;
				}

				$("#" + op.rel).html(response);
			},
			error : FZM.ajaxError,
			statusCode : {
				503 : function(xhr, ajaxOptions, thrownError) {
					notyUtils.error(thrownError);
				}
			}
		});
	},
	ajaxMenusUrl : function(op, uuid) {
        var $this = $(this);
        $.ajax({
            type : op.type || 'GET',
            url : op.url,
            data : op.data,
            cache : false,
            success : function(response) {

                if (!op.rel) {
                    op.rel = FZM.mainContent;
                }

                //debugger;
                if (menusOperationModuleId == uuid){
                    $("#" + op.rel).html(response);
                }
            },
            error : FZM.ajaxError,
            statusCode : {
                503 : function(xhr, ajaxOptions, thrownError) {
                    notyUtils.error(thrownError);
                }
            }
        });
    },
	loadUrl : function(url, data, callback) {
		FZM.ajaxUrl({
			url : url,
			data : data,
			callback : callback
		});
	}
};

/**
 * 
 * @param actionUrl
 */
function refreshMianContent(actionUrl, rel) {
	var options = {
		url : actionUrl
	};
	if (rel) {
		if (rel != undefined) {
			$.extend(options, {
				type : "POST"
			});
		} else {
			$.extend(options, {
				rel : rel,
				type : "POST"
			});
		}
	}

	// 刷新右侧信息
	FZM.ajaxUrl(options);
}

/**
 * 
 * @param actionUrl
 */
function refreshMianMenusContent(actionUrl, rel, uuid) {
    var options = {
        url : actionUrl
    };
    if (rel) {
        if (rel != undefined) {
            $.extend(options, {
                type : "POST"
            });
        } else {
            $.extend(options, {
                rel : rel,
                type : "POST"
            });
        }
    }

    // 刷新右侧信息
    FZM.ajaxMenusUrl(options, uuid);
}

/**
 * 只给左侧菜单使用
 * 
 * @param actionUrl
 */
function menuRefreshMianContent(actionUrl, obj) {
    menusOperationModuleId = getOperateUUID("M");
    
	$('#pageForm').html('');
	$('#pageForm').attr('action', '');
	$('#pageForm').attr('onsubmit', '');
	$('#showCurPage').val(1);
	// 刷新右侧信息
	refreshMianMenusContent(actionUrl, null, menusOperationModuleId);

	// 设置导航信息
	menuNav2(obj);

	menuColor(obj);
}

function menuHomeRefresh(actionUrl, obj) {
    menusOperationModuleId = getOperateUUID("H");
    
	// 刷新右侧信息
    refreshMianMenusContent(actionUrl, null, menusOperationModuleId);

	menuNav1(obj);
}

/**
 * 一级菜单导航
 * 
 * @param obj
 */
function menuNav1(obj) {

	$("#xgdivider", ".mainbar").html("");
	$("#navMenu2", ".mainbar").html("");

	var navMenuH2 = $("#navMenuH2", ".mainbar");
	var iconCss = $(obj).find("i").attr("class");

	// 设置图片标
	if (iconCss == "icon-home") {
		$("#ih1").show();
		$("#im1").hide();

		$("#ih2").show();
		$("#im2").hide();

	} else {
		$("#ih1").hide();
		$("#im1").show();

		$("#ih2").hide();
		$("#im2").show();
	}

	// 菜单名称
	navMenuH2.html($(obj).find("span").html());

	var navMenu1 = $("#navMenu1", ".mainbar");

	// 菜单名称
	navMenu1.html($(obj).find("span").html());

}

/**
 * 二级菜单导航
 * 
 * @param obj
 */
function menuNav2(obj) {
	// 菜单名称
	$("#navMenuH2", ".mainbar").html($(obj).html());

	// 菜单名称
	$("#xgdivider", ".mainbar").html("/");
	$("#navMenu2", ".mainbar").html($(obj).html());

	$("#navMenu1", ".mainbar").html(
			$(obj).parent().parent().prev().find("span[level='1']").html());

	$("#ih1").hide();
	$("#im1").show();

	$("#ih2").hide();
	$("#im2").show();
}

function menuColor(obj) {
	$("#nav").find("li[level='2'] a").attr("style", "color:#888888;");
	$(obj).attr("style", "background-color:#5BC0DE;color:#FFFFFF;");
}

/**
 * You can use this map like this: var myMap = new Map();
 * myMap.put("key","value"); var key = myMap.get("key"); myMap.remove("key");
 */
function Map() {

	this.elements = new Array();

	this.size = function() {
		return this.elements.length;
	}

	this.isEmpty = function() {
		return (this.elements.length < 1);
	}

	this.clear = function() {
		this.elements = new Array();
	}

	this.put = function(_key, _value) {
		this.remove(_key);
		this.elements.push({
			key : _key,
			value : _value
		});
	}

	this.remove = function(_key) {
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					this.elements.splice(i, 1);
					return true;
				}
			}
		} catch (e) {
			return false;
		}
		return false;
	}

	this.get = function(_key) {
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					return this.elements[i].value;
				}
			}
		} catch (e) {
			return null;
		}
	}

	this.element = function(_index) {
		if (_index < 0 || _index >= this.elements.length) {
			return null;
		}
		return this.elements[_index];
	}

	this.containsKey = function(_key) {
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					return true;
				}
			}
		} catch (e) {
			return false;
		}
		return false;
	}

	this.values = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].value);
		}
		return arr;
	}

	this.keys = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].key);
		}
		return arr;
	}
}

function wrapVal(str) {
	if (null == str || "" == str || str == "undefined") {
		str = "";
	}

	return str;
}

function isEmply(str) {
	return (null == str || "" == str || str == "undefined");
}

function isNotEmply(str) {
	return !isEmply(str);
}

/**
 * 点击页面查询按钮筛选条件
 */
// queryCondition为list页面显性form表单
// pageForm为main页面隐性form表单
// 每当点击list页面查询时将相应属性,值赋值到隐性form中,然后提交form
// 分页,返回均调用隐性form
function queryByCondition() {
	$('#pageForm').html($('#queryCondition').html());
	$('#pageForm').attr('action', $('#queryCondition').attr('action'));
	$('#pageForm').attr('onsubmit', $('#queryCondition').attr('onsubmit'));
	$("#queryCondition :input").each(function(a, obj) {
		$("#pageForm :input").each(function(b, inp) {
			if ($(inp).attr("id") == $(obj).attr("id")) {
				$(inp).val($(obj).val());
			}
		});
	});
	$('#pageForm').submit();
}

/**
 * 获取模块UUID
 * @param moduleName 模块名
 * @returns UUID
 */
function getOperateUUID(moduleName){
    var timestamp = Date.parse(new Date());
    
    return moduleName + "_" + timestamp + "_" + (Math.random()*(99999 - 1) + 1);
    
}