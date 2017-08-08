
/**
 * 普通ajax表单提交 提交是 自动去select标签disabled 属性 让其值可传输
 * 
 * @param {Object}
 *            form
 * @param {Object}
 *            callback
 * @param {String}
 *            confirmMsg 提示确认信息
 */
function validateCallbackByHcd(form, moduleName, rel, callbackF) {
	var $form = $(form);
	if (!$('#' + $form.attr("id")).valid()) {
		return false;
	}
	$("select",$form).attr("disabled", false);
	
	$(".btn-primary", $form).attr("disabled", "disabled");
	$.ajax({
		type : form.method || 'POST',
		url : $form.attr("action"),
		data : $form.serializeArray(),
		dataType : "json",
		cache : false,
		success : function(jsonData) {
			$(".btn-primary", $form).attr("disabled", false);
			if ($.isFunction(callbackF)) {
				callbackF(jsonData, moduleName, rel);
			} else {
				pageForward(jsonData, moduleName, rel);
			}
		},
		error : FZM.ajaxError
	});

	return false;
}
/**
 * 普通ajax表单提交
 * 
 * @param {Object}
 *            form
 * @param {Object}
 *            callback
 * @param {String}
 *            confirmMsg 提示确认信息
 */
function validateCallback(form, moduleName, rel, callbackF) {
	var $form = $(form);
	if (!$('#' + $form.attr("id")).valid()) {
		return false;
	}
	$(".btn-primary", $form).attr("disabled", "disabled");
	$.ajax({
		type : form.method || 'POST',
		url : $form.attr("action"),
		data : $form.serializeArray(),
		dataType : "json",
		cache : false,
		success : function(jsonData) {
			$(".btn-primary", $form).attr("disabled", false);
			if ($.isFunction(callbackF)) {
				callbackF(jsonData, moduleName, rel);
			} else {
				pageForward(jsonData, moduleName, rel);
			}
		},
		error : FZM.ajaxError
	});

	return false;
}

function validateCallback2(form, moduleName, callbackF) {
	var $form = $(form);
	if (!$('#' + $form.attr("id")).valid()) {
		return false;
	}
	$(".btn-primary", $form).attr("disabled", "disabled");
	$.ajax({
		type : form.method || 'POST',
		url : $form.attr("action"),
		data : $form.serializeArray(),
		dataType : "json",
		cache : false,
		success : function(jsonData) {
			$(".btn-primary", $form).attr("disabled", false);
			 callbackF(jsonData);
		},
		error : FZM.ajaxError
	});

	return false;
}

/**
 * 普通ajax表单提交
 * 
 * @param {Object}
 *            form
 * @param {Object}
 *            callback
 * @param {String}
 *            confirmMsg 提示确认信息
 */
function validateCallbackConfirm(title, form, moduleName, rel, callbackF) {
    var $form = $(form);
    if (!$('#' + $form.attr("id")).valid()) {
        return false;
    }
    
    alertMsg.confirm(title, {
        okCal : function() {
            $(".btn-primary", $form).attr("disabled", "disabled");
            $.ajax({
                type : form.method || 'POST',
                url : $form.attr("action"),
                data : $form.serializeArray(),
                dataType : "json",
                cache : false,
                success : function(jsonData) {
                    $(".btn-primary", $form).attr("disabled", false);
                    if ($.isFunction(callbackF)) {
                        callbackF(jsonData, moduleName, rel);
                    } else {
                        pageForward(jsonData, moduleName, rel);
                    }
                },
                error : FZM.ajaxError
            });
        }
    });
    return false;
}


/**
 * 文件上传时使用
 * 
 * @param form
 * @param moduleName
 * @param callbackF
 * @returns {Boolean}
 */
function uploadCallback(form, moduleName, callbackF) {
	var $form = $(form);
	if (!$('#' + $form.attr("id")).valid()) {
		return false;
	}
	$(".btn-primary", $form).attr("disabled", "disabled");
	$.ajaxFileUpload({
		url : $form.attr("action"),
		secureuri : false,
		fileElementId : $form.attr("id"),// 某个标签下的所有含有name的input
		dataType : 'text/html',// 返回数据的类型
		success : function(dataArrStr) {
			$(".btn-primary", $form).attr("disabled", false);
			var dataArr = FZM.str2obj(dataArrStr);
			if ($.isFunction(callbackF)) {
				callbackF(dataArr, moduleName);
			} else {
				pageForward(dataArr, moduleName);
			}
		},
		error : function(data, status, e) {
			alertMsg.error("操作失败！");
		}
	});

	return false;
}

function uploadTodo(form, callback) {
	var $form = $(form);
	// $(".btn-primary",$form).attr("disabled","disabled");
	$.ajaxFileUpload({
		url : $form.attr("action"),
		secureuri : false,
		fileElementId : $form.attr("id"),// 某个标签下的所有含有name的input
		dataType : 'json',// 返回数据的类型
		success : callback,
		error : function(data, status, e) {
			alertMsg.error("发布失败！");
		}
	});

	return false;
}

function ajaxTodo(url, callback) {
	$.ajax({
		type : 'POST',
		url : url,
		dataType : "json",
		cache : false,
		success : callback,
		error : FZM.ajaxError
	});

	return false;
}

function ajaxTodo2(data, callback) {

	$.ajax({
		type : 'POST',
		url : data.url,
		data : data.data,
		dataType : "json",
		cache : false,
		success : callback,
		error : FZM.ajaxError
	});
}

function ajaxFormTodo(form, callback) {

	$.ajax({
		type : form.method || 'POST',
		url : $form.attr("action"),
		data : $form.serializeArray(),
		dataType : "json",
		cache : false,
		success : callback,
		error : FZM.ajaxError
	});

	return false;
}

/**
 * 提示
 * 
 * @param json
 * @param moduleName
 * @param callbackF
 */
function pageForward(json, moduleName, rel, callbackF) {
	// 操作提示信息
	FZM.ajaxDone2(json);

	// 执行回调函数
	if ($.isFunction(callbackF)) {
		callbackF();
	}
	if (json[FZM.keys.statusCode] == FZM.statusCode.ok) {
		var pathArr = moduleName.split("/");
		if (json[FZM.keys.operateType] == "del") {
			if (moduleName == "HomeLBPage") {
				refreshMianContent(moduleName + "/query.htm?curPage="
						+ $('#showCurPage').val(), rel);
			} else {
				$('#submit' + pathArr[2]).click();
			}
		} else {
			// 查询列表页面
			refreshMianContent(moduleName + "/query.htm?curPage="
					+ $('#showCurPage').val(), rel);
		}
	}
}

/**
 * 到修改页面
 * 
 * @param url
 */
function toEdit(url, rel) {
	if (url.indexOf("curPage") < 0) {
		if (url.indexOf("?") > 0) {
			url += '&curPage=' + $('#showCurPage').val();
		} else {
			url += '?curPage=' + $('#showCurPage').val();
		}
	}
	refreshMianContent(url, rel);
}

/**
 * 到详情页面
 * 
 * @param url
 */
function toDetail(url, rel) {
	toEdit(url, rel);
}

/**
 * 到修改页面
 * 
 * @param url
 */
function del(url, moduleName) {
	if (url.indexOf("curPage") < 0) {
		if (url.indexOf("?") > 0) {
			url += '&curPage=' + $('#showCurPage').val();
		} else {
			url += '?curPage=' + $('#showCurPage').val();
		}
	}
	alertMsg.confirm("您确定删除该数据吗？", {
		okCal : function() {
			ajaxTodo(url, function(jsonData) {
				pageForward(jsonData, moduleName);
			});
		}
	});
}

// 调用查询方法时的标记，btnQuery点击查询按钮，backQuery点击返回按钮
var queryListFlag = "btnQuery";

/**
 * 返回到列表页面
 * 
 * @param url
 */
function backToList(url, rel) {
	
	if (url.indexOf("curPage") < 0) {
		if (url.indexOf("?") > 0) {
			url += '&curPage=' + $('#showCurPage').val();
		} else {
			url += '?curPage=' + $('#showCurPage').val();
		}
	}
	if (rel != undefined) {
		if ($('#pageForm').attr('action') != "") {
			if($('#pageForm').attr('action').indexOf('?') < 0){
				$('#pageForm').attr('action', $('#pageForm').attr('action') + rel);
			}
			$('#pageForm').submit();
		}else{
			refreshMianContent(url, rel);
		}
	} else {
		if ($('#pageForm').attr('action') != "") {
			if ($('#pageForm').attr('action').indexOf("curPage") < 0) {
				$('#pageForm').attr(
						'action',
						$('#pageForm').attr('action') + '?curPage='
								+ $('#showCurPage').val());
			}
			else
			{
				$('#pageForm').attr(
						'action',
						$('#pageForm').attr('action').replace(/curPage=\d+/g, "curPage="+$('#showCurPage').val()));
			}
			
			queryListFlag = "backQuery";
		
			$('#pageForm').submit();
		} else {
			refreshMianContent(url, rel);
		}
	}
}

function backToTreeList(url, rel) {
	
	if (url.indexOf("curPage") < 0) {
		if (url.indexOf("?") > 0) {
			url += '&curPage=' + $('#showCurPage').val();
		} else {
			url += '?curPage=' + $('#showCurPage').val();
		}
	}
	refreshMianContent(url, rel);
}

function loadData(form, callback) {
	var $form = $(form);
	var progressBar = $("#progressBar");
	progressBar.show();
	$.ajax({
		type : form.method || 'POST',
		url : $form.attr("action"),
		data : $form.serializeArray(),
		dataType : "json",
		cache : false,
		success : function(dataArrStr) {
			var dataArr = FZM.str2obj(dataArrStr);
			callback(dataArr[0]);
		},
		error : function() {
			notyUtils.error("加载数据失败！");
		}
	});

	return false;
}

/**
 * 异步查询action返回json数据由回调函数处理
 * 
 * @param form
 *            表单
 * @param callback
 *            回调方法
 */
function loadData1(form, callback) {
	var $form = $(form);
	// var progressBar = $("#progressBar");
	// progressBar.show();
	$.ajax({
		type : form.method || 'POST',
		url : $form.attr("action"),
		data : $form.serializeArray(),
		dataType : "json",
		cache : false,
		success : function(json) {
			callback(json);
			// progressBar.hide();
		},
		error : function() {
			alertMsg.error("加载数据失败！");
		}
	});

	return false;
}

function sessionTimeout(xhr, ajaxOptions, thrownError) {

	if (xhr.status == "200"
			&& parseInt(xhr.responseText.indexOf('loginAction')) > -1) {
		window.parent.location.href = "loginAction.action?indet=login";
	}

}

function queryCallback(from, relId) {
	
	var path = $(from).attr("action");
	
	// 点查询按钮调用的查询方法
	if (queryListFlag == "btnQuery")
	{
		//如果没有当前页属性(curPage),分页当前页默认为1
		if (path.indexOf("curPage") < 0)
		{
			$('#showCurPage').val("1");
		}
	}
	
	// 刷新右侧信息
	FZM.ajaxUrl({
		url : path,
		data : $(from).serializeArray(),
		rel : relId,
		type : "POST"
	});
	
	queryListFlag = "btnQuery";
	
	return false;
}

function tPage(url, fid) {
	if (url.indexOf("curPage=") < url.indexOf("&")) {
		$('#showCurPage').val(
				url.substring(url.indexOf("curPage=") + 8, url.indexOf("&")));
	} else {
		$('#showCurPage').val(
				url.substring(url.indexOf("curPage=") + 8, url.length));
	}
	// 刷新右侧信息
	FZM.ajaxUrl({
		url : url,
		data : $('#' + fid).serializeArray(),
		rel : "",
		type : "POST"
	});
	return false;
}

function toPageRel(url, fid,relId) {
//	if (url.indexOf("curPage=") < url.indexOf("&")) {
//		$('#showCurPage').val(
//				url.substring(url.indexOf("curPage=") + 8, url.indexOf("&")));
//	} else {
//		$('#showCurPage').val(
//				url.substring(url.indexOf("curPage=") + 8, url.length));
//	}
//	console.info(url + fid);
	// 刷新右侧信息
	FZM.ajaxUrl({
		url : url,
		data : $('#' + fid).serializeArray(),
		rel : relId,
		type : "POST"
	});
	return false;
}

/**
 * 设置
 * 
 * @param selOptId
 *            上级select 选option值
 * @param nextSelId
 *            下级select id
 */
function nextSelect(selOptId, nextSelId) {
	var nextSel = $("#" + nextSelId);
	var sel = $("#" + selOptId);
	var headerName = nextSel.attr("headerName");
	var headerVal = nextSel.attr("headerVal");
	var optDefVal = nextSel.attr("optDefVal");
	var keyName = nextSel.attr("keyName");
	var valName = nextSel.attr("valName");
	var parentIdAttrName = nextSel.attr("parentIdAttrName");
	var url = nextSel.attr("optUrl");
	eval("var dataObj = {'" + parentIdAttrName + "':'" + sel.val() + "'}");
	var options = {
		url : url,
		data : dataObj
	};

	ajaxTodo2(options, function(optArr) {

		var opts = "";

		// 默认选型
		if (headerName != null && headerName != '') {
			opts = "<option value='" + headerVal + "'>" + headerName
					+ "</option>";
		}

		// 拼接选项
		for ( var i = 0; i < optArr.length; i++) {
			var val = optArr[i][valName];
			var opt = "<option value='" + val + "'";
			if (val == optDefVal) {
				opt += " selected='selected'";
			}
			opt += ">" + optArr[i][keyName] + "</option>";
			opts += opt;
		}

		// 选选项付给
		nextSel.html(opts);

		if (nextSel.val() == "")
		{
			nextSel.change();
		}
	});
}

/**
 * 设置
 * 
 * @param selOptId
 *            上级select 选option值
 * @param nextSelId
 *            下级select id
 */
function nextSelectCallback(selOptId, nextSelId, callback) {
	var nextSel = $("#" + nextSelId);
	var sel = $("#" + selOptId);
	var headerName = nextSel.attr("headerName");
	var headerVal = nextSel.attr("headerVal");
	var optDefVal = nextSel.attr("optDefVal");
	var keyName = nextSel.attr("keyName");
	var valName = nextSel.attr("valName");
	var parentIdAttrName = nextSel.attr("parentIdAttrName");
	var url = nextSel.attr("optUrl");
	eval("var dataObj = {'" + parentIdAttrName + "':'" + sel.val() + "'}");
	var options = {
		url : url,
		data : dataObj
	};

	ajaxTodo2(options, function(optArr) {

		var opts = "";

		// 默认选型
		if (headerName != null && headerName != '') {
			opts = "<option value='" + headerVal + "'>" + headerName
					+ "</option>";
		}

		// 拼接选项
		for ( var i = 0; i < optArr.length; i++) {
			var val = optArr[i][valName];
			var opt = "<option value='" + val + "'";
			if (val == optDefVal) {
				opt += " selected='selected'";
			}
			opt += ">" + optArr[i][keyName] + "</option>";
			opts += opt;
		}

		// 选选项付给
		nextSel.html(opts);

		callback();
	});
}


/**
 * 带文件上传的ajax表单提交
 * @param {Object} form
 * @param {Object} callback
 */
function iframeCallback(form, callback){
	var $form = $(form), $iframe = $("#callbackframe");
	if(!$form.valid()) {return false;}

	if ($iframe.size() == 0) {
		$iframe = $("<iframe id='callbackframe' name='callbackframe' src='about:blank' style='display:none'></iframe>").appendTo("body");
	}
	if(!form.ajax) {
		$form.append('<input type="hidden" name="ajax" value="1" />');
	}
	form.target = "callbackframe";
	
	_iframeResponse($iframe[0], callback || DWZ.ajaxDone);
}
function _iframeResponse(iframe, callback){
	var $iframe = $(iframe), $document = $(document);
	
	$document.trigger("ajaxStart");
	
	$iframe.bind("load", function(event){
		$iframe.unbind("load");
		$document.trigger("ajaxStop");
		
		if (iframe.src == "javascript:'%3Chtml%3E%3C/html%3E';" || // For Safari
			iframe.src == "javascript:'<html></html>';") { // For FF, IE
			return;
		}

		var doc = iframe.contentDocument || iframe.document;

		// fixing Opera 9.26,10.00
		if (doc.readyState && doc.readyState != 'complete') return; 
		// fixing Opera 9.64
		if (doc.body && doc.body.innerHTML == "false") return;
	   
		var response;
		
		if (doc.XMLDocument) {
			// response is a xml document Internet Explorer property
			response = doc.XMLDocument;
		} else if (doc.body){
			try{
				response = $iframe.contents().find("body").text();
				response = jQuery.parseJSON(response);
			} catch (e){ // response is html document or plain text
				response = doc.body.innerHTML;
			}
		} else {
			// response is a xml document
			response = doc;
		}

		callback(response);
	});
}

function loadCallback(path, relId) {
	// 刷新右侧信息
	FZM.ajaxUrl({
		url : path,
		rel : relId,
		type : "POST"
	});
}


/**
 * 重置密码
 * @param url 地址
 * @param operateId 操作ID
 * @param callbackF 回调函数
 */
function doResetPwd(url, operateId, callbackF){
    var contextPath = $('#contextPath').val();
    layer.confirm('是否要重置密码？', {
      btn: ['确认','取消'] //按钮
    }, function(){
        //debugger;
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data: {
                operateId: operateId
            },
            cache : false,
            success: function(json) {
                //debugger;
                FZM.ajaxDone2(json);
                if (json[FZM.keys.statusCode] == FZM.statusCode.ok) {
                    if(callbackF){
                        callbackF(json);
                    }
                }
           }
        });
    });
}

/**
 * 跳转GO事件(KEY)
 */
function doPageGoKey(event){
    if(event.keyCode==13){  
        toPageGo($("#go_page_num"));
    }
}

/**
 * 跳转GO事件(Click)
 */
function doPageGoClick(){
	debugger
    toPageGo($("#go_page_num"));
}

/**
 * 跳转
 * @param url
 * @param fid
 * @returns
 */
function toPageGo(obj) {
	debugger
    var goObj = $(obj);
    var pageCurrent = goObj.attr("data-pageCurrent");
    var pageCount = goObj.attr("data-pageCount");
    var pageNum = doTrim(goObj.val());
    var url = goObj.attr("data-url") + pageNum;
    var fid = goObj.attr("data-fid");
    //console.log("toPageGo pageCurrent:" + pageCurrent + ", pageCount:" + pageCount + ", pageNum:" + pageNum + ", url:" + url + ", fid:" + fid);
    
    if (!isVerifyInt(pageNum)) {
        layer.msg("请输入正确的跳转页(正整数)",{icon:2});
        goObj.val(pageCurrent);
        return;
    }
    
    //debugger;
    
    if(Number(pageNum) <= 0){
        layer.msg("输入的跳转页必须大于0",{icon:2});
        goObj.val(pageCurrent);
        return;
    }
    
    if(Number(pageNum) > Number(pageCount)){
        layer.msg("输入的跳转页不可大于分页数",{icon:2});
        goObj.val(pageCurrent);
        return;
    }
    
    // 跳转页面
    tPage(url, fid);
}

/**
 * 跳转GO事件(KEY)
 */
function doPageGoKeyRel(event, rel){
    if(event.keyCode==13){  
        if (rel){
            toPageGoRel($("#" + rel + " input[name='go_page_num']"));
        } else {
            toPageGoRel($("#go_page_num"));
        }
    }
}

/**
 * 跳转GO事件(Click)
 */
function doPageGoClickRel(rel){
    if (rel){
        toPageGoRel($("#" + rel + " input[name='go_page_num']"));
    } else {
        toPageGoRel($("#go_page_num"));
    }
}

/**
 * 跳转
 * @param url
 * @param fid
 * @returns
 */
function toPageGoRel(obj) {
    var goObj = $(obj);
    var pageCurrent = goObj.attr("data-pageCurrent");
    var pageCount = goObj.attr("data-pageCount");
    var pageNum = doTrim(goObj.val());
    var url = goObj.attr("data-url") + pageNum;
    var fid = goObj.attr("data-fid");
    var rel = goObj.attr("data-rel");
    //console.log("toPageGo pageCurrent:" + pageCurrent + ", pageCount:" + pageCount + ", pageNum:" + pageNum + ", url:" + url + ", fid:" + fid);
    
    if (!isVerifyInt(pageNum)) {
        layer.msg("请输入正确的跳转页(正整数)",{icon:2});
        goObj.val(pageCurrent);
        return;
    }
    
    //debugger;
    
    if(Number(pageNum) <= 0){
        layer.msg("输入的跳转页必须大于0",{icon:2});
        goObj.val(pageCurrent);
        return;
    }
    if(Number(pageNum) > Number(pageCount)){
        layer.msg("输入的跳转页不可大于分页数",{icon:2});
        goObj.val(pageCurrent);
        return;
    }
    
    // 跳转页面
    toPageRel(url, fid, rel);
}

/**
 * 校验-整形数字
 * @param str
 * @returns true:是, false:否
 */
function isVerifyInt(str) {
    var reg = /^[0-9]+$/ ;
    return reg.test(str)
}

/**
 * 去空格
 */
function doTrim(str)
{
    return str.replace(/^\s+|\s+$/g, '');
}