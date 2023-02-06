package com.graPro.web.sys_role.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

import java.util.Date;

@Data
@TableName("sys_role")//实体类映射的表
public class SysRole {
    @TableId(type = IdType.AUTO)
    private long roleId; //主键 自动递增
    private String roleName; //角色名称
    @TableField(updateStrategy = FieldStrategy.IGNORED)
    private String remark; //备注
    @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

}
