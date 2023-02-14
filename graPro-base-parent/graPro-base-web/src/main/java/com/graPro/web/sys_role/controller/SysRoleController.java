package com.graPro.web.sys_role.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.graPro.utils.ResultUtils;
import com.graPro.utils.ResultVo;
import com.graPro.web.sys_role.entity.RoleParam;
import com.graPro.web.sys_role.entity.SelectType;
import com.graPro.web.sys_role.entity.SysRole;
import com.graPro.web.sys_role.service.SysRoleService;
import com.graPro.web.sys_user.entity.SysUser;
import com.graPro.web.sys_user_role.entity.SysUserRole;
import com.graPro.web.sys_user_role.service.SysUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/role")//识别请求处理
public class SysRoleController {
    @Autowired
    private SysRoleService sysRoleService;
    @Autowired
    private SysUserRoleService sysUserRoleService;
    //新增
    @PostMapping
    public ResultVo addRole(@RequestBody SysRole sysRole){
        sysRole.setCreateTime (new Date ());
        if(sysRoleService.save (sysRole)){
            return ResultUtils.success ("新增角色成功");
        }
        return ResultUtils.error ("新增角色失败");
    }
    //编辑
    @PutMapping
    public ResultVo editRole(@RequestBody SysRole sysRole){
        sysRole.setUpdateTime (new Date ());
//        if(sysRole.getRemark ().equals ("")){
//            sysRole.setRemark(null);
//        }
        if(sysRoleService.updateById(sysRole)){
            return ResultUtils.success ("编辑角色成功");
        }
        return ResultUtils.error ("编辑角色失败");
    }
    //删除
    @DeleteMapping("/{roleId}")
    public ResultVo deleteRole(@PathVariable("roleId") long roleId ){
        QueryWrapper<SysUserRole> query = new QueryWrapper<> ();
        query.lambda ().eq (SysUserRole::getRoleId,roleId);
        SysUserRole one = sysUserRoleService.getOne(query);
        if(one != null){
            return ResultUtils.error ("该角色已被引用无法删除");
        }
        if(sysRoleService.removeById (roleId)){
            return ResultUtils.success ("删除角色成功");
        }
        return ResultUtils.error ("删除角色失败");
    }
    //分页查询
    @GetMapping("/roleList")
    public ResultVo searchRole(RoleParam params){

        IPage<SysRole> list = sysRoleService.searchRole (params);
        return ResultUtils.success ("查询成功",list);
    }
    //获取角色下拉数据
    @GetMapping("/getListSelect")
    public ResultVo getListSelect() {
        List<SysRole> list = sysRoleService.list();
        List<SelectType> roleList = new ArrayList<> ();
        Optional.ofNullable(list).orElse(new ArrayList<>())
                .stream()
                .forEach(item -> {
                    SelectType type = new SelectType();
                    type.setValue(item.getRoleId());
                    type.setLabel(item.getRoleName());
                    roleList.add(type);
                });
        return ResultUtils.success("查询成功", roleList);
    }
}
