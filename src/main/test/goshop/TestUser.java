package goshop;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.qiu.dao.UserInfoDao;
import com.qiu.dao.UserRoleInfoDao;

public class TestUser {

	public static void main(String[] args) {
		ApplicationContext app=new ClassPathXmlApplicationContext("spring/spring-mybatis.xml");
		UserRoleInfoDao bean = app.getBean(UserRoleInfoDao.class);
		List<Integer> selectRoleIdByUserId = bean.selectRoleIdByUserId(1);
		for (Integer integer : selectRoleIdByUserId) {
			System.out.println(integer);
		}
		System.out.println(bean);
	}
}
