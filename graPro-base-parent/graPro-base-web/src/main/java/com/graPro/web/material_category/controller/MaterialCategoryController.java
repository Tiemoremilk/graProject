package com.graPro.web.material_category.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.graPro.utils.ResultUtils;
import com.graPro.utils.ResultVo;
import com.graPro.web.material_category.entity.MaterialCategory;
import com.graPro.web.material_category.entity.MaterialCategoryParam;
import com.graPro.web.material_category.service.MaterialCategoryService;
import com.graPro.web.sys_user.entity.SysUser;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/materialCategory")
public class MaterialCategoryController {
    @Autowired
    private MaterialCategoryService materialCategoryService;
    @PostMapping
    public ResultVo addMaterialCategory(@Valid @RequestBody MaterialCategory materialCategory){
        QueryWrapper<MaterialCategory> query = new QueryWrapper<>();
        query.lambda ().eq (MaterialCategory::getCategoryName,materialCategory.getCategoryName());
        MaterialCategory one = materialCategoryService.getOne (query);
        if(one != null){
            return ResultUtils.error ("已存在该类型");
        }
        if(materialCategoryService.save (materialCategory)){
            return ResultUtils.success ("新增物资类型成功");
        }
        return ResultUtils.error ("新增物资类型失败");
    }
    //编辑
    @PutMapping
    public ResultVo editMaterialCategory(@RequestBody MaterialCategory materialCategory){
        QueryWrapper<MaterialCategory> query = new QueryWrapper<>();
        query.lambda ().eq (MaterialCategory::getCategoryName,materialCategory.getCategoryName());
        MaterialCategory one = materialCategoryService.getOne (query);
        if(one != null){
            return ResultUtils.error ("已存在该类型");
        }
        if(materialCategoryService.updateById(materialCategory)){
            return ResultUtils.success ("编辑物资类型成功");
        }
        return ResultUtils.error ("编辑物资类型失败");
    }
    //删除用户
    @DeleteMapping("/{categoryId}")
    public ResultVo deleteMaterialCategory(@PathVariable("categoryId") Long categoryId){
        if(materialCategoryService.removeById (categoryId)){
            return ResultUtils.success ("删除物资类型成功");
        }
        return ResultUtils.error ("删除物资类型失败");
    }
    //列表
    @GetMapping("/materialCategoryList")
    public ResultVo materialCategoryList(MaterialCategoryParam params){
        IPage<MaterialCategory> page = new Page<> (params.getCurrentPage (),params.getPageSize () );
        QueryWrapper<MaterialCategory> query = new QueryWrapper<> (  );
        if(StringUtils.isNotEmpty(params.getCategoryName ())){
           query.lambda ().like (MaterialCategory::getCategoryName,params.getCategoryName());
        }
        query.lambda ().orderByDesc (MaterialCategory::getOrderNum);
        IPage<MaterialCategory> list = materialCategoryService.page (page,query);
        return ResultUtils.success ("查询物资类型成功", list);

    }
}
