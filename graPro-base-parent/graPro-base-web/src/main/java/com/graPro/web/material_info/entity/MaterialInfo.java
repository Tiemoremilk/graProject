package com.graPro.web.material_info.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@Data
@TableName("material_info")
public class MaterialInfo {
    @TableId(type = IdType.AUTO)
    private Long infoId;
    private Long categoryId;
    private String infoName;
    private String image;
    private String specs;
    private String unit;
    private String infoDesc;
    private Integer store;
    @TableField(exist = false)
    private String categoryName;
}

