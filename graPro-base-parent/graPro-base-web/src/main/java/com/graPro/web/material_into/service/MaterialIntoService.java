package com.graPro.web.material_into.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.graPro.web.material_into.entity.ApplyParam;
import com.graPro.web.material_into.entity.MaterialInto;
import com.graPro.web.material_into.entity.MaterialIntoParam;


public interface MaterialIntoService extends IService<MaterialInto> {
    void intoSave(MaterialIntoParam param);
    void apply(ApplyParam param);
}
