package com.graPro.web.sys_user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.graPro.utils.ResultUtils;
import com.graPro.utils.ResultVo;
import com.graPro.web.sys_user.entity.SysUser;
import com.graPro.web.sys_user.entity.UserParam;
import com.graPro.web.sys_user.service.SysUserService;
import org.apache.commons.lang.StringUtils;
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
      sysUser.setCreateTime (new Date ());
        sysUserService.addUser(sysUser);
        return ResultUtils.success ("新增用户成功");
    }
    //编辑用户
    @PutMapping
    public ResultVo editUser(@RequestBody SysUser sysUser){
       sysUser.setUpdateTime (new Date ());
        sysUserService.editUser(sysUser);
        return ResultUtils.success ("编辑用户成功");
    }
    //删除用户
    @DeleteMapping("/{userId}")
    public ResultVo deleteUser(@PathVariable("userId") Long userId){
        sysUserService.deleteUser (userId);
        return ResultUtils.success ("删除用户成功");
    }

    //分页列表查询
    @GetMapping("/userList")
    public ResultVo userlist(UserParam params){
        IPage<SysUser> page = new Page<>(params.getCurrentPage(), params.getPageSize ());
        QueryWrapper<SysUser> query = new QueryWrapper<>();
        if(StringUtils.isNotEmpty (params.getNickName ())){
            query.lambda ().like (SysUser::getNickName,params.getNickName());
        }
        if(StringUtils.isNotEmpty (params.getPhone ())){
            query.lambda ().like (SysUser::getPhone,params.getPhone());
        }
        query.lambda ().orderByDesc(SysUser::getCreateTime);
        IPage<SysUser> list =  sysUserService.page(page,query);
        return ResultUtils.success ("查询成功" , list );

    }
}
