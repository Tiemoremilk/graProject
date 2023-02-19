package com.graPro.web.material_info.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graPro.web.material_info.entity.MaterialInfo;
import com.graPro.web.material_info.entity.MaterialInfoParam;
import com.graPro.web.material_info.mapper.MaterialInfoMapper;
import com.graPro.web.material_info.service.MaterialInfoService;
import org.springframework.stereotype.Service;

@Service
public class MaterialInfoServiceImpl extends ServiceImpl<MaterialInfoMapper, MaterialInfo> implements MaterialInfoService {
    @Override
    public IPage<MaterialInfo> getList(MaterialInfoParam params) {
        IPage<MaterialInfo> pages = new Page<> (params.getCurrentPage (),params.getPageSize ());
        return this.baseMapper.getList (pages, params);
    }
}
