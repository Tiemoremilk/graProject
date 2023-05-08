package com.graPro.web.material_into.entity;

import lombok.Data;

@Data
public class IntoPageParam {
    //当前第几页
    private Long currentPage;
    //每页查询的条数
    private Long pageSize;
    //查询关键字
    private String province;
    private String status;
    private String type;
    private String name;
}
