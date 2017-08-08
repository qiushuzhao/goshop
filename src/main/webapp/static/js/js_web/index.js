$(document).ready(function(){
	//左侧导航栏
	$(".nav_left_list li").click(function(){
		$(this).addClass("nav_left_list_liclick").siblings().removeClass("nav_left_list_liclick");
	});
	//首页管理导航栏
	$(".bodymatter_nav_list li").click(function(){
		$(this).addClass("bodymatter_nav_list_liclick").siblings().removeClass("bodymatter_nav_list_liclick");
	});

	$(".fixed_sygl1_close").click(function(){
		$(this).parents(".fixed_tc").addClass("display_none");
	});
	$(".tiku_tit_btn2").click(function(){
		$(this).parents(".fixed_tc").addClass("display_none");
	});

	//点击类型样式切换
	$(".career_con_city span").click(function(){
		$(this).addClass("career_con_list_background").siblings().removeClass("career_con_list_background");
	});

	$(".fixed_sygl2_primary_uploadpic_close").click(function(){
		$(this).parents(".fixed_sygl2_primary_uploadpic").remove();
	});

	$(".list_paixu").click(function(){
		$(this).find(".list_paixu_img").toggleClass("rotate180");
		$(this).parents("td").siblings().find(".list_paixu_img").removeClass("rotate180");
	});

	$(".bodymatter_nav_list").children("li").click(function(){
		var index=$(this).index();
		$(".bodymatter_con_navlist").children("li").eq(index).addClass("display_block").siblings().removeClass("display_block");
	});

	//题库管理-信息信息切换
	$(".tkgljbxx_nav_list").children("li").click(function(){
		var index=$(this).index();
		$(".tkgljbxx_contab").children("li").eq(index).addClass("display_block").siblings().removeClass("display_block");
		$(".tkgljbxx_choose_list").children("li").eq(index).addClass("display_block").siblings().removeClass("display_block");
	});

	//创建套题-听力-所在年级选择
	$(".primary_listen_njchoose li").click(function(){
		$(this).addClass("primary_listen_njchoose_li_click").siblings().removeClass("primary_listen_njchoose_li_click");
	});

	//报表统计-上方选择
	$(".bbtj_top_list li").click(function(){
		$(this).addClass("bbtj_top_list_li").siblings().removeClass("bbtj_top_list_li");
	});

});

/*
//报表统计canvas
$(document).ready(function(){
	// 基于准备好的dom，初始化echarts图表
var myChart = echarts.init(document.getElementById('main')); 

var option = {
	tooltip : {
		trigger: 'axis'
	},
	calculable : true,
	xAxis : [
		{
			type : 'category',
			boundaryGap : false,
			data : ['周一','周二','周三','周四','周五','周六','周日']
		}
	],
	yAxis : [
		{
			type : 'value'
		}
	],
	series : [
		{
			name:'听力',
			type:'line',
			smooth:true,
			itemStyle: {normal: {areaStyle: {type: 'default'}}},
			data:[120, 112, 201, 234, 120, 190, 200]
		}
	]
};   

// 为echarts对象加载数据 
myChart.setOption(option);
// 基于准备好的dom，初始化echarts图表
var myChart = echarts.init(document.getElementById('main')); 

var option = {
	tooltip : {
		trigger: 'axis'
	},
	calculable : true,
	xAxis : [
		{
			type : 'category',
			boundaryGap : false,
			data : ['周一','周二','周三','周四','周五','周六','周日']
		}
	],
	yAxis : [
		{
			type : 'value'
		}
	],
	series : [
		{
			name:'听力',
			type:'line',
			smooth:true,
			itemStyle: {normal: {areaStyle: {type: 'default'}}},
			data:[120, 112, 201, 234, 120, 190, 200]
		}
	]
};   

// 为echarts对象加载数据 
myChart.setOption(option);})

//报表统计canvas
$(document).ready(function(){
	// 基于准备好的dom，初始化echarts图表
var myChart = echarts.init(document.getElementById('cana_2')); 

var option = {
    tooltip : {
        trigger: 'axis'
    },

    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['听力','阅读','语法','词汇']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        
        {
            name:'平均时长',
            type:'line',
            stack: '总量',
            data:[20, 15, 28, 22,]
        }
    ]
};
                    

// 为echarts对象加载数据 
myChart.setOption(option);})
*/