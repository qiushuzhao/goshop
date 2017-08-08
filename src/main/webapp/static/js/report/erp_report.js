
/**
 * 初始化页面
 */
function doErpReportInitPage(config){
    // 导出按钮事件
    $("#" + config.moduleName + "_list_operate_but_export").click(function(){
        $("#" + config.moduleName + "_list_form_but_export").click();
    });
    
    // 统计项
    if("Y" == config.totalSign){
        doErpReportTotalInfo(config.moduleName);
    }
}

/**
 * 初始化表单头
 */
function doErpReportInitForm(form, moduleName){
    var contextPath =  webContextPath;
    var $form = $(form);
    var webPath = contextPath + "/" + moduleName + "/query.htm";
    $form.attr("action", webPath);
    $form.removeAttr("target");
    $form.attr("onsubmit", "return queryCallback(this);");
}

/**
 * 查询订单
 */
function queryErpReportFormByCondition(form, moduleName){
    var $form = $(form);
    if (!$('#' + $form.attr("id")).valid()) {
        return;
    }
    doErpReportInitForm(form, moduleName);
    queryByCondition();
}

/**
 * 导出订单
 */
function doErpReportExportExcel(form, moduleName){
    var contextPath =  webContextPath;
    var $form = $(form);
    if (!$('#' + $form.attr("id")).valid()) {
      return;
    }
    var webPath = contextPath + "/" + moduleName + "/exportExcel.htm";
    $form.attr("action", webPath);
    $form.attr("target", "_blank");
    $form.removeAttr("onsubmit");
    
    layer.confirm('是否确认导出', {
      btn : [ '确认', '取消' ]
    // 按钮
    }, function() {
      $form.submit();
      layer.closeAll();
    });
}

/**
 * 统计信息
 */
function doErpReportTotalInfo(moduleName) {
    // 获取页面字段
    var exportFields = $("#" + moduleName + "_export_fields").val();
    var exportTitles = $("#" + moduleName + "_export_titles").val();
    var exportTypes = $("#" + moduleName + "_export_types").val();
    var exportFormulas = $("#" + moduleName + "_export_total_formula").val();
    //console.log("exportFields:" + exportFields + ", \nexportTitles:" + exportTitles + ", \nexportFormulas:" + exportFormulas);
    
    // 获取统计字段数组
    var totalFiledArray = new Array();
    var fields = exportFields.split(",");
    var titles = exportTitles.split(",");
    var types = exportTypes.split(",");
    var formulas = exportFormulas.split(",");
    for (var i=0; i<formulas.length; i++) {
        if ("Formula" == formulas[i]) {
            var fieldInfoObj = {
                "fieldIndex" : i,
                "fieldName" : fields[i],
                "fieldTitle" : titles[i],
                "fieldType" : types[i]
            }
            totalFiledArray[totalFiledArray.length] = fieldInfoObj;
        }
    }
    //console.log("totalFiledArray:" + totalFiledArray.join(","));
    
    // 计算统计数据
    var tempFiled = null;
    for (var i=0; i<totalFiledArray.length; i++) {
        var tempTotal = 0;
        tempFiled = totalFiledArray[i];
        $("#dataTable td[id^='" + moduleName + "_td_" + tempFiled.fieldName + "_']").each(function(i) {
            if("Integer" == tempFiled.fieldType){
                tempTotal += parseInt($(this).html());
            } else {
                tempTotal += parseFloat($(this).html());
            }
        });
        
        if("Double" == tempFiled.fieldType){
            tempTotal = tempTotal.toFixed(2);
        }
        $("#" + moduleName + "_total_" + tempFiled.fieldName).html(tempTotal);
        console.log( (i + 1) + ":" + tempFiled.fieldName + "(" +  tempFiled.fieldTitle + ")=" + tempTotal);
    }
    
    // 显示统计数据
    $("#" + moduleName + "_total_tr").show();
}
