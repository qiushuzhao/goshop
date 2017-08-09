/**
 * 
 */
package com.qiu.commons.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * @author hxt
 *
 */
public class GetUUID
{
	
	/**
	 * 获取有效的ID
	 * @Description: 生成规则：年月日时分秒+4位随机数
	 * @return
	 * @version:v1.0
	 * @author:LiChangjiang
	 * @date:2016年8月13日 上午9:38:40
	 */
	public static String getUsefulID()
	{
		Random jjj = new Random();
		Date currentTime = new Date();

		String randomNum = "";

		// 获取当前时间
		SimpleDateFormat formatter = new SimpleDateFormat("yyMMddhhmmssSSS");
		String dateString = formatter.format(currentTime);

		// 取四位随机数
		for (int k = 0; k < 5; k++)
		{
			randomNum = randomNum + jjj.nextInt(9);
		}

		return dateString + randomNum;
	}
	
	/**
	 * 返回一个随机数
	 * 
	 * @param i
	 * @return
	 */
	public static String getRandom(int i)
	{
		Random jjj = new Random();
		// int suiJiShu = jjj.nextInt(9);
		if (i == 0)
			return "";
		String jj = "";
		for (int k = 0; k < i; k++)
		{
			jj = jj + jjj.nextInt(9);
		}
		return jj;
	}
	
	public static String getUUID(String perfix) {
		return perfix + getUsefulID();
	}

}
