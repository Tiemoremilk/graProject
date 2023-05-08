package com.graPro.web.material_into.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.graPro.utils.ResultUtils;
import com.graPro.utils.ResultVo;
import com.graPro.web.material_into.entity.*;
import com.graPro.web.material_into.entity.MaterialIntoParam;
import com.graPro.web.material_into.service.MaterialIntoService;
import com.graPro.web.material_into_detail.entity.MaterialIntoDetail;
import com.graPro.web.material_into_detail.service.MaterialIntoDetailService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materialInto")
public class MaterialIntoController {
    @Autowired
    private MaterialIntoService materialIntoService;
    @Autowired
    private MaterialIntoDetailService materialIntoDetailService;

    //入库提交
    @PostMapping("/intoSave")
    public ResultVo intoSave(@RequestBody MaterialIntoParam param){
        materialIntoService.intoSave(param);
        return ResultUtils.success("提交成功!");
    }
    //入库记录
    @GetMapping("/getIntoList")
    public ResultVo getIntoList(IntoPageParam parm){
        //构造分页对象
        IPage<MaterialInto> page = new Page<> (parm.getCurrentPage(),parm.getPageSize());
        //构造查询条件
        QueryWrapper<MaterialInto> query = new QueryWrapper<>();
        if(StringUtils.isNotEmpty(parm.getProvince())){
            query.lambda().like(MaterialInto::getProvince,parm.getProvince());
        }
        if(StringUtils.isNotEmpty(parm.getName())){
            query.lambda().like(MaterialInto::getName,parm.getName());
        }
        if(StringUtils.isNotEmpty(parm.getStatus())){
            query.lambda().eq(MaterialInto::getStatus,parm.getStatus());
        }
        if(StringUtils.isNotEmpty(parm.getType())){
            query.lambda().eq(MaterialInto::getType,parm.getType());
        }
        query.lambda().orderByDesc(MaterialInto::getCreateTime);
        IPage<MaterialInto> list = materialIntoService.page(page, query);
        //查询物资详情
        if(list.getRecords().size() >0){
            List<MaterialInto> records = list.getRecords();
            for(int i = 0;i<records.size();i++){
                QueryWrapper<MaterialIntoDetail> detailQueryWrapper = new QueryWrapper<>();
                detailQueryWrapper.lambda().eq(MaterialIntoDetail::getIntoId,records.get(i).getIntoId());
                List<MaterialIntoDetail> details = materialIntoDetailService.list(detailQueryWrapper);
                records.get(i).setChildren(details);
            }
        }
        return ResultUtils.success("查询成功",list);
    }
    //审核
    @PostMapping("/apply")
    public ResultVo apply(@RequestBody ApplyParam param){
        materialIntoService.apply(param);
        return ResultUtils.success("操作成功");
    }
}
