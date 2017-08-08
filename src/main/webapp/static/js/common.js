(function($){  
    $.fn.serializeJson=function(){  
        var serializeObj={};  
        $(this.serializeArray()).each(function(){  
            serializeObj[this.name]=this.value;  
        });  
        return serializeObj;  
    }; 
    
    var options = {
            zIndex:1000,
            fullscreen:false,
            button:true,
            movable:false
        }
    
        $('.image').each(function(){
            $(this).viewer(options);
        });  
    
})(jQuery);
// 金额格式化
function fmoney(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";//更改这里n数也可确定要保留的小数位
	var l = s.split(".")[0].split("").reverse(),
	r = s.split(".")[1];
	t = "";
	for(i = 0; i < l.length; i++ )
	{
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r.substring(0,2);//保留2位小数  如果要改动 把substring 最后一位数改动就可
}

//数组最大值
Array.max = function(array) {
return Math.max.apply(Math, array);

};
//数组最小值
Array.min = function(array) {
  return Math.min.apply(Math, array);
};



String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

function dataQuery(url) {
	this.curr = '1'; // 当前页面
	this.pages = 0; // 总页数
	this.pagenum = 10; // 每页条数
	this.fromNum = 0; // 起始条数
	this.toNum = 10; // 结束条数
	this.num = /^(\+|-)?\d+$/;
	this.ajaxUrl=url;
}
dataQuery.prototype = {
	remove : function() {
		$("#dataTable").empty();
	},
	setCalculate : function(curr) {
		
		this.fromNum = this.pagenum * (curr - 1);
		this.toNum = this.pagenum * curr;
	},
	_form:{},
	sendDataList : function(type) {
		var _this = this;
		var fromOjb;
		
		if (type == "search")
		{
			fromOjb = $('#queryObject');
			
			_this._form = fromOjb.clone();
			
			$("select",fromOjb).each(function(){
				$("select[name='"+$(this).attr("name")+"']",_this._form).val($(this).val());
			});
			
		}
		else
		{
			fromOjb = _this._form;
		}
		fromOjb.find("[name='fromNum']").remove();
		fromOjb.find("[name='toNum']").remove();
		fromOjb.append("<input type='hidden' name='fromNum' value='"+_this.fromNum+"'/>");
		fromOjb.append("<input type='hidden' name='toNum' value='"+_this.toNum+"'/>");
		
		
		$.ajax({
			async : false,
			type : "post",
			//url : "listRole.action",
			url: _this.ajaxUrl,
			cache: false,
			dataType:'json',
			data : fromOjb.serializeArray(),
			success : function(result) {
				var data = (new Function("","return "+result))();
				if (data != null && "" != data && (0 < parseInt(data.length))) {
					var count = parseInt(data[0].total);
					var obj = data[0].rows;
					if (_this.num.test(count / _this.pagenum)) {
						_this.pages = count / _this.pagenum;
					} else {
						_this.pages = parseInt(count / _this.pagenum) + 1;
					}
					_this.remove();
					// 将模板填充数据
					var gettpl = $("#dataScript").html();
					laytpl(gettpl).render(obj, function(html) {
						$('#dataTable').append(html);
						// 显示分页
						laypage({
							cont : 'page', // 容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
							pages : _this.pages, // 通过后台拿到的总页数
							curr : _this.curr || 1, // 当前页
							skip : true, // 是否开启跳页-
							skin : 'molv',
							groups: 5, //连续显示分页数
							//first: '首页', //将首页显示为数字1,。若不显示，设置false即可
							//last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
							//prev: false, //若不显示，设置false即可'<'
						    //next: false ,//若不显示，设置false即可'>'
							jump : function(obj, first) { // 触发分页后的回调
								if (!first) { // 点击跳页触发函数自身，并传递当前页：obj.curr
									_this.curr = obj.curr;
									_this.setCalculate(obj.curr);
									_this.sendDataList("jump");
								}
							}
						});
					});
				} else {
					_this.remove();
					$("#page").html("");
				}
			},
			error:sessionTimeout
		})
	}
}
var searchPage;
function queryPage(url)
{
	 
	
	if($('#queryObject').size() == 0 || $('#queryObject').valid())
	{
		searchPage = new dataQuery(url);
		searchPage.sendDataList("search");
	}
}

function queryPage2(url,pagenum,fromNum,toNum)
{
	if($('#queryObject').size() == 0 || $('#queryObject').valid())
	{
		data = new dataQuery(url);
		data.pagenum = pagenum;
		data.fromNum = fromNum;
		data.toNum = toNum;
		data.sendDataList("search");
	}
}


//分页查询
var queryInfo;
function BaseQuery(url) {
	this.curr = 1; // 当前页面
	this.pages = 0; // 总页数
	this.pagenum = 10; // 每页条数
	this.fromNum = 0; // 起始条数
	this.toNum = 10; // 结束条数
	this.num = /^(\+|-)?\d+$/;
	this.url=url;
}
BaseQuery.prototype = {
	getData : function() {
		return $('#queryObject').serializeJson();
	},
	remove : function() {
		$("#dataTable").empty();
	},
	setCalculate : function(curr) {
		this.fromNum = this.pagenum * (curr - 1);
		this.toNum = this.pagenum * curr;
	},
	sendDataList : function(info) {
		var _this = this;
		var object = (info == 'search') ? _this.getData() : info;
		object.curr = _this.curr;
		object.fromNum = _this.fromNum;
		object.toNum = _this.toNum;
		object.pagenum = _this.pagenum;
		queryInfo = object;
		_this.laytplajax(object);
	},
	sendDataDetailList : function(info) {
		var _this = this;
		_this.curr = info.curr;
		_this.setCalculate(info.curr);
		queryInfo = info;
		_this.laytplajax(info);
	},
	laytplajax : function(object) {
		var _this = this;
		$.ajax({
			async : false,
			type : "post",
			url: _this.url,
			dataType:'json',
			data : object,
			success : function(result) {
				var data = (new Function("","return "+result))();
				if (data != null && "" != data && (0 < parseInt(data.length))) {
					var count = parseInt(data[0].total);
					var obj = data[0].rows;
					if (_this.num.test(count / _this.pagenum)) {
						_this.pages = count / _this.pagenum;
					} else {
						_this.pages = parseInt(count / _this.pagenum) + 1;
					}
					_this.remove();
					// 将模板填充数据
					var gettpl = $("#dataScript").html();
					laytpl(gettpl).render(obj, function(html) {
						$('#dataTable').append(html);
						// 显示分页
						laypage({
							cont : 'page', // 容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
							pages : _this.pages, // 通过后台拿到的总页数
							curr : _this.curr || 1, // 当前页
							skip : true, // 是否开启跳页
							skin : 'molv',
							groups: 5, //连续显示分页数
							first: '首页', //将首页显示为数字1,。若不显示，设置false即可
							last: '尾页', //将尾页显示为总页数。若不显示，设置false即可---_this.pages
							//prev: false, //若不显示，设置false即可'<'
						    //next: false ,//若不显示，设置false即可'>'
							jump : function(obj, first) { // 触发分页后的回调
								if (!first) { // 点击跳页触发函数自身，并传递当前页：obj.curr
									_this.curr = obj.curr;
									_this.setCalculate(obj.curr);
									_this.sendDataList(object);
								}
							}
						});
					});
				} else {
					_this.remove();
					$("#page").html("");
				}
			},
			error:sessionTimeout
		
		})
	}
}

function BasePage(url, type) {
	if ($('#queryObject').size() == 1) {
		data = new BaseQuery(url);
		if (type == "search") {
			data.sendDataList(type);
		}else{
			data.sendDataDetailList(queryInfo);
		}
	} else {
		alertMsg.warn("查询条件异常！");
	}
}