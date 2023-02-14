package com.graPro.web.sys_menu.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graPro.web.sys_menu.entity.SysMenu;
import com.graPro.web.sys_menu.entity.menuTree;
import com.graPro.web.sys_menu.mapper.SysMenuMapper;
import com.graPro.web.sys_menu.service.SysMenuService;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class SysMenuServicelmpl extends ServiceImpl<SysMenuMapper, SysMenu> implements SysMenuService {
    @Override
    public List<SysMenu> getParent() {
        String[] type = {"0","1"};
        List<String> strings =Arrays.asList (type);
        QueryWrapper<SysMenu> query = new QueryWrapper<> ();
        query.lambda ().in (SysMenu::getType,strings);
        List<SysMenu> menuList = this.baseMapper.selectList (query);
        //无数据默认
        SysMenu menu = new SysMenu ();
        menu.setTitle("顶级菜单");
        menu.setParentId (-1L);
        menu.setMenuId (0L);
        menuList.add (menu);
        //装配
        List<SysMenu> tree = menuTree.menuTree (menuList, -1L );

        return tree;
    }
}
