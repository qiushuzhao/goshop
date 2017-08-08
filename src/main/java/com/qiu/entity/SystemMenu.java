package com.qiu.entity;

import java.util.Date;

public class SystemMenu
{
	private Integer id;

	private String menuName;

	private String supMenuId;

	private String menuAddr;

	private String menuOperation;

	private String menuRel;

	private String orderFlag;

	private Date addtime;

	private Date edittime;

	private String status;

	public Integer getId()
	{
		return id;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

	public String getMenuName()
	{
		return menuName;
	}

	public void setMenuName(String menuName)
	{
		this.menuName = menuName == null ? null : menuName.trim();
	}

	public String getSupMenuId()
	{
		return supMenuId;
	}

	public void setSupMenuId(String supMenuId)
	{
		this.supMenuId = supMenuId == null ? null : supMenuId.trim();
	}

	public String getMenuAddr()
	{
		return menuAddr;
	}

	public void setMenuAddr(String menuAddr)
	{
		this.menuAddr = menuAddr == null ? null : menuAddr.trim();
	}

	public String getMenuOperation()
	{
		return menuOperation;
	}

	public void setMenuOperation(String menuOperation)
	{
		this.menuOperation = menuOperation == null ? null : menuOperation
				.trim();
	}

	public String getMenuRel()
	{
		return menuRel;
	}

	public void setMenuRel(String menuRel)
	{
		this.menuRel = menuRel == null ? null : menuRel.trim();
	}

	public String getOrderFlag()
	{
		return orderFlag;
	}

	public void setOrderFlag(String orderFlag)
	{
		this.orderFlag = orderFlag == null ? null : orderFlag.trim();
	}

	public Date getAddtime()
	{
		return addtime;
	}

	public void setAddtime(Date addtime)
	{
		this.addtime = addtime;
	}

	public Date getEdittime()
	{
		return edittime;
	}

	public void setEdittime(Date edittime)
	{
		this.edittime = edittime;
	}

	public String getStatus()
	{
		return status;
	}

	public void setStatus(String status)
	{
		this.status = status == null ? null : status.trim();
	}
}