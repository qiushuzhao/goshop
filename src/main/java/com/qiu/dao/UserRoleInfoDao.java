package com.qiu.dao;

import java.util.List;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.qiu.entity.UserRole;

public interface UserRoleInfoDao extends BaseMapper<UserRole>{

	/**
	 * 根据userid查询roleId
	 * @param userId
	 * @return
	 */
	List<Integer> selectRoleIdByUserId(Integer userId);
}
