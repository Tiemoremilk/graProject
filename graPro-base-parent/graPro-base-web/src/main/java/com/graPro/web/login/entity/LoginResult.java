package com.graPro.web.login.entity;

import lombok.Data;

@Data
public class LoginResult {
    private long userId;
    private String token;
}
