package com.graPro.web.sys_role.entity;

import lombok.Data;

@Data
public class RoleParam {
    private Long currentPage;
    private Long pageSize;
    private String roleName;
}