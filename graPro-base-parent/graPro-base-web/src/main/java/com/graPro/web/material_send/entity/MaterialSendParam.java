package com.graPro.web.material_send.entity;

import com.graPro.web.material_send_detail.entity.MaterialSendDetail;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class MaterialSendParam {
    private String province;
    private String detailSource;
    private String name;
    private String phone;
    private String email;
    private String type;
    private String doType;
    private List<MaterialSendDetail> infos = new ArrayList<> ();
}
