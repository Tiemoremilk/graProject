package com.graPro.web.material_info.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.graPro.web.material_info.entity.MaterialInfo;
import com.graPro.web.material_info.entity.MaterialInfoParam;

public interface MaterialInfoService extends IService<MaterialInfo> {
    IPage<MaterialInfo> getList(MaterialInfoParam params);
}
