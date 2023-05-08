package com.graPro.web.material_into.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graPro.web.material_info.service.MaterialInfoService;
import com.graPro.web.material_into.entity.*;
import com.graPro.web.material_into.entity.MaterialIntoParam;
import com.graPro.web.material_into.mapper.MaterialIntoMapper;
import com.graPro.web.material_into.service.MaterialIntoService;
import com.graPro.web.material_into_detail.entity.MaterialIntoDetail;
import com.graPro.web.material_into_detail.service.MaterialIntoDetailService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MaterialIntoServiceImpl extends ServiceImpl<MaterialIntoMapper,MaterialInto> implements MaterialIntoService{
    @Autowired
    private MaterialIntoDetailService materialIntoDetailService;
    @Autowired
    private MaterialInfoService materialInfoService;

    @Transactional
    @Override
    public void intoSave(MaterialIntoParam param) {
        MaterialInto into = new MaterialInto();
        BeanUtils.copyProperties(param,into);
        into.setCreateTime(new Date ());
        int insert = this.baseMapper.insert(into);
        if(insert > 0){
            //设置记录表id
            param.getInfos().forEach(item -> item.setIntoId(into.getIntoId()));
            materialIntoDetailService.saveBatch(param.getInfos());
        }
    }

    @Override
    @Transactional
    public void apply(ApplyParam param) {
        if(param.getStatus().equals("1")){ //通过审核
            //更新审核状态
            MaterialInto into = new MaterialInto();
            into.setIntoId(param.getIntoId());
            into.setStatus("1");
            int i = this.baseMapper.updateById(into);
            //更新物资信息的库存数量
            if(i>0){
                //查询物资数量
                QueryWrapper<MaterialIntoDetail> queryWrapper = new QueryWrapper<> ();
                queryWrapper.lambda().eq(MaterialIntoDetail::getIntoId,param.getIntoId());
                List<MaterialIntoDetail> list = materialIntoDetailService.list(queryWrapper);
                List<InfoUpdateParam> upList = new ArrayList<> ();
                for (int j=0;j<list.size();j++){
                    InfoUpdateParam UpdateParam= new InfoUpdateParam();
                    UpdateParam.setInfoId(list.get(j).getInfoId());
                    UpdateParam.setStore(list.get(j).getNum());
                    upList.add(UpdateParam);
                }
                materialInfoService.updateStore(upList);
            }
        }else if(param.getStatus().equals("2")){//拒绝
            //更新审核状态
            MaterialInto into = new MaterialInto();
            into.setIntoId(param.getIntoId());
            into.setStatus("2");
            this.baseMapper.updateById(into);
        }
    }
}
