package com.graPro.web.sys_menu.entity;

import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class menuTree {
    public static List<SysMenu> menuTree(List<SysMenu> menuList,Long pid) {
        List<SysMenu> list = new ArrayList<>();
                Optional.ofNullable (menuList).orElse(new ArrayList<> ())
                        .stream ()//使用stream() 将源数据—包括集合、数组等转换成流
                        .filter (item -> item != null && item.getParentId ().equals (pid))
                        .forEach (item -> {
                            SysMenu menu = new SysMenu ();
                            BeanUtils.copyProperties (item,menu);
                            List<SysMenu> children = menuTree(menuList,item.getMenuId ());
                            menu.setChildren (children);
                            list.add(menu);
                        });
                return list;
    }
}
