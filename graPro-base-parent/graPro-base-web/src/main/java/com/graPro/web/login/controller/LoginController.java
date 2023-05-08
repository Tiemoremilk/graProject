package com.graPro.web.login.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.graPro.config.jwt.JwtUtils;
import com.graPro.utils.ResultUtils;
import com.graPro.utils.ResultVo;
import com.graPro.web.login.entity.LoginParam;
import com.graPro.web.login.entity.LoginResult;
import com.graPro.web.sys_user.entity.SysUser;
import com.graPro.web.sys_user.service.SysUserService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    @Autowired
    private DefaultKaptcha defaultKaptcha;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private SysUserService sysUserService;

    @PostMapping("/image")
    public ResultVo imageCode(HttpServletRequest request) throws IOException {
        //获取验证码字符
        String text = defaultKaptcha.createText();
        //存储验证码到session
        HttpSession session = request.getSession();
        session.setAttribute("code", text);
        //生成图片
        BufferedImage bufferedImage = defaultKaptcha.createImage(text);
        ByteArrayOutputStream outputStream = null;
        try {
            outputStream = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "jpg", outputStream);
            BASE64Encoder encoder = new BASE64Encoder();
            String base64 = encoder.encode(outputStream.toByteArray());
            String captchaBase64 = "data:image/jpeg;base64," + base64.replaceAll("\r\n", "");
            ResultVo result = new ResultVo("生成成功", 200, captchaBase64);
            return result;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (outputStream != null) {
                    outputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    @PostMapping("/login")
    public ResultVo login(HttpServletRequest request, @RequestBody LoginParam param){
        //获取前端传递的验证码
        String code = param.getCode();
        //从session里面获取验证码
        HttpSession session = request.getSession();
        String scode =  (String)session.getAttribute("code");
        //判断验证码是否正确
        if(StringUtils.isEmpty(scode)){
            return ResultUtils.error("验证码过期!");
        }
        if(!scode.equals(code)){
            return ResultUtils.error("验证码错误!");
        }
        //查询用户信息
        QueryWrapper<SysUser> query = new QueryWrapper<> ();
        query.lambda().eq(SysUser::getUsername,param.getUsername()).eq(SysUser::getPassword,param.getPassword());
        SysUser one = sysUserService.getOne(query);
        if(one == null){
            return ResultUtils.error("用户名或密码错误!");
        }
        //生成token
        Map<String,String> map = new HashMap<> ();
        map.put("userId",one.getUserId().toString());
        String token = jwtUtils.generateToken(map);
        //返回给前端
        LoginResult result = new LoginResult();
        result.setUserId(one.getUserId());
        result.setToken(token);
        return ResultUtils.success("登录成功",result);
    }
}
