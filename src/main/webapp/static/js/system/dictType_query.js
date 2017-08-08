// 字典类型配置信息
var sysDictTypeConfig = {
        contextPath : "", // 工程名称
        moduleName : "", // 模块名称
        treeId : "", // 树形区域ID
        treeUrl : "", // 树数据URL
        searchTypeKeywordId : "", // 查询关键字ID
        searchTypeButId : "", // 查询按钮ID
        searchInfoModuleName : "", // 查询字典信息模块名称
        searchInfoUrl : "", // 查询字典信息URL
        searchInfoFormId : "", // 查询字典信息表单ID
        searchInfoListId : "" // 查询字典信息集合ID
}

/**
 * 初始化字典分类信息
 */
function initDictTypePage(){
    addDebugInfo("系统字典类型init:" + JSON.stringify(sysDictTypeConfig));
    $.fn.zTree.init($("#" + sysDictTypeConfig.treeId), getDictTypeSetting());
    
    // 查询按钮初始化
    $("#" + sysDictTypeConfig.searchTypeButId).click(function(){
        doDictTypeSearchTree();
    });
    $("#" + sysDictTypeConfig.searchTypeButId).click();
    
    // 初始化字典信息查询
    var $form = $("#" + sysDictTypeConfig.searchInfoFormId);
    var webPath = sysDictTypeConfig.contextPath + "/" + sysDictTypeConfig.searchInfoModuleName + "/" + sysDictTypeConfig.searchInfoUrl;
    $form.attr("action", webPath);
    $form.removeAttr("target");
    $form.attr("onsubmit", "return queryCallback(this, '" + sysDictTypeConfig.searchInfoModuleName + "_dictInfo_search_list');");
    
}

/**
 * 获取字典分类配置
 * @param path
 * @returns
 */
function getDictTypeSetting() {
//    var dataUrl = sysDictTypeConfig.contextPath + "/" + sysDictTypeConfig.moduleName + "/" + sysDictTypeConfig.treeUrl;
    var setting = {
        check : {
            enable : false
        },
        data : {
            key : {
                type : "type"
            },
            simpleData : {
                enable : true, // 数据是否采用简单 Array 格式，默认false
                idKey : "id", // 在isSimpleData格式下，当前节点id属性,即指定isSimpleDate:true,这个属性必须被指定
                pIdKey : "pId",
                rootPId : -1 //默认值：null
            }
        },
        view : {
            selectedMulti : false,// 同时选中多个节点,默认是true
            showIcon : true, //默认值：true
            showLine : true, // 是否显示节点间的连线
            // fontCss : getDictTypeFontCss,
            fontCss : function(treeId, treeNode) {
                return (!!treeNode.highlight) ? {
                    color : "#A60000",
                    "font-weight" : "bold"
                } : {
                    color : "#333",
                    "font-weight" : "normal"
                };
            }
        },
//        async : {
//            enable : true,
//            url : dataUrl,
//            dataType : 'json',
//            autoParam : [ "pId" ],
//            dataFilter : function(treeId, parentNode, childNodes){
//                if (!childNodes)
//                    return null;
////                for (var i = 0, l = childNodes.length; i < l; i++) {
////                    childNodes[i].id = childNodes[i].type_key;
////                    childNodes[i].pId = childNodes[i].sup_key;
////                    childNodes[i].name = childNodes[i].type_name;
////                }
//                return convertDictTypeTree(childNodes);
//            }
//        },
        callback : {
            beforeDrag : function(treeId, treeNode){
                return false;
            },
            onAsyncSuccess : function(event, treeId, treeNode, msg){
                addDebugInfo("onAsyncSuccess:" + JSON.stringify(treeNode));
                var zTreeObj = $.fn.zTree.getZTreeObj(sysDictTypeConfig.treeId); 
                zTreeObj.updateNode(treeNode);
                
            },
            onClick : function (event, treeId, treeNode) {
                addDebugInfo("onClick:" + JSON.stringify(treeNode));
                
                clearDictInfoForm(treeNode.typeKey);
                queryDictInfoForm();
//                var dataUrl = sysDictTypeConfig.contextPath + "/" + sysDictTypeConfig.searchInfoModuleName + "/" + sysDictTypeConfig.searchInfoUrl;
//                dataUrl += "?typeKey=" + treeNode.typeKey; 
//                addDebugInfo("查询字典信息URL:" + dataUrl + ", 区域ID:" + sysDictTypeConfig.searchInfoListId);
//                loadCallback(dataUrl, sysDictTypeConfig.searchInfoListId);
            }
        }
    };
    return setting;
}

/**
 * 查询字典分类树
 */
function doDictTypeSearchTree(){
    var keyword = $("#" + sysDictTypeConfig.searchTypeKeywordId).val();
    keyword = keyword.replace(/%/g, "");
    keyword = keyword.replace(/ /g, "");
    
    addDebugInfo("系统字典类型Search[关键字]:" + keyword);
    // 销毁历史记录
    $.fn.zTree.destroy(sysDictTypeConfig.treeId);
    
    // 重新加载数据
    var dataUrl = sysDictTypeConfig.contextPath + "/" + sysDictTypeConfig.moduleName + "/" + sysDictTypeConfig.treeUrl;
    var params = "typeName=" + keyword;
    var params = "&delFlag=0";
    $.ajax({
        type : "post",
        url : dataUrl,
        data : params,
        dataType : 'json',
        success : function(result) {
            $.fn.zTree.init($("#" + sysDictTypeConfig.treeId), getDictTypeSetting(), convertDictTypeTree(result));   
            
            clearDictInfoForm("-1");
            queryDictInfoForm();
        },
        error : sessionTimeout
    });
}

/**
 * 转化为字典分类树
 * @param lists 数据集合
 * @returns Tree数据集合
 */
function convertDictTypeTree(resultList){
    for (var i = 0, l = resultList.length; i < l; i++) {
        resultList[i].id = resultList[i].typeKey;
        resultList[i].pId = resultList[i].supKey;
        resultList[i].name = resultList[i].typeName;
    }
    
    return resultList;
}

/**
 * 清空查询字典信息表单
 */
function clearDictInfoForm(typeKey){
    if(typeKey){
        $("#" + sysDictTypeConfig.moduleName + "_typeKey").val(typeKey);
    }
    commUtils.resetVal($("#" + sysDictTypeConfig.searchInfoModuleName + "_dictInfo_form_temp"));
}

/**
 * 查询字典信息表单
 */
function queryDictInfoForm() {
    // 设置查询参数
    $("#" + sysDictTypeConfig.searchInfoFormId + " input").each(function(i) {
        var obj = $(this);
        var tempObj = $("#" + sysDictTypeConfig.searchInfoModuleName + "_" + obj.attr("name"));
        if(tempObj.length > 0){
            obj.val(tempObj.val());
        }
    });
    
    var $form = $("#" + sysDictTypeConfig.searchInfoFormId);
    addDebugInfo("查询字典信息参数:" + JSON.stringify($form.serializeArray()));
    $form.submit();
}