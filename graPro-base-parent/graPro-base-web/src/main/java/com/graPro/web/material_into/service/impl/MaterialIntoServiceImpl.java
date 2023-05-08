package com.graPro.web.material_into.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graPro.web.material_into.entity.MaterialInto;
import com.graPro.web.material_into.mapper.MaterialIntoMapper;
import com.graPro.web.material_into.service.MaterialIntoService;
import org.springframework.stereotype.Service;

@Service
public class MaterialIntoServiceImpl extends ServiceImpl<MaterialIntoMapper,MaterialInto> implements MaterialIntoService{
}
