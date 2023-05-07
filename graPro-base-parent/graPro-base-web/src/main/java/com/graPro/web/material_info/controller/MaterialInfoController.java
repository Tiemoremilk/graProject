package com.graPro.web.material_info.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.graPro.utils.ResultUtils;
import com.graPro.utils.ResultVo;
import com.graPro.web.material_category.entity.MaterialCategory;
import com.graPro.web.material_category.service.MaterialCategoryService;
import com.graPro.web.material_info.entity.MaterialInfo;
import com.graPro.web.material_info.entity.MaterialInfoParam;
import com.graPro.web.material_info.service.MaterialInfoService;
import com.graPro.web.sys_role.entity.SelectType;
import com.graPro.web.sys_user_role.entity.SysUserRole;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/materialInfo")
public class MaterialInfoController {
    @Autowired
    private MaterialInfoService materialInfoService;
    @Autowired
    private MaterialCategoryService materialCategoryService;

    @PostMapping
    public ResultVo addMaterialInfo(@Valid @RequestBody MaterialInfo materialInfo) {
        if (materialInfoService.save (materialInfo)) {
            return ResultUtils.success ("新增物资信息成功");
        }
        return ResultUtils.error ("新增物资信息失败");
    }

    //编辑
    @PutMapping
    public ResultVo editMaterialInfo(@RequestBody MaterialInfo materialInfo) {
        if (materialInfoService.updateById (materialInfo)) {
            return ResultUtils.success ("编辑物资信息成功");
        }
        return ResultUtils.error ("编辑物资信息失败");
    }

    //删除物资信息
    @DeleteMapping("/{infoId}")
    public ResultVo deleteMaterialInfo(@PathVariable("infoId") Long infoId) {

        if (materialInfoService.removeById (infoId)) {
            return ResultUtils.success ("删除物资信息成功");
        }
        return ResultUtils.error ("删除物资信息失败");
    }

    //列表
    @GetMapping("/materialInfoList")
    public ResultVo materialInfoList(MaterialInfoParam params) {
//        IPage<MaterialInfo> page = new Page<> (params.getCurrentPage ( ), params.getPageSize ( ));
//        QueryWrapper<MaterialInfo> query = new QueryWrapper<> ( );
//        if (StringUtils.isNotEmpty (params.getInfoName ( ))) {
//            query.lambda ( ).like (MaterialInfo::getInfoName, params.getInfoName ( ));
//        }
        IPage<MaterialInfo> list = materialInfoService.getList (params);
        return ResultUtils.success ("查询物资信息成功", list);

    }
    //列表
    @GetMapping("/materialInfoSelectList")
    public ResultVo selectList(MaterialInfoParam parm){
        //构造查询条件
        IPage<MaterialInfo> page = new Page<> (parm.getCurrentPage(),parm.getPageSize());
        //构造查询条件
        QueryWrapper<MaterialInfo> query = new QueryWrapper<>();
        if(StringUtils.isNotEmpty(parm.getInfoName())){
            query.lambda().like(MaterialInfo::getInfoName,parm.getInfoName());
        }
        if(parm.getCategoryId() != null){
            query.lambda().eq(MaterialInfo::getCategoryId,parm.getCategoryId());
        }
        IPage<MaterialInfo> list = materialInfoService.page(page, query);
        return ResultUtils.success("查询成功",list);
    }

    //物资分类查询
    @GetMapping("/getListSelect")
    public ResultVo getSelect() {
        List<MaterialCategory> list = materialCategoryService.list ( );
        List<SelectType> materialCategoryList = new ArrayList<> ( );
        Optional.ofNullable (list).orElse (new ArrayList<> ( ))
                .stream ( )
                .forEach (item -> {
                    SelectType type = new SelectType ( );
                    type.setValue (item.getCategoryId ( ));
                    type.setLabel (item.getCategoryName ( ));
                    materialCategoryList.add (type);
                });
        return ResultUtils.success ("查询成功", materialCategoryList);
    }
}
