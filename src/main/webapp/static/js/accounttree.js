var zTree_menu;
var treeNode;
/*function getSetting(path)
{
	

	return setting;
}*/

var setting = {
		data : {
			key : {
				type : "type"
			},
			simpleData : {
				enable : true, // 数据是否采用简单 Array 格式，默认false
				idKey : "id", // 在isSimpleData格式下，当前节点id属性,即指定isSimpleDate:true,这个属性必须被指定
				pIdKey : "pId",
				rootPId : 0
			}
		},
		async : {
			enable : true,
			url : "/fzjt_aquatic_mw/goodsClassify/queryTree.htm",
			dataType : 'json',
			autoParam : [ "pId" ],
			dataFilter : filter
		},
		view : {
			selectedMulti : false,// 同时选中多个节点,默认是true
			showLine : true, // 是否显示节点间的连线
			fontCss : getFontCss
		},
		callback : {
			onClick : onClick
		}
	};


function onClick(e, treeId, treeNode) {
	alert("11111");
}


//个性化文字样式
function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {
		color : "#A60000",
		"font-weight" : "bold"
	} : {
		color : "#333",
		"font-weight" : "normal"
	};
}

// 过滤
function filter(treeId, parentNode, childNodes) {
	if (!childNodes)
		return null;
	for ( var i = 0, l = childNodes.length; i < l; i++) {
		childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	return childNodes;
}
