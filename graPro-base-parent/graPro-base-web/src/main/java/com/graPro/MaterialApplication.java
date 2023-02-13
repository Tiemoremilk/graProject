package com.graPro;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class MaterialApplication {
//    //设置时区
//    TimeZone.setDefault(TimeZone.getTimeZone("GMT+8"))
    public static void main(String[] args){
        SpringApplication.run (MaterialApplication.class,args);
    }
}
