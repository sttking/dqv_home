package com.daquvhome.controller;

import com.daquvhome.Dto.MailDto;
import com.daquvhome.common.ApiResponse;
import com.daquvhome.service.EmailService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/api/v1")
public class MailApiController {

    private final EmailService emailService;

    public MailApiController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/mail/send")
    public ApiResponse<Boolean> sendContactMail(@RequestBody MailDto mailDto) {
        try {
            emailService.sendTemplateMessage(mailDto);
            return ApiResponse.success("메일이 성공적으로 전송되었습니다.", true);
        } catch (MessagingException e) {
            return ApiResponse.error("메일 전송 중 오류가 발생했습니다.");
        }
    }
}