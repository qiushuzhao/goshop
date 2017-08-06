package com.qiu.service;

import java.util.Map;
import java.util.Set;

import com.baomidou.mybatisplus.service.IService;
import com.qiu.entity.Role;

public interface RoleService extends IService<Role> {
	/**
	 * 查询永固角色和资源
	 * @param userId
	 * @return
	 */
	Map<String, Set<String>> selectResourceMapByUserId(Integer userId);
}
