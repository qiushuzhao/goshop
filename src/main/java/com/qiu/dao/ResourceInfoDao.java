package com.qiu.dao;

import java.util.List;
import java.util.Set;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.qiu.entity.Resource;
import com.qiu.entity.SystemMenu;

public interface ResourceInfoDao extends BaseMapper<Resource> {

	/**
	 * 查询菜单
	 * @param roleId
	 * @return
	 */
	List<SystemMenu> queryMenu(Set<String> list);
	
}
