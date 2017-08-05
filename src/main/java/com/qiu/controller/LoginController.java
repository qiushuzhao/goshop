package com.qiu.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.qiu.commons.shiro.DreamCaptcha;


@Controller
public class LoginController {

	@RequestMapping("/login")
	public String login(){
		return "login";
	}
	
	@RequestMapping("/code")
	public void code(HttpServletRequest request,HttpServletResponse response){
		DreamCaptcha captcha=new DreamCaptcha();
		captcha.generate(request, response);
	}
	
	@RequestMapping(value="/shirologin")
	public Object shirologin(){
		
		return "login";
	}
	
}
