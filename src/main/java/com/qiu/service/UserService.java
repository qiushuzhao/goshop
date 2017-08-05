package com.qiu.service;

import java.util.List;

import com.baomidou.mybatisplus.service.IService;
import com.qiu.entity.User;

public interface UserService extends IService<User>{

	/**
	 * 根据用户名查询列表
	 * @param user
	 * @return
	 */
	public List<User> selectUserLoginByName(User user);
}
