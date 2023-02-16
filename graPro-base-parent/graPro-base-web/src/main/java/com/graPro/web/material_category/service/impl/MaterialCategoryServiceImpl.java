package com.graPro.web.material_category.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graPro.web.material_category.entity.MaterialCategory;
import com.graPro.web.material_category.mapper.MaterialCategoryMapper;
import com.graPro.web.material_category.service.MaterialCategoryService;
import org.springframework.stereotype.Service;

@Service
public class MaterialCategoryServiceImpl extends ServiceImpl<MaterialCategoryMapper, MaterialCategory> implements MaterialCategoryService {}