package com.qiu.service.impl;

import com.qiu.entity.User;
import com.qiu.dao.UserDao;
import com.qiu.service.UserService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户 服务实现类
 * </p>
 *
 * @author 邱先生
 * @since 2017-08-10
 */
@Service
public class UserServiceImap extends ServiceImpl<UserDao, User> implements UserService {
	
}
