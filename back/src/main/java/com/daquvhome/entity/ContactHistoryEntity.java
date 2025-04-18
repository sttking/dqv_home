package com.daquvhome.entity;

import lombok.ToString;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@ToString
@Table(name = "contact_history", schema = "homepage", catalog = "")
public class ContactHistoryEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "seq")
    private int seq;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "email")
    private String email;
    @Basic
    @Column(name = "phone")
    private String contact;
    @Basic
    @Column(name = "company_name")
    private String company;
    @Basic
    @Column(name = "department")
    private String department;
    @Basic
    @Column(name = "privacy_agreement")
    private String privacyAgreement;
    @Basic
    @Column(name = "marketing_agreement")
    private String marketingAgreement;
    @Basic
    @Column(name = "contact_type")
    private String contactType;
    @Basic
    @Column(name = "reg_dt_tm")
    private LocalDateTime regDtTm;
    @Basic
    @Column(name = "mail_send_yn")
    private String mailSendYn;

    public int getSeq() {
        return seq;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String phone) {
        this.contact = phone;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String companyName) {
        this.company = companyName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPrivacyAgreement() {
        return privacyAgreement;
    }

    public void setPrivacyAgreement(String privacyAgreement) {
        this.privacyAgreement = privacyAgreement;
    }

    public String getMarketingAgreement() {
        return marketingAgreement;
    }

    public void setMarketingAgreement(String marketingAgreement) {
        this.marketingAgreement = marketingAgreement;
    }

    public String getContactType() {
        return contactType;
    }

    public void setContactType(String contactType) {
        this.contactType = contactType;
    }

    public LocalDateTime getRegDtTm() {
        return regDtTm;
    }

    public void setRegDtTm(LocalDateTime regDtTm) {
        this.regDtTm = regDtTm;
    }

    public String getMailSendYn() {
        return mailSendYn;
    }

    public void setMailSendYn(String mailSendYn) {
        this.mailSendYn = mailSendYn;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ContactHistoryEntity that = (ContactHistoryEntity) o;
        return seq == that.seq && Objects.equals(name, that.name) && Objects.equals(email, that.email) && Objects.equals(contact, that.contact) && Objects.equals(company, that.company) && Objects.equals(department, that.department) && Objects.equals(privacyAgreement, that.privacyAgreement) && Objects.equals(marketingAgreement, that.marketingAgreement) && Objects.equals(contactType, that.contactType) && Objects.equals(regDtTm, that.regDtTm) && Objects.equals(mailSendYn, that.mailSendYn);
    }

    @Override
    public int hashCode() {
        return Objects.hash(seq, name, email, contact, company, department, privacyAgreement, marketingAgreement, contactType, regDtTm, mailSendYn);
    }
}
