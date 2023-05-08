package com.graPro.web.material_into.entity;

import lombok.Data;

@Data
public class ApplyParam {
    //入库记录id
    private Long intoId;
    //审核状态
    private String status;
}
