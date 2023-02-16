package com.graPro.web.material_category.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@TableName("material_category")
public class MaterialCategory {
    @TableId(type = IdType.AUTO)
    private Long categoryId;
    @NotBlank(message ="分类名称为空")
    private String categoryName;
    private Integer orderNum;
}