package com.qiu.commons.plus;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.rules.DbType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;

public class MybatisPlusUtils {
	public static void main(String[] args) throws InterruptedException {
		AutoGenerator mpg = new AutoGenerator();

		// 全局配置
		GlobalConfig gc = new GlobalConfig();
		gc.setOutputDir("D:\\360");
		gc.setFileOverride(true);
		gc.setActiveRecord(true);
		gc.setEnableCache(true);// XML 二级缓存
		gc.setBaseResultMap(true);// XML ResultMap
		gc.setBaseColumnList(true);// XML columList
		gc.setAuthor("邱先生");

		// 自定义文件命名，注意 %s 会自动填充表实体属性！
		gc.setMapperName("%sDao");
		gc.setXmlName("%sMapper");
		gc.setServiceName("%sService");
		gc.setServiceImplName("%sServiceImap");
		gc.setControllerName("%sController");
		mpg.setGlobalConfig(gc);

		// 数据源配置
		DataSourceConfig dsc = new DataSourceConfig();
		dsc.setDbType(DbType.MYSQL);
		/*
		 * dsc.setTypeConvert(new MySqlTypeConvert(){ // 自定义数据库表字段类型转换【可选】
		 * 
		 * @Override public DbColumnType processTypeConvert(String fieldType) {
		 * System.out.println("转换类型：" + fieldType); return
		 * super.processTypeConvert(fieldType); } });
		 */

		dsc.setDriverName("com.mysql.jdbc.Driver");
		dsc.setUrl(
				"jdbc:mysql://localhost:3306/goshop?useUnicode=true&amp;characterEncoding=UTF-8&amp;generateSimpleParameterMetadata=true");
		dsc.setUsername("root");
		dsc.setPassword("root");
		mpg.setDataSource(dsc);

		// 策略配置
		StrategyConfig strategy = new StrategyConfig();
		// strategy.setCapitalMode(true);// 全局大写命名 ORACLE 注意
		// strategy.setTablePrefix(new String[] { "tlog_", "tsys_" });//
		// 此处可以修改为您的表前缀
		strategy.setNaming(NamingStrategy.underline_to_camel);// 表名生成策略
		// strategy.setInclude(new String[] { "user" }); // 需要生成的表
		// strategy.setExclude(new String[]{"test"}); // 排除生成的表
		mpg.setStrategy(strategy);

		// 包配置
		PackageConfig pc = new PackageConfig();
		pc.setParent("com.qiu");
		pc.setEntity("entity");
		pc.setXml("sqlMapperxml");
		pc.setController("controller");
		pc.setMapper("dao");
		pc.setService("service");
		pc.setServiceImpl("service.impl");
		
		mpg.setPackageInfo(pc);

		// 执行生成
		mpg.execute();
	}
}
