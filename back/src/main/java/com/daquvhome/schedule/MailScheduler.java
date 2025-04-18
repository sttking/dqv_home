package com.daquvhome.schedule;

import com.daquvhome.common.CommonUtils;
import com.daquvhome.entity.ContactHistoryEntity;
import com.daquvhome.repository.ContactHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class MailScheduler {

    @Value("${contactMail}")
    private String mailTo;

    private final JavaMailSender emailSender;

    private final SpringTemplateEngine templateEngine;

    private final ContactHistoryRepository contactHistoryRepository;

    @Scheduled(cron = "0 */5 * * * *")
    public void mailSendScheduler() throws MessagingException, MailException {

        List<ContactHistoryEntity> list = contactHistoryRepository.findAllByMailSendYnOrderByRegDtTm("N");

        log.info("문의하기 메일 발송 배치 시작 / {} 건", list.size());

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        //수신자 설정
//        String[] toArray = Arrays.asList("leehochun88@daquv.com", "lhc.daquv@gmail.com").toArray(new String[0]);
        helper.setTo(mailTo);
        //참조자 설정
//        helper.setCc("leehochun88@daquv.com");

        for (ContactHistoryEntity entity : list) {

            log.info("발송 대상 : {}", entity.toString());

            //메일 제목 설정
            helper.setSubject(
                    entity.getContactType() + ". (" + entity.getDepartment() + "_" + entity.getName() + ")"
            );

            //템플릿에 전달할 데이터 설정
            Context context = new Context();
            String marketingAgree = "비동의";
            if( !ObjectUtils.isEmpty(entity.getMarketingAgreement()) ) marketingAgree = "동의";

            context.setVariable("contactType", entity.getContactType());
            context.setVariable("name", entity.getName());
            context.setVariable("email", entity.getEmail());
            context.setVariable("contact", CommonUtils.phoneFormat(entity.getContact()));
            context.setVariable("companyName", entity.getCompany());
            context.setVariable("department", entity.getDepartment());
            context.setVariable("marketingAgreement", marketingAgree);
            context.setVariable("regDtTm",  CommonUtils.localDateTimeByFormat(entity.getRegDtTm(), "yyyy-MM-dd HH:mm:ss"));


            //메일 내용 설정 : 템플릿 프로세스
            String html = templateEngine.process("mailTemplate/contact_mail", context);
            helper.setText(html, true);

            //템플릿에 들어가는 이미지 cid로 삽입
//        helper.addInline("image1", new ClassPathResource("static/img/feature_1.png"));

            try{
                //메일 발송
                Thread.sleep(3000);
                emailSender.send(message);
                entity.setMailSendYn("Y");

            } catch (Exception e){
                log.error(e.getMessage(), e.getCause());
                entity.setMailSendYn("N");
            }

        }

        contactHistoryRepository.saveAll(list);
        log.info("문의하기 메일 발송 배치 완료");
    }

}
