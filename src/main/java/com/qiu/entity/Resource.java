package com.qiu.entity;

import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import java.io.Serializable;

/**
 * <p>
 * 资源表
 * </p>
 *
 * @author 邱先生
 * @since 2017-08-10
 */
public class Resource extends Model<Resource> {

    private static final long serialVersionUID = 1L;

    /**
     * ID
     */
	@TableId(value="id", type= IdType.AUTO)
	private Integer id;
    /**
     * 菜单名称
     */
	@TableField("menu_name")
	private String menuName;
    /**
     * 上级菜单id
     */
	@TableField("sup_menu_id")
	private String supMenuId;
    /**
     * 链接地址
     */
	@TableField("menu_addr")
	private String menuAddr;
    /**
     * 模块名称
     */
	@TableField("menu_rel")
	private String menuRel;
    /**
     * 排序
     */
	@TableField("order_flag")
	private String orderFlag;
    /**
     * 添加时间
     */
	private Date addtime;
    /**
     * 修改时间
     */
	private Date edittime;
    /**
     * 状态(0有效，1无效)
     */
	private String status;
    /**
     * 删除标志
     */
	private String isdelete;


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public String getSupMenuId() {
		return supMenuId;
	}

	public void setSupMenuId(String supMenuId) {
		this.supMenuId = supMenuId;
	}

	public String getMenuAddr() {
		return menuAddr;
	}

	public void setMenuAddr(String menuAddr) {
		this.menuAddr = menuAddr;
	}

	public String getMenuRel() {
		return menuRel;
	}

	public void setMenuRel(String menuRel) {
		this.menuRel = menuRel;
	}

	public String getOrderFlag() {
		return orderFlag;
	}

	public void setOrderFlag(String orderFlag) {
		this.orderFlag = orderFlag;
	}

	public Date getAddtime() {
		return addtime;
	}

	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}

	public Date getEdittime() {
		return edittime;
	}

	public void setEdittime(Date edittime) {
		this.edittime = edittime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getIsdelete() {
		return isdelete;
	}

	public void setIsdelete(String isdelete) {
		this.isdelete = isdelete;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

}
