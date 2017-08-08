package com.qiu.controller;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qiu.commons.base.BaseController;
import com.qiu.commons.result.Result;
import com.qiu.commons.result.Tree;
import com.qiu.commons.shiro.DreamCaptcha;
import com.qiu.commons.shiro.ShiroUser;
import com.qiu.commons.utils.DateUtils;
import com.qiu.commons.utils.StringUtils;
import com.qiu.commons.utils.WebUtils;
import com.qiu.dao.UserRoleInfoDao;
import com.qiu.entity.User;
import com.qiu.entity.UserRole;
import com.qiu.service.ResourceService;
/**
 * Authentication failed for token submission
 * [org.apache.shiro.authc.UsernamePasswordToken - admin, rememberMe=false].
 * Possible unexpected error? (Typical or expected login exceptions should
 * extend from AuthenticationException).
 * 
 * @author Administrator
 *
 */
@Controller
public class LoginController extends BaseController{
	@Autowired
    private DreamCaptcha dreamCaptcha;
	
    @Autowired
    private ResourceService resourceService;
	
	@RequestMapping("/login")
	public String login() {
		return "login";
	}

	@RequestMapping("/code")
	public void code(HttpServletRequest request, HttpServletResponse response) {
		DreamCaptcha captcha = new DreamCaptcha();
		captcha.generate(request, response);
	}

	@RequestMapping(value = "/shirologin")
	@ResponseBody
	public Object shirologin(User user, HttpServletRequest request,HttpServletResponse response,String captcha) {
		if (StringUtils.isBlank(user.getLoginName())) {
			throw new RuntimeException("登录名不能为空");
		}
		if (StringUtils.isBlank(user.getPassword())) {
			throw new RuntimeException("密码不能为空");
		}
		if (StringUtils.isBlank(request.getParameter("captcha"))) {
			throw new RuntimeException("验证码不能为空");
		}
		 if (!dreamCaptcha.validate(request, response, captcha)) {
	            throw new RuntimeException("验证码错误");
	        }
		Subject suser = SecurityUtils.getSubject();
		UsernamePasswordToken token = new UsernamePasswordToken(user.getLoginName(), user.getPassword());
		//设置记住密码
		token.setRememberMe("1".equals(request.getParameter("rememberMe")));
		try {
			suser.login(token);
			return renderSuccess();
		} catch (UnknownAccountException e) {
            throw new RuntimeException("账号不存在！", e);
        } catch (DisabledAccountException e) {
            throw new RuntimeException("账号未启用！", e);
        } catch (IncorrectCredentialsException e) {
            throw new RuntimeException("密码错误！", e);
        } catch (Throwable e) {
            throw new RuntimeException(e.getMessage(), e);
        }
	}
	
	   /**
     * ajax成功
     * @return {Object}
     */
    public Object renderSuccess() {
        Result result = new Result();
        result.setSuccess(true);
        return result;
    }
	
    /**
     * 首页
     *
     * @return
     */
    @GetMapping("/")
    public String index() {
        return "redirect:/index";
    }

    /**
     * 首页
     *
     * @param model
     * @return
     */
    @GetMapping("/index")
    public String index(Model model) {
    	 ShiroUser shiroUser = getShiroUser();
    	model.addAttribute("dateStr", DateUtils.getUserDate("a").replace("PM", "下午").replace("AM", "上午"));
    	model.addAttribute("userName", getShiroUser().getName());
    	List<Tree> selectTree = resourceService.selectTree(shiroUser);
    	model.addAttribute("accountMenuList",selectTree);
    	String menuId = request.getParameter("menuId");
    	model.addAttribute("menuId", 1);
        return "index";
    }
    
    @PostMapping("/logout")
    @ResponseBody
    public Object logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return renderSuccess();
    }
    /**
     * 获取当前登录用户对象
     * @return {ShiroUser}
     */
    public ShiroUser getShiroUser() {
        return (ShiroUser) SecurityUtils.getSubject().getPrincipal();
    }

}
