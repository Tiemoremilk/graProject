package com.graPro.web.material_info.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.graPro.web.material_info.entity.MaterialInfo;
import com.graPro.web.material_info.entity.MaterialInfoParam;
import org.apache.ibatis.annotations.Param;

public interface MaterialInfoMapper extends BaseMapper<MaterialInfo> {
    IPage<MaterialInfo> getList(IPage<MaterialInfo> page,@Param("param")MaterialInfoParam param);
}
