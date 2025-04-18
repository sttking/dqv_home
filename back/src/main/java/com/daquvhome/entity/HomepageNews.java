package com.daquvhome.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table
@Getter
public class HomepageNews {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // auto created ID
    private Long newsId;

    @Column(nullable = false)
    private String newsWriter;

    @Column(nullable = false)
    private String newsTitle;

    @Column(nullable = false)
    private String newsUrl;

    @Column(nullable = false)
    private String regDt;

    @Column(nullable = false)
    private String hashTags;

    @Column(nullable = false)
    private String imgUrl;

    @Column(nullable = false)
    private String newsType;

    @Column(nullable = false)
    private String useYn;

    @Column(nullable = true)
    private String newsBody;
}
