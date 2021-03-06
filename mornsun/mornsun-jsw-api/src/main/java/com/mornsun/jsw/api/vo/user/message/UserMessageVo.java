package com.mornsun.jsw.api.vo.user.message;

import com.mornsun.jsw.api.model.user.message.UserMessageModel;
import com.mornsun.jsw.api.vo.user.base.UserVo;

/**
 * 用户消息Vo
 *
 * @author: HuiJunLuo
 * @date:2015年12月31日
 * @Copyright:Copyright (c) xxxx有限公司 2014 ~ 2015 版权所有
 */
public class UserMessageVo extends UserMessageModel {

    private static final long serialVersionUID = 1L;

    private UserVo userVo;

    public UserVo getUserVo() {
        return userVo;
    }

    public void setUserVo(UserVo userVo) {
        this.userVo = userVo;
    }

}
