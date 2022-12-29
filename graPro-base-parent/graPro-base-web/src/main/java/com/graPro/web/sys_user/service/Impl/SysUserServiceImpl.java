package com.graPro.web.sys_user.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graPro.web.sys_user.entity.SysUser;
import com.graPro.web.sys_user.mapper.SysUserMapper;
import com.graPro.web.sys_user.service.SysUserService;
import com.graPro.web.sys_user_role.entity.SysUserRole;
import com.graPro.web.sys_user_role.service.SysUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {
    @Autowired
    private SysUserRoleService sysUserRoleService;
    @Transactional
    @Override
    public void addUser(SysUser sysUser) {
      if(this.baseMapper.insert(sysUser) > 0){
          SysUserRole sysUserRole = new SysUserRole ();
          sysUserRole.setUserId (sysUser.getUserId ( ));
          sysUserRole.setRoleId (sysUser.getRoleId ());
          sysUserRoleService.save(sysUserRole);
      }
    }
    @Transactional
    @Override
    public void editUser(SysUser sysUser) {
        if(this.baseMapper.updateById(sysUser) > 0){
            //先删除
            QueryWrapper<SysUserRole> query = new QueryWrapper<>();
            query.lambda().eq(SysUserRole::getUserId,sysUser.getUserId ());
            sysUserRoleService.remove(query);
            //新增
            SysUserRole sysUserRole = new SysUserRole ();
            sysUserRole.setUserId (sysUser.getUserId ());
            sysUserRole.setRoleId (sysUser.getRoleId ());
            sysUserRoleService.save(sysUserRole);
        }

    }
    @Transactional
    @Override
    public void deleteUser(Long userId) {
            if(this.baseMapper.deleteById (userId) > 0){
                QueryWrapper<SysUserRole> query = new QueryWrapper<>();
                query.lambda ().eq (SysUserRole::getUserId,userId);
                sysUserRoleService.remove(query);
            }
    }
}
