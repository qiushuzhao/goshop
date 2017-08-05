package com.qiu.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.qiu.dao.UserInfoDao;
import com.qiu.entity.User;
import com.qiu.service.UserService;

@Service
public class UserServiceImpl extends ServiceImpl<UserInfoDao, User> implements UserService{

	@Autowired
	private UserInfoDao userInfoDao;
	
	@Override
	public List<User> selectUserLoginByName(User user) {
		EntityWrapper<User> wrapper = new EntityWrapper<User>(user);
		return userInfoDao.selectList(wrapper);
	}

}
