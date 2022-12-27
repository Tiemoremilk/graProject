package com.graPro;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

import java.util.TimeZone;

@SpringBootApplication
@EnableCaching
public class MaterialApplicatio {
//    //设置时区
//    TimeZone.setDefault(TimeZone.getTimeZone("GMT+8"))
    public static void main(String[] args){
        SpringApplication.run (MaterialApplicatio.class,args);
    }
}
