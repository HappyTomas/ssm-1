package com.mornsun.jsw.api.vo.tag;

import com.mornsun.jsw.api.model.tag.TagModel;

/**
 * 标签Vo
 *
 * @author: HuiJunLuo
 * @date:2015年12月31日
 * @Copyright:Copyright (c) xxxx有限公司 2014 ~ 2015 版权所有
 */
public class TagVo extends TagModel {

	private static final long serialVersionUID = 1L;

	/**
	 * 分类名称
	 */
	private String catalogName;

	public String getCatalogName() {
		return catalogName;
	}

	public void setCatalogName(String catalogName) {
		this.catalogName = catalogName;
	}

}
