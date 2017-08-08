function dataReQuery(url) {
	this.curr = '1'; // 当前页面
	this.pages = 0; // 总页数
	this.pagenum = 10; // 每页条数
	this.fromNum = 0; // 起始条数
	this.toNum = 10; // 结束条数
	this.num = /^(\+|-)?\d+$/;
	this.ajaxUrl=url;
}
dataReQuery.prototype = {
	remove : function() {
		$("#dataTable").empty();
	},
	setCalculate : function(curr) {
		
		this.fromNum = this.pagenum * (curr - 1) + 1;
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
				//alert(data);
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
					
					//
					var bean =  data[0].reportDailyTotalBean;
					
					// 预约中
					$("#bookingtotal").html(bean.bookingNum+"/"+bean.bookingSum+"/"+(bean.bookingFees == "" ?"0":bean.bookingFees));
					
					
					// 预约成功
					$("#bookedtotal").html(bean.bookedNum+"/"+bean.bookedSum+"/"+(bean.bookedFees == "" ?"0":bean.bookedFees));
					
					
					// 投保中
					$("#insuringtotal").html(bean.insuringNum+"/"+bean.insuringSum+"/"+(bean.insuringFees == "" ?"0":bean.insuringFees));
					
					// 投保成功
				
					$("#insuredtotal").html(bean.insuredNum+"/"+bean.insuredSum+"/"+(bean.insuredFees == "" ?"0":bean.insuredFees));
					
					
					
				} else {
					_this.remove();
					$("#page").html("");
				}
			},
			error:sessionTimeout
		})
	}
}

function queryRePage(url)
{
	 
	
	if($('#queryObject').size() == 0 || $('#queryObject').valid())
	{
		data = new dataReQuery(url);
		data.sendDataList("search");
	}
}