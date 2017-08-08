var msgInfo = {
	title:{error:"错误", info:"提示", warn:"警告", correct:"成功", confirm:"提示"},
	butMsg:{ok:"确定", yes:"是", no:"否", cancel:"取消"}
}
var alertMsg = {
	_types: {error:"error", info:"info", warn:"warn", correct:"correct", confirm:"confirm"},
	_getTitle: function(key){
		return msgInfo.title[key];
	},

	/**
	 * 
	 * @param {Object} type
	 * @param {Object} msg
	 * @param {Object} buttons [button1, button2]
	 */
	_open: function(type, msg, buttonArr,iconId){
		
		layer.alert(msg,{icon: iconId, title:this._getTitle(type)},function(index){
			layer.close(index);
		});
		
		/*if($("#alertMsg").size() > 0)
		{
			$("#alertMsg").parent().remove();
		}

		$("<div id='alertMsg'></div>").dialog({
			 title:this._getTitle(type),
			 modal: true,
			 buttons:buttonArr
		});
		
		$("#alertMsg").html(msg);*/
	},
	error: function(msg, options) {
		this._alert(this._types.error, msg, options,2);
	},
	info: function(msg, options) {
		this._alert(this._types.info, msg, options,0);
	},
	warn: function(msg, options) {
		this._alert(this._types.warn, msg, options,0);
	},
	correct: function(msg, options) {
		this._alert(this._types.correct, msg, options,1);
	},
	_alert: function(type, msg, options,iconIn) {
		//var op = {okName:$.regional.alertMsg.butMsg.ok, okCall:null};
		//$.extend(op, options);
		//var buttons =  [{ text: op.okName, click: function() { $(this).dialog("destroy"); } }] ;
		var buttons = [];
		this._open(type, msg, buttons,iconIn);
	},
	/**
	 * 
	 * @param {Object} msg
	 * @param {Object} options {okName, okCal, cancelName, cancelCall}
	 */
	confirm: function(msg, options) {
		var op = {okName:msgInfo.butMsg.yes, okCall:null, cancelName:msgInfo.butMsg.no, cancelCall:null};
		$.extend(op, options);
		var buttons = [
			{ text: op.okName, click: function() { op.okCal();$(this).dialog("destroy"); } },
			{ text: op.cancelName, click: function() { $(this).dialog("destroy"); } }
		];
		//this._open(this._types.confirm, msg, buttons);
		layer.confirm(msg, {icon: 3, title:'提示'}, function(index){
			layer.close(index);
			op.okCal();
		});
	}
};