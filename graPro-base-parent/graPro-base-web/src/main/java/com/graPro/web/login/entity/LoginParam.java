package com.graPro.web.login.entity;

import lombok.Data;

@Data
public class LoginParam {
    private String username;
    private String password;
    private String code;
}
