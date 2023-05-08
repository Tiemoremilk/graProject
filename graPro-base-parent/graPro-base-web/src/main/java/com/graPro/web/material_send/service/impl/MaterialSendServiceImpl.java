package com.graPro.web.material_send.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graPro.web.material_send.entity.MaterialSend;
import com.graPro.web.material_send.mapper.MaterialSendMapper;
import com.graPro.web.material_send.service.MaterialSendService;
import org.springframework.stereotype.Service;

@Service
public class MaterialSendServiceImpl extends ServiceImpl<MaterialSendMapper, MaterialSend> implements MaterialSendService {
}
