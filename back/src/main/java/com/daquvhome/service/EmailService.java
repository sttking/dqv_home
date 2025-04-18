package com.daquvhome.service;

import com.daquvhome.Dto.MailDto;
import com.daquvhome.common.CommonUtils;
import com.daquvhome.entity.ContactHistoryEntity;
import com.daquvhome.repository.ContactHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${contactMail}")
    private String mailTo;

    private final JavaMailSender emailSender;

    private final SpringTemplateEngine templateEngine;

    private final Environment environment;

    private final ContactHistoryRepository contactHistoryRepository;

    public boolean sendSimpleMessage(MailDto mailDto) {

        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom(mailDto.getAddress());
//        message.setTo("askavatardaquv@gmail.com");
        message.setTo(mailTo);
        message.setSubject(mailDto.getCompany() + " 사용 문의.");

        StringBuilder builder = new StringBuilder();

        builder.append("회사명 : \t" + mailDto.getCompany())
                .append("문의유형 : \t" + mailDto.getContactType());
//                .append("\n메일주소 : \t" + mailDto.getAddress())
//                .append("\n문의내용 : \t" + mailDto.getContent());
        message.setText(builder.toString());

        try {
//            emailSender.send(message);
            log.info("profile : {} {} \n메일 발송 완료 : {}", environment.getActiveProfiles(), mailTo, builder.toString());
        } catch (MailException e){
            e.printStackTrace();
            log.error("메일발송 에러 발생  \n{}", e.getMessage());
            return false;
        }

        return true;
    }

    // 타임리프 템플릿으로 메일 보내기
    @Async
    public void sendTemplateMessage(MailDto mailDto) throws MessagingException {

        log.info("문의하기 내역 저장 {} ", mailDto);

        ContactHistoryEntity contactHistory = new ContactHistoryEntity();
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        //수신자 설정
//        String[] toArray = Arrays.asList("leehochun88@daquv.com", "lhc.daquv@gmail.com").toArray(new String[0]);
        helper.setTo(mailTo);
        //참조자 설정
//        helper.setCc("leehochun88@daquv.com");

        //메일 제목 설정
        helper.setSubject(
                mailDto.getContactType() + ". (" + mailDto.getCompany() + "_" + mailDto.getName() + ")"
        );

        //템플릿에 전달할 데이터 설정
        Context context = new Context();

        // 문의 기록 저장
        if(ObjectUtils.isEmpty(mailDto.getMarketingAgreement())){
            mailDto.setMarketingAgreement("N");
        }

        String marketingAgree = "비동의";
        if( mailDto.getMarketingAgreement().equals("Y") ) marketingAgree = "동의";

        mailDto.setRegDtTm(LocalDateTime.from(ZonedDateTime.now(ZoneId.of("Asia/Seoul"))));

        context.setVariable("contactType", mailDto.getContactType());
        context.setVariable("name", mailDto.getName());
        context.setVariable("email", mailDto.getEmail());
        context.setVariable("contact", CommonUtils.phoneFormat(mailDto.getContact()));
        context.setVariable("companyName", mailDto.getCompany());
        context.setVariable("department", mailDto.getDepartment());
        context.setVariable("marketingAgreement", marketingAgree);
        context.setVariable("regDtTm", CommonUtils.localDateTimeByFormat(mailDto.getRegDtTm(), "yyyy-MM-dd HH:mm:ss"));

        //메일 내용 설정 : 템플릿 프로세스
        String html = templateEngine.process("mailTemplate/contact_mail", context);
        helper.setText(html, true);

        //템플릿에 들어가는 이미지 cid로 삽입
//        helper.addInline("image1", new ClassPathResource("static/img/feature_1.png"));

        try{
            //메일 발송
            Thread.sleep(3000);
            emailSender.send(message);
            contactHistory.setMailSendYn("Y");

        } catch (Exception e){
            log.error(e.getMessage(), e.getCause());
            contactHistory.setMailSendYn("N");
        }

        log.info("문의하기 메일 발송 완료");

        BeanUtils.copyProperties(mailDto, contactHistory);
        saveContactHistory(contactHistory);
    }

    public void saveContactHistory(ContactHistoryEntity contactHistory){
        contactHistoryRepository.save(contactHistory);
        log.info("문의하기 DB 저장 완료");
    }

}
