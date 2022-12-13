package com.graPro.web.sys_role.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.graPro.web.sys_role.entity.RoleParm;
import com.graPro.web.sys_role.entity.SysRole;

public interface SysRoleService extends IService<SysRole> {
    IPage<SysRole> searchRole(RoleParm parm);
}
