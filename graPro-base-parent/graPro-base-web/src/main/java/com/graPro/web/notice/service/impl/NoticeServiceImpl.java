package com.graPro.web.notice.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.graPro.web.notice.entity.Notice;
import com.graPro.web.notice.mapper.NoticeMapper;
import com.graPro.web.notice.service.NoticeService;
import org.springframework.stereotype.Service;

@Service
public class NoticeServiceImpl extends ServiceImpl<NoticeMapper, Notice> implements NoticeService {
}
