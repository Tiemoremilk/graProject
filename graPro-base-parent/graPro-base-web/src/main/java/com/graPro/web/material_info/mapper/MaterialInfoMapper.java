package com.graPro.web.material_info.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.graPro.web.material_info.entity.MaterialInfo;
import com.graPro.web.material_info.entity.MaterialInfoParam;
import com.graPro.web.material_into.entity.InfoUpdateParam;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MaterialInfoMapper extends BaseMapper<MaterialInfo> {
    IPage<MaterialInfo> getList(IPage<MaterialInfo> page,@Param("param")MaterialInfoParam param);
    void updateStore(@Param("list") List<InfoUpdateParam> list);
    void sendUpdateStore(@Param("list") List<InfoUpdateParam> list);
}
