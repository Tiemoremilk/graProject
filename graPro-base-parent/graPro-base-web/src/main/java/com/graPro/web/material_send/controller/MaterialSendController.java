package com.graPro.web.material_send.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.graPro.utils.ResultUtils;
import com.graPro.utils.ResultVo;
import com.graPro.web.material_into.entity.ApplyParam;
import com.graPro.web.material_send.entity.MaterialSend;
import com.graPro.web.material_send.entity.MaterialSendParam;
import com.graPro.web.material_send.entity.SendPageParam;
import com.graPro.web.material_send.service.MaterialSendService;
import com.graPro.web.material_send_detail.entity.MaterialSendDetail;
import com.graPro.web.material_send_detail.service.MaterialSendDetailService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materialSend")
public class MaterialSendController {
    @Autowired
    private MaterialSendService materialSendService;
    @Autowired
    private MaterialSendDetailService materialSendDetailService;

    //发放物资保存
    @PostMapping("/sendSave")
    public ResultVo sendSave(@RequestBody MaterialSendParam param){
        materialSendService.sendSave(param);
        return ResultUtils.success("操作成功!");
    }
    //物资发放记录列表
    @GetMapping("/getSendList")
    public ResultVo getSendList(SendPageParam param){
        //构造分页对象
        IPage<MaterialSend> page = new Page<> (param.getCurrentPage(),param.getPageSize());
        //构造查询条件
        QueryWrapper<MaterialSend> query = new QueryWrapper<>();
        if(StringUtils.isNotEmpty(param.getName())){
            query.lambda().like(MaterialSend::getName,param.getName());
        }
        if(StringUtils.isNotEmpty(param.getType())){
            query.lambda().eq(MaterialSend::getType,param.getType());
        }
        if(StringUtils.isNotEmpty(param.getStatus())){
            query.lambda().eq(MaterialSend::getStatus,param.getStatus());
        }
        if(StringUtils.isNotEmpty(param.getProvince())){
            query.lambda().like(MaterialSend::getProvince,param.getProvince());
        }
        query.lambda().orderByAsc(MaterialSend::getStatus);
        IPage<MaterialSend> list = materialSendService.page(page, query);
        //查询详细信息
        if(list.getRecords().size() >0){
            List<MaterialSend> records = list.getRecords();
            for(int i=0;i<records.size();i++){
                //根据记录的id查询详细信息
                QueryWrapper<MaterialSendDetail> queryWrapper = new QueryWrapper<>();
                queryWrapper.lambda().eq(MaterialSendDetail::getSendId,records.get(i).getSendId());
                List<MaterialSendDetail> details = materialSendDetailService.list(queryWrapper);
                records.get(i).setChildren(details);
            }
        }
        return ResultUtils.success("查询成功",list);
    }
    @PostMapping("/apply")
    public ResultVo apply(@RequestBody ApplyParam param){
        materialSendService.apply(param);
        return ResultUtils.success("操作成功!");
    }
}
