package com.graPro.web.material_info.entity;

import lombok.Data;

@Data
public class MaterialInfoParam {
    //当前第几页
    private Long currentPage;
    //每页查询的条数
    private Long pageSize;
    //查询关键字
    private String infoName;
    //分类
    private Long categoryId;
}
