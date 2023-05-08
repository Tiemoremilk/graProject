package com.graPro.web.material_into_detail.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graPro.web.material_into_detail.entity.MaterialIntoDetail;
import com.graPro.web.material_into_detail.mapper.MaterialIntoDetailMapper;
import com.graPro.web.material_into_detail.service.MaterialIntoDetailService;
import org.springframework.stereotype.Service;

@Service
public class MaterialIntoDetailServiceImpl  extends ServiceImpl<MaterialIntoDetailMapper, MaterialIntoDetail> implements MaterialIntoDetailService {}
