package com.graPro.web.material_send.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.graPro.web.material_into.entity.ApplyParam;
import com.graPro.web.material_send.entity.MaterialSend;
import com.graPro.web.material_send.entity.MaterialSendParam;

public interface MaterialSendService extends IService<MaterialSend> {
    void sendSave(MaterialSendParam param);
    void apply(ApplyParam param);
}
