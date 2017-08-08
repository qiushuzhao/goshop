package com.qiu.service;

import java.util.List;
import java.util.Set;

import com.baomidou.mybatisplus.service.IService;
import com.qiu.commons.result.Tree;
import com.qiu.commons.shiro.ShiroUser;
import com.qiu.entity.Resource;
import com.qiu.entity.SystemMenu;

public interface ResourceService extends IService<Resource> {

	/**
	 * 获取菜单树
	 * @return
	 */
	List<Tree> selectTree(ShiroUser shiroUser);
	
	/**
	 * 查询菜单
	 * @param roleId
	 * @return
	 */
	List<SystemMenu> queryMenu(Set<String> list);
}
