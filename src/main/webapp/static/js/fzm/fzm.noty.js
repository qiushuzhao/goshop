var notyUtils = {
    _options:{isAoteClose: true,closeTime:2000},
	/**
	 * 
	 * @param {Object} type
	 * @param {Object} msg
	 * @param {Object} buttons [button1, button2]
	 */
	_open: function(options){
		
		if (!options.layout)
		{
			$.extend(options, {layout: 'topCenter'});
		}
		
		var notyObj = noty(options);
		
		if(options.isAoteClose)
		{			
			this._autoClose(notyObj,options.closeTime);
		}
	},
	error: function(msg, options) {
		var op = $.extend({text:msg,type:'error'},this._options);
		$.extend(op, options);
		this._open(op);
	},
	info: function(msg, options) {
		var op = $.extend({text:msg,type:'information'},this._options);
		$.extend(op, options);
		this._open(op);
	},
	warn: function(msg, options) {
		var op = $.extend({text:msg,type:'warning'},this._options);
		$.extend(op, options);
		this._open(op);
	},
	success: function(msg, options) {
		var op = $.extend({text:msg,type:'success'},this._options);
		$.extend(op, options);
		this._open(op);
	},
	alert: function(msg, options) {
		var op = $.extend({text:msg,type:'alert'},this._options);
		$.extend(op, options);
		this._open(op);
	},
	_autoClose: function(notyObj,closeTime) {
		setTimeout(function() {
		      $.noty.close(notyObj.options.id);
		    }, parseInt(closeTime));
	}
};


var layerMsg = {
		/**
		 * 
		 * @param {Object} type
		 * @param {Object} msg
		 * @param {Object} buttons [button1, button2]
		 */
		_open: function(msg,type){
			layer.msg(msg,{
			    icon: type,
			    time: 2000
			});
		},
		error: function(msg) {
			
			this._open(msg,2);
		},
		info: function(msg) {
			this._open(msg,0);
		},
		success: function(msg) {
			this._open(msg,1);
		}
	};
