package com.qiu.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.qiu.entity.Resource;
import com.qiu.entity.Role;

public interface RoleInfoDao extends BaseMapper<Role> {

	/**
	 * 根据roleid查询资源信息
	 * @param id
	 * @return
	 */
	List<Map<Integer,String>> selectResourceListByRoleId(Integer id);
	
	List<Resource> selectResourceListByRoleIdList(@Param("list") List<Integer> list);
}
