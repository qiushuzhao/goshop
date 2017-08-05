package com.qiu.commons.shiro;

import java.util.List;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.qiu.entity.User;
import com.qiu.service.UserService;

public class ShiroDbRealm extends AuthorizingRealm{

	@Autowired
	private UserService userService;
	
	
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		return null;
	}

	
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		UsernamePasswordToken u=(UsernamePasswordToken)token;
		User user=new User();
		user.setLoginName(u.getUsername());
		List<User> users = userService.selectUserLoginByName(user);
		if(null==users||users.isEmpty()){
			return null;
		}
		User user2 = users.get(0);
		if(user2.getStatus().equals("1")){
			return null;
		}
		return null;
	}
	
	/**
	 * 登出
	 */
	@Override
	public void onLogout(PrincipalCollection principals) {
		super.onLogout(principals);
	}

}
