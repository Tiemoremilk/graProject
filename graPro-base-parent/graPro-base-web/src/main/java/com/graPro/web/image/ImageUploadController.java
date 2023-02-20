package com.graPro.web.image;


import com.graPro.utils.ResultUtils;
import com.graPro.utils.ResultVo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload/")
public class ImageUploadController {
    //图片上传的路径
    @Value("${web.uploadpath}")
    private String webUploadpath;

    @RequestMapping("/uploadImage")
    @ResponseBody
    public ResultVo uploadImage(@RequestParam("file") MultipartFile file){
        String Url = null;
        //获取名字
        String fileName = file.getOriginalFilename();
        //扩展名  aa.png
        String fileExtenionName = fileName.substring(fileName.indexOf("."));
        //生成新的名称
        String newName = UUID.randomUUID().toString() + fileExtenionName;
        String path = webUploadpath;
        File fileDir = new File(path);
        if(!fileDir.exists()){
            //设置权限（新的文件可写）
            fileDir.setWritable(true);
            fileDir.mkdirs();
        }
        File targetFile = new File(path,newName);
        try{
            file.transferTo(targetFile);
            Url = "/" + targetFile.getName();
        }catch (Exception e){
            return  null;
        }
        return ResultUtils.success("上传成功","/桌面/graduationProject/images" + Url);
//        return ResultUtils.success("上传成功","/www/wwwroot/images" + Url);
    }

    @RequestMapping("/deleteImage")
    @ResponseBody
    public ResultVo deleteImage(@RequestParam("imageName") String imageName) {
        String path = webUploadpath + "/" + imageName;
        File file = new File(path);
        if (file.exists()) {
            if (file.delete()) {
                return ResultUtils.success("删除成功");
            } else {
                return ResultUtils.error("删除失败");
            }
        } else {
            return ResultUtils.error("文件不存在");
        }
    }
}
