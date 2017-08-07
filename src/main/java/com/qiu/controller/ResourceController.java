package com.qiu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qiu.commons.base.BaseController;
import com.qiu.commons.shiro.ShiroUser;
import com.qiu.service.ResourceService;

/**
 * @description：资源管理
 * @author：zhixuan.wang
 * @date：2015/10/1 14:51
 */
@Controller
@RequestMapping("/resource")
public class ResourceController extends BaseController {

    @Autowired
    private ResourceService resourceService;

    /**
     * 菜单树
     *
     * @return
     */
    @GetMapping("/tree")
    @ResponseBody
    public Object tree() {
        ShiroUser shiroUser = getShiroUser();
        return resourceService.selectTree(shiroUser);
    }
}
