/**
 * Copyright (C) 2014 XUNTIAN NETWORK
 *
 *
 * @className:com.xtwl.manager.util
 * @description:
 * 
 * @version:v1.0.0 
 * @author:Bing Lu
 * 
 * Modification History:
 * Date         Author      Version     Description
 * -----------------------------------------------------------------
 * 2014-10-20     Bing Lu       v1.0.0        create
 *
 *
 */
package com.qiu.commons.utils;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * 字符串工具类
 * 
 * @className:com.xtwl.manager.util.StringTools
 * @description:
 * @version:v1.0.0
 * @date:2014-10-20 下午4:15:38
 * @author:Bing Lu
 */
public class StringTools
{

    /**
     * 字符串开始时间模糊查询
     * @Description:
     * @param str
     * @return
     * @version:v1.0
     * @author:PengZhongYan
     * @date:2016-7-15 下午1:51:36
     */
    public static String queryBeginTime(String str)
    {
        if (!StringTools.isNullOrEmpty(str))
        {
           str = str + " 00:00:00";
        }
        return str;
    }
    
    /**
     * 字符串结束时间模糊查询
     * @Description:
     * @param str
     * @return
     * @version:v1.0
     * @author:PengZhongYan
     * @date:2016-7-15 下午1:51:36
     */
    public static String queryEndTime(String str)
    {
        if (!StringTools.isNullOrEmpty(str))
        {
        	str  = str  + " 23:59:59";
        }
        return str;
    }
        
	/**
	 * 
	 * @Description:
	 * @param str
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:15:49
	 */
	public static String removeSpace(String str)
	{
		if (StringTools.isNullOrEmpty(str))
		{
			return "";
		}
		return str.trim();
	}

	/**
	 * 
	 * @Description:
	 * @param str
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:15:53
	 */
	public static boolean isNullOrEmpty(String str)
	{
		if (null == str || "".equals(str) || "null".equals(str))
		{
			return true;
		}
		return false;
	}

	/**
	 * 
	 * @Description:
	 * @param obj
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:15:58
	 */
	public static boolean isNullOrEmpty(Object obj)
	{
		if (null == obj || "".equals(obj))
		{
			return true;
		}
		return false;
	}

	/**
	 * 
	 * @Description:
	 * @param str
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:16:03
	 */
	public static int parseStr2Int(String str)
	{
		int num = 0;
		try
		{
			if (StringTools.isNullOrEmpty(str))
			{
				return 0;
			}
			num = Integer.parseInt(StringTools.removeSpace(str));
		}
		catch (NumberFormatException e)
		{
			return 0;
		}
		return num;
	}

	/**
	 * 字符串截取
	 * 
	 * @Description:
	 * @param str
	 * @param length
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:16:12
	 */
	public static String cutOutString(String str, int length)
	{
		str = StringTools.removeSpace(str);
		String newStr = str;
		if (StringTools.isNullOrEmpty(str))
		{
			return "";
		}

		if (str.length() > length)
		{
			newStr = str.substring(0, length) + "...";
		}
		return newStr;
	}

	/**
	 * 判断是否是中文
	 * 
	 * @Description:
	 * @param str
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:16:23
	 */
	public static boolean isChinese(String str)
	{
		Pattern pattern = Pattern.compile("[\\u3400-\\u9FBF]+");// 是否中文表达式
		if (isNullOrEmpty(str))
		{
			return false;
		}
		if (pattern.matcher(str.trim()).find())
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	/**
	 * 单个字符串替换
	 * 
	 * @Description:
	 * @param stringInfo
	 * @param newStr
	 * @param oldStr
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:16:37
	 */
	public static String replaceString(String stringInfo, String newStr, String oldStr)

	{
		stringInfo = stringInfo.replace(oldStr, newStr);

		return stringInfo;
	}

	/**
	 * 计算两个字符串格式数字和
	 * 
	 * @Description:
	 * @param str1
	 * @param str2
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:16:52
	 */
	public static String getSumByString(String str1, String str2)
	{
		String sum = "";

		int a = StringTools.parseStr2Int(str1) + StringTools.parseStr2Int(str2);

		sum = String.valueOf(a);

		return sum;
	}

	/**
	 * 计算三个字符串格式的数字的和
	 * 
	 * @Description:
	 * @param str1
	 * @param str2
	 * @param str3
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:17:17
	 */
	public static String getSumByStrings(String str1, String str2, String str3)
	{
		String sum = "";

		int a = StringTools.parseStr2Int(str1) + StringTools.parseStr2Int(str2) + StringTools.parseStr2Int(str3);

		sum = String.valueOf(a);

		return sum;
	}

	/**
	 * 转换JSON数据格式中有换行的数据
	 * 
	 * @Description:
	 * @param str
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:17:27
	 */
	public static String replaceJsonStrVal(String str)
	{
		return str.replaceAll("(\r)", "").replaceAll("(\n)", "^");
	}

	/**
	 * 转换JSON数据格式中有换行的数据
	 * 
	 * @Description:
	 * @param str
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:17:43
	 */
	public static String replaceJsonStrHtml(String str)
	{
		return str.replaceAll("(\r)", "").replaceAll("(\n)", "<br>");
	}

	/**
	 * 判断数字字符是否有值，没有值则返回字符“0”
	 * 
	 * @Description:
	 * @param str
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:17:50
	 */
	public static String stringIsNull(String str)
	{
		if (StringTools.isNullOrEmpty(str))
		{
			return "0";
		}
		return str;
	}

	/**
	 * 字符串转数字
	 * 
	 * @Description:
	 * @param num
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:17:57
	 */
	public static String valueOfString(int num)
	{
		if (StringTools.isNullOrEmpty(num))
		{
			return "0";
		}
		return String.valueOf(num);
	}

	/**
	 * 将标题加入到返回到前段table显示的json中
	 * 
	 * @Description:
	 * @param menuJson
	 * @param titleMap
	 * @version:v1.0
	 * @author:LiuChang
	 * @return
	 * @date:2014-10-28 下午4:44:13
	 */
	public static String mapAddToJson(String menuJson, Map<String, String> titleMap)
	{
		StringBuffer sbf = new StringBuffer();
		sbf.append("[{");
		for (String key : titleMap.keySet())
		{
			sbf.append("\"" + key + "\":" + "\"" + titleMap.get(key) + "\",");
		}
		if (sbf.length() > 2)
			sbf.setLength(sbf.length() - 1);
		sbf.append("},");
		menuJson = sbf.toString() + menuJson.substring(1);
		return menuJson;
	}

	/**
	 * @Description:
	 * @param menuJson
	 * @param titleMap
	 * @param isDataEmpty
	 * @return
	 * @version:v1.0
	 * @author: xjliu
	 * @date:Apr 3, 2015 2:52:51 PM
	 */
	public static String mapAddToJson(String menuJson, Map<String, String> titleMap, boolean isDataEmpty)
	{
		String rs = mapAddToJson(menuJson, titleMap);
		rs = rs.replace("\"null\"", "");
		if (isDataEmpty)
		{
			rs = rs.replace(",]", "]");
		}
		return rs;
	}

	public static boolean isEmpty(String str)
	{
		if (str == "" || str == null)
			return true;
		return false;
	}

	public static String arrayToString(String[] strArray)
	{
		if (strArray == null || strArray.length == 0)
			return null;
		StringBuffer sbf = new StringBuffer();
		for (String str : strArray)
		{
			sbf.append("'" + str + "',");
		}
		return sbf.substring(0, sbf.length() - 1);
	}

	public static String arrayToStringforInQuery(String[] strArray)
	{
		if (strArray == null || strArray.length == 0)
			return null;
		StringBuffer sbf = new StringBuffer();
		for (String str : strArray)
		{
			sbf.append("'" + str + "',");
		}
		return sbf.substring(1, sbf.length() - 2);
	}

	public static String arrayToInteger(String[] strArray)
	{
		if (strArray == null || strArray.length == 0)
			return null;
		StringBuffer sbf = new StringBuffer();
		for (String str : strArray)
		{
			sbf.append(str + ",");
		}
		return sbf.substring(0, sbf.length() - 1);
	}

	/**
	 * @Description:String to hex string
	 * @param str
	 * @return
	 * @version:v1.0
	 * @author: xjliu
	 * @date:Apr 24, 2015 3:15:15 PM
	 */
	public static String toHexString(String str)
	{
		StringBuilder sb = new StringBuilder();
		byte[] bytes = str.getBytes(StandardCharsets.UTF_8);
		for (byte b : bytes)
		{
			sb.append(String.format("%02x", b));
		}
		return sb.toString();
	}

	/**
	 * @Description: Hex string to string
	 * @param hexStr
	 * @return
	 * @version:v1.0
	 * @author: xjliu
	 * @date:Apr 24, 2015 3:48:23 PM
	 */
	public static String parseHexString(String hexStr)
	{
		int len = hexStr.length();
		byte[] bArr = new byte[len / 2];
		int j = 0;
		for (int i = 0; i < len; i += 2, j++)
		{
			String hex = hexStr.substring(i, i + 2);
			byte b = Integer.valueOf(hex, 16).byteValue();
			bArr[j] = b;
		}
		return new String(bArr, StandardCharsets.UTF_8);
	}

	/**
	 * @Description:
	 * @param strList
	 * @param split
	 * @param preFix
	 * @param postFix
	 * @return
	 * @version:v1.0
	 * @author: xjliu
	 * @date:Jul 28, 2015 9:17:52 AM
	 */
	public static String ToString(List<String> strList, String split, String preFix, String postFix)
	{
		if (null == strList || strList.size() < 1)
		{
			return "";
		}
		if (StringTools.isNullOrEmpty(preFix))
		{
			preFix = "";
		}
		if (StringTools.isNullOrEmpty(postFix))
		{
			postFix = "";
		}
		String result = "";
		for (int i = 0; i < strList.size(); i++)
		{
			result += preFix + strList.get(i) + postFix + split;
		}
		if (result.endsWith(split))
		{
			result = result.substring(0, result.length() - split.length() - 1);
		}
		return result;
	}
	
	/**
	 * 处理sql中转义字符（',/,%,_）,主要用于模糊查询 
	 * @Description:
	 * @param param
	 * @return
	 * @version:v1.0
	 * @author:Zhu Zhenhua
	 * @date:2016年3月22日 下午3:22:17
	 */
	public static String convertMySqlLike(String param)
	{
		if(!isNullOrEmpty(param))
		{
			param = param.trim();
		}
		return param;
	}
	
	/**
	 * 处理sql中转义字符（',/,%,_）,主要用于模糊查询 
	 * @Description:
	 * @param param
	 * @return
	 * @version:v1.0
	 * @author:Zhu Zhenhua
	 * @date:2016年3月22日 下午3:22:17
	 */
	public static String convertOracleLike(String param)
	{
		if(!isNullOrEmpty(param))
		{
			/*param = param.replaceAll("'", "''");*/
			if(param.contains("/"))
			{
				param = param.replaceAll("/","//");
			}
			param = param.trim();
			if(param.contains("%"))
			{
				param = param.replaceAll("%","/%");
			}
			if(param.contains("_"))
			{
				param = param.replaceAll("_","/_");
			}
		}
		return param;
	}
	
	/**
	 * 字符串转换unicode
	 */
	public static String string2Unicode(String string) {
	 
	    StringBuffer unicode = new StringBuffer();
	 
	    for (int i = 0; i < string.length(); i++) {
	 
	        // 取出每一个字符
	        char c = string.charAt(i);
	 
	        // 转换为unicode
	        unicode.append("\\u" + Integer.toHexString(c));
	    }
	 
	    return unicode.toString();
	}

	/**
	 *
	 * @Description:判断手机号码
	 * @param mobiles
	 * @return
	 * @version:v1.0
	 * @author:WangJun
	 * @date:2016-8-29 下午2:11:01
	 */
	public static boolean isMobileNO(String mobiles)
	{

		Pattern p = Pattern
				.compile("^(?:13\\d|14\\d|15\\d|18\\d|17\\d)\\d{5}(\\d{3}|\\*{3})$");

		Matcher m = p.matcher(mobiles);

		System.out.println(m.matches() + "---");

		return m.matches();

	}

}
