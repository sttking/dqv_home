package com.daquvhome.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
public class MailDto {
    @JsonProperty(value = "contact_type")
    private String contactType;
    private String name;
    private String email;
    private String contact;
    private String company;
    private String department;
    @JsonProperty(value = "privacy_agreement")
    private String privacyAgreement;
    @JsonProperty(value = "marketing_agreement")
    private String marketingAgreement;

    private LocalDateTime regDtTm;

}
