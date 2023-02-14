package com.graPro.web.sys_menu.controller;

import com.graPro.utils.ResultUtils;
import com.graPro.utils.ResultVo;
import com.graPro.web.sys_menu.entity.SysMenu;
import com.graPro.web.sys_menu.entity.menuTree;
import com.graPro.web.sys_menu.service.SysMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class SysMenuController {
    @Autowired
    private SysMenuService sysMenuService;
    @PostMapping
    public ResultVo addMenu(@RequestBody SysMenu sysMenu){
        sysMenu.setCreateTime (new Date ());
        if(sysMenuService.save (sysMenu)){
            return ResultUtils.success ("新增角色成功");
        }
        return ResultUtils.error ("新增角色失败");
    }
    //编辑
    @PutMapping
    public ResultVo editMenu(@RequestBody SysMenu sysMenu){
        sysMenu.setUpdateTime (new Date ());
        if(sysMenuService.updateById(sysMenu)){
            return ResultUtils.success ("编辑菜单成功");
        }
        return ResultUtils.error ("编辑菜单失败");
    }
    //删除用户
    @DeleteMapping("/{menuId}")
    public ResultVo deleteUser(@PathVariable("menuId") Long menuId){
        if(sysMenuService.removeById (menuId)){
            return ResultUtils.success ("删除菜单成功");
        }
        return ResultUtils.error ("删除菜单失败");
    }
    //列表
    @GetMapping("/menuList")
    public ResultVo menuList(){
        List<SysMenu> list = sysMenuService.list ();
        List<SysMenu> menuList = menuTree.menuTree (list,0L);
        return  ResultUtils.success("查询成功",menuList);
    }
    //上级
    @GetMapping("/menuParent")
    public ResultVo menuParent(){
        List<SysMenu> list = sysMenuService.getParent ();
        return  ResultUtils.success("查询成功",list);
    }

}
