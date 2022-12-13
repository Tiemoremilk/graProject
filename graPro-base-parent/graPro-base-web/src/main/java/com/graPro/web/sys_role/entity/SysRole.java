package com.graPro.web.sys_role.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName("sys_role")//实体类映射的表
public class SysRole {
    @TableId(type = IdType.AUTO)
    private long roleId; //主键 自动递增
    private String roleName; //角色名称
    private String remark; //备注
    private Date createTime;
    private Date updateTime;

}
