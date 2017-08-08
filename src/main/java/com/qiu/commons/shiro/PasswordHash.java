package com.qiu.commons.shiro;

import org.apache.shiro.crypto.hash.Md5Hash;
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
		 //所需加密的参数  即  密码
        String source = "123456";
        //[盐] 一般为用户名 或 随机数
        String salt = "test";
        //加密次数
        int hashIterations = 1;

        //调用 org.apache.shiro.crypto.hash.Md5Hash.Md5Hash(Object source, Object salt, int hashIterations)构造方法实现MD5盐值加密
        Md5Hash mh = new Md5Hash(source, salt, hashIterations);
        //打印最终结果
        System.out.println(mh.toString());


        /*调用org.apache.shiro.crypto.hash.SimpleHash.SimpleHash(String algorithmName, Object source, Object salt, int hashIterations)
         * 构造方法实现盐值加密  String algorithmName 为加密算法 支持md5 base64 等*/
        SimpleHash sh = new SimpleHash("md5", source, salt, hashIterations);
        //打印最终结果
        System.out.println(sh.toString());
	}
}
