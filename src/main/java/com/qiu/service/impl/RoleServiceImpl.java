package com.qiu.service.impl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.qiu.commons.utils.StringTools;
import com.qiu.dao.RoleInfoDao;
import com.qiu.dao.UserRoleInfoDao;
import com.qiu.entity.Role;
import com.qiu.service.RoleService;

@Service
public class RoleServiceImpl extends ServiceImpl<RoleInfoDao, Role> implements RoleService{

	@Autowired
	private UserRoleInfoDao userRoleInfoDao;
	
	@Autowired
	private RoleInfoDao roleInfoDao;
	
	@Override
	public Map<String, Set<String>> selectResourceMapByUserId(Integer userId) {
		Map<String, Set<String>> resourceMap = new HashMap<String, Set<String>>();
		List<Integer> roleIds = userRoleInfoDao.selectRoleIdByUserId(userId);
		Set<String> urlSet = new HashSet<String>();
	    Set<String> roles = new HashSet<String>();
		for (Integer integer : roleIds) {
			
			List<Map<Integer, String>> listResource = roleInfoDao.selectResourceListByRoleId(integer);
			for (Map<Integer, String> map : listResource) {
				if(!StringTools.isNullOrEmpty(map.get("url"))){
					urlSet.add(map.get("url"));
				}
			}
			Role roleId = roleInfoDao.selectById(integer);
			if(!StringTools.isNullOrEmpty(roleId)){
				roles.add(roleId.getName());
			}
		}
		resourceMap.put("roles", roles);
		resourceMap.put("url",urlSet);
		return resourceMap;
	}

}
