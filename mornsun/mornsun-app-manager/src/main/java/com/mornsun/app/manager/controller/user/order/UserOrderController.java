package com.mornsun.app.manager.controller.user.order;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.common.orm.mybatis.controller.BasePageHelperApiServiceController;
import com.mornsun.app.core.service.user.order.IUserOrderService;
import com.mornsun.jsw.api.vo.user.order.UserOrderVo;

/**
 * 用户订单Controller
 *
 * @author: HuiJunLuo
 * @date:2015年12月31日
 * @Copyright:Copyright (c) xxxx有限公司 2014 ~ 2015 版权所有
 */
@Controller
@RequestMapping("/user/order")
public class UserOrderController extends BasePageHelperApiServiceController<UserOrderVo, IUserOrderService> {

}
