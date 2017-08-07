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
import com.qiu.entity.Resouce;
import com.qiu.service.ResourceService;

@Service
public class ResourceServiceImpl extends ServiceImpl<ResourceInfoDao, Resouce> implements ResourceService{

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
			List<Resouce> resources = this.selectByType(0);
			for (Resouce resource : resources) {
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
	        List<Resouce> resourceLists = roleInfoDao.selectResourceListByRoleIdList(roleIdList);
	        if (resourceLists == null) {
	            return trees;
	        }
	        for (Resouce resource : resourceLists) {
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
	
	 public List<Resouce> selectByType(Integer type) {
	        EntityWrapper<Resouce> wrapper = new EntityWrapper<Resouce>();
	        Resouce resource = new Resouce();
	        wrapper.setEntity(resource);
	        wrapper.addFilter("resource_type = {0}", type);
	        wrapper.orderBy("seq");
	        return resourceInfoDao.selectList(wrapper);
	    }

}
