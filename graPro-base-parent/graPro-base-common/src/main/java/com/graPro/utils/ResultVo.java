package com.graPro.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data//自动生成get/set方法
@AllArgsConstructor//生成所有参数的构造方法
public class ResultVo<T> {
    private String msg;
    private int code;
    private T data;
}