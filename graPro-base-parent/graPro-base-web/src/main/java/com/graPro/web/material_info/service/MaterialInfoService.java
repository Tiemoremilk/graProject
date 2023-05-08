package com.graPro.web.material_info.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.graPro.web.material_info.entity.MaterialInfo;
import com.graPro.web.material_info.entity.MaterialInfoParam;
import com.graPro.web.material_into.entity.InfoUpdateParam;

import java.util.List;

public interface MaterialInfoService extends IService<MaterialInfo> {
    IPage<MaterialInfo> getList(MaterialInfoParam params);
    void updateStore(List<InfoUpdateParam> list);
    void sendUpdateStore(List<InfoUpdateParam> param);
}
