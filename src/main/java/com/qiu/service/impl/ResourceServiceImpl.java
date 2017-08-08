package com.qiu.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.qiu.commons.result.Tree;
import com.qiu.commons.shiro.ShiroUser;
import com.qiu.dao.ResourceInfoDao;
import com.qiu.dao.RoleInfoDao;
import com.qiu.dao.UserRoleInfoDao;
import com.qiu.entity.Resource;
import com.qiu.entity.SystemMenu;
import com.qiu.service.ResourceService;

@Service
public class ResourceServiceImpl extends ServiceImpl<ResourceInfoDao, Resource> implements ResourceService{

	@Autowired
	private ResourceInfoDao resourceInfoDao;
	
	@Autowired
	private UserRoleInfoDao userRoleInfoDao;
	
	@Autowired
	private RoleInfoDao roleInfoDao;
	
	@Override
	public List<Tree> selectTree(ShiroUser shiroUser) {
		List<Tree> trees=new ArrayList<Tree>();
		//获取用户的角色
		Set<String> roles = shiroUser.getRoles();
		if(null==roles){
			return trees;
		}
		//超级管理员
		if(roles.contains("admin")){
			List<Resource> resources = this.selectByType(0);
			for (Resource resource : resources) {
				Tree tree = new Tree();
                tree.setId(resource.getId());
                tree.setPid(resource.getPid());
                tree.setText(resource.getName());
                tree.setIconCls(resource.getIcon());
                tree.setAttributes(resource.getUrl());
                tree.setOpenMode(resource.getOpenMode());
                tree.setState(resource.getOpened());
                trees.add(tree);
			}
		}
		//普通用户
		 List<Integer> roleIdList = userRoleInfoDao.selectRoleIdByUserId(shiroUser.getId());
	        if (roleIdList == null) {
	            return trees;
	        }
	        List<Resource> resourceLists = roleInfoDao.selectResourceListByRoleIdList(roleIdList);
	        if (resourceLists == null) {
	            return trees;
	        }
	        for (Resource resource : resourceLists) {
	            Tree tree = new Tree();
	            tree.setId(resource.getId());
	            tree.setPid(resource.getPid());
	            tree.setText(resource.getName());
	            tree.setIconCls(resource.getIcon());
	            tree.setAttributes(resource.getUrl());
	            tree.setOpenMode(resource.getOpenMode());
	            tree.setState(resource.getOpened());
	            trees.add(tree);
	        }
		return trees;
	}
	
	 public List<Resource> selectByType(Integer type) {
	        EntityWrapper<Resource> wrapper = new EntityWrapper<Resource>();
	        Resource resource = new Resource();
	        wrapper.setEntity(resource);
	        wrapper.addFilter("resource_type = {0}", type);
	        wrapper.orderBy("seq");
	        return resourceInfoDao.selectList(wrapper);
	    }

	@Override
	public List<SystemMenu> queryMenu(Set<String> list) {
		return resourceInfoDao.queryMenu(list);
	}

	

}
