package com.qiu.service;

import java.util.List;

import com.baomidou.mybatisplus.service.IService;
import com.qiu.commons.result.Tree;
import com.qiu.commons.shiro.ShiroUser;
import com.qiu.entity.Resource;

public interface ResourceService extends IService<Resource> {

	/**
	 * 获取菜单树
	 * @return
	 */
	List<Tree> selectTree(ShiroUser shiroUser);
}
