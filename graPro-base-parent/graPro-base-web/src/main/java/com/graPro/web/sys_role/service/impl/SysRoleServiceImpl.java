package com.graPro.web.sys_role.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graPro.web.sys_role.entity.RoleParam;
import com.graPro.web.sys_role.entity.SysRole;
import com.graPro.web.sys_role.mapper.SysRoleMapper;
import com.graPro.web.sys_role.service.SysRoleService;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

@Service
public class SysRoleServiceImpl extends ServiceImpl<SysRoleMapper, SysRole> implements SysRoleService {

    @Override
    public IPage<SysRole> searchRole(RoleParam params) {
        //分页
        IPage<SysRole> page = new Page<> ( params.getCurrentPage (),params.getPageSize () );
        //查询条件
        QueryWrapper<SysRole> query = new QueryWrapper<>();
        if(StringUtils.isNotEmpty(params.getRoleName ())){
            query.lambda ().like (SysRole::getRoleName,params.getRoleName ());

        }
        return this.baseMapper.selectPage (page,query);
    }
}
