package com.qiu.commons.shiro;

import org.apache.shiro.crypto.hash.SimpleHash;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.util.Assert;

import com.qiu.commons.utils.DigestUtils;

/**
 * shiro密码加密配置
 * @author L.cm
 *
 */
public class PasswordHash implements InitializingBean {
	private String algorithmName;
	private int hashIterations;

	public String getAlgorithmName() {
		return algorithmName;
	}
	public void setAlgorithmName(String algorithmName) {
		this.algorithmName = algorithmName;
	}
	public int getHashIterations() {
		return hashIterations;
	}
	public void setHashIterations(int hashIterations) {
		this.hashIterations = hashIterations;
	}
	
	@Override
	public void afterPropertiesSet() throws Exception {
		Assert.hasLength(algorithmName, "algorithmName mast be MD5、SHA-1、SHA-256、SHA-384、SHA-512");
	}
	
	public String toHex(Object source, Object salt) {
		return DigestUtils.hashByShiro(algorithmName, source, salt, hashIterations);
	}
	public static void main(String[] args) {
		String hashAlgorithmName = "MD5";
        String credentials = "123456";
        int hashIterations = 1;
        Object obj = new SimpleHash(hashAlgorithmName, credentials, null, hashIterations);
        System.out.println(obj);
	}
}
