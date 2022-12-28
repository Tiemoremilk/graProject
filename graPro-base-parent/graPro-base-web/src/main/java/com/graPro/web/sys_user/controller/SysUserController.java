package com.graPro.web.sys_user.controller;

import com.graPro.utils.ResultUtils;
import com.graPro.utils.ResultVo;
import com.graPro.web.sys_role.entity.SysRole;
import com.graPro.web.sys_user.entity.SysUser;
import com.graPro.web.sys_user.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/user")
public class SysUserController {
    @Autowired
    private SysUserService sysUserService;
    //新增用户
    @PostMapping
    public ResultVo addUser(@RequestBody SysUser sysUser){
//      sysUser.setCreateTime (new Date ());
        sysUserService.addUser(sysUser);
        return ResultUtils.success ("新增用户成功");

    }

    //编辑
    @PutMapping
    public ResultVo editUser(@RequestBody SysUser sysUser){
//       sysUser.setUpdateTime (new Date ());
        sysUserService.editUser(sysUser);
        return ResultUtils.success ("编辑用户成功");
    }
}
