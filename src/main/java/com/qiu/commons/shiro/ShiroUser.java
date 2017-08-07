package com.qiu.commons.shiro;

import java.io.Serializable;
import java.util.Set;

public class ShiroUser implements Serializable{

	private static final long serialVersionUID = 6123713267429783012L;

	private int id;
	
	private String loginName;
	
	private String name;
	
	private Set<String> urlset;
	
	private Set<String> roles;
	
	
	
	public ShiroUser() {
		super();
	}
	public ShiroUser(int id, String loginName, String name, Set<String> urlset) {
		super();
		this.id = id;
		this.loginName = loginName;
		this.name = name;
		this.urlset = urlset;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Set<String> getUrlset() {
		return urlset;
	}
	public void setUrlset(Set<String> urlset) {
		this.urlset = urlset;
	}
	public Set<String> getRoles() {
		return roles;
	}
	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
	@Override
	public String toString() {
		return loginName;
	}
	
	
}
