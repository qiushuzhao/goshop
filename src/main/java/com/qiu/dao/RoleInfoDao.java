package com.qiu.dao;

import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.qiu.entity.Role;

public interface RoleInfoDao extends BaseMapper<Role> {

	/**
	 * 根据roleid查询资源信息
	 * @param id
	 * @return
	 */
	List<Map<Integer,String>> selectResourceListByRoleId(Integer id);
}
