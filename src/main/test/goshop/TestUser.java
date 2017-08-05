package goshop;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.qiu.dao.UserInfoDao;

public class TestUser {

	public static void main(String[] args) {
		ApplicationContext app=new ClassPathXmlApplicationContext("spring/spring-mybatis.xml");
		UserInfoDao bean = app.getBean(UserInfoDao.class);
		bean.selectById(1);
		System.out.println(bean);
	}
}
