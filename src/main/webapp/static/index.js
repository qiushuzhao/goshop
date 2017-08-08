function logout(){
	layer.confirm('确定退出？', {
	  btn: ['是','否'] // 按钮
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

var zTree_menu;
var treeNode;
/**********************修改树初始化信息*************************/
function getEditRoleSetting(path)
{
	var editRoleSetting = {
			check: {
				enable: true
			},
			
			data: {
				key: {
				name: "text"
			},
		    	simpleData: {
				enable: true,  //数据是否采用简单 Array 格式，默认false
				idKey: "id",   //在isSimpleData格式下，当前节点id属性,即指定isSimpleDate:true,这个属性必须被指定      
				pIdKey: "pId",
				rootPId: 0
		        }
		    },
			async: {
				enable: true,
				url:path,
				dataType:'json',
				autoParam:["pId"],
				dataFilter: filter
			},
			view: {
				selectedMulti: false,//同时选中多个节点,默认是true
				showLine: true, //是否显示节点间的连线
				fontCss: getFontCss
			},
			callback: {
				beforeDrag: beforeDrag,//禁止拖拽
				onAsyncSuccess: onAsyncSuccess
			}
		};
	return editRoleSetting;
}

/**********************新增树初始化信息*************************/


/**********************树信息*************************/
//过滤
function filter(treeId, parentNode, childNodes)
 {  
    if (!childNodes) return null;
    for (var i=0, l=childNodes.length; i<l; i++) 
    {  
        childNodes[i].name = childNodes[i].name;  
    }  
        return childNodes;  
} 


//拖拽
function beforeDrag(treeId, treeNodes) {
    return false;
};

 //异步加载成功后刷新树节点	  
  function onAsyncSuccess(event, treeId, treeNode, msg) 
  {
    cancelHalf(treeNode);
  }
  
  
  function cancelHalf(treeNode) {
   zTree_menu = $.fn.zTree.getZTreeObj("treeDemo");
   zTree_menu.updateNode(treeNode);   //异步加载成功后刷新树节点
   
  }
  
//个性化文字样式
  function getFontCss(treeId, treeNode)
  {
  	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
  } 
 /**********************树信息*************************/
  
//选项卡菜单
  indexTabsMenu = $('#tabsMenu').menu({
      onClick : function(item) {
          var curTabTitle = $(this).data('tabTitle');
          var type = $(item.target).attr('type');
          if (type === 'refresh') {
              refreshTab();
              return;
          }
          if (type === 'close') {
              var t = index_tabs.tabs('getTab', curTabTitle);
              if (t.panel('options').closable) {
                  index_tabs.tabs('close', curTabTitle);
              }
              return;
          }
          var allTabs = index_tabs.tabs('tabs');
          var closeTabsTitle = [];
          $.each(allTabs, function() {
              var opt = $(this).panel('options');
              if (opt.closable && opt.title != curTabTitle
                      && type === 'closeOther') {
                  closeTabsTitle.push(opt.title);
              } else if (opt.closable && type === 'closeAll') {
                  closeTabsTitle.push(opt.title);
              }
          });
          for ( var i = 0; i < closeTabsTitle.length; i++) {
              index_tabs.tabs('close', closeTabsTitle[i]);
          }
      }
  });