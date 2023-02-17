package com.graPro.web.material_info.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graPro.web.material_info.entity.MaterialInfo;
import com.graPro.web.material_info.mapper.MaterialInfoMapper;
import com.graPro.web.material_info.service.MaterialInfoService;
import org.springframework.stereotype.Service;

@Service
public class MaterialInfoServiceImpl extends ServiceImpl<MaterialInfoMapper, MaterialInfo> implements MaterialInfoService {}
