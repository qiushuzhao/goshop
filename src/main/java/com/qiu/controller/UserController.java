package com.qiu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.qiu.commons.base.BaseController;

@Controller
@RequestMapping("user")
public class UserController extends BaseController{

	@RequestMapping("/query")
	public String queryUser(){
		
		return "list";
	}
	
}
