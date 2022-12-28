package com.graPro.web.sys_user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.graPro.web.sys_user.entity.SysUser;

public interface SysUserService extends IService<SysUser> {
   void addUser(SysUser sysUser);
   void editUser(SysUser sysUser);
   void deleteUser(SysUser sysUser);

}
