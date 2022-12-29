package com.graPro.web.sys_user.entity;

import lombok.Data;

@Data
public class UserParam {
    private Long currentPage;
    private Long pageSize;
    private String nickName;
    private String phone;
}
