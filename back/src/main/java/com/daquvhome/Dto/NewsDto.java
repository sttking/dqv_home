package com.daquvhome.Dto;

import com.daquvhome.entity.HomepageNews;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NewsDto {

    private Long newsId;
    private String newsWriter;
    private String newsTitle;
    private String newsUrl;
    private String newsType;
    private String regDt;

    private int size;
    private int page;

    public NewsDto from(HomepageNews post) {
        return NewsDto.builder()
                .newsId(post.getNewsId())
                .newsWriter(post.getNewsWriter())
                .newsUrl(post.getNewsUrl())
                .regDt(post.getRegDt())
                .build();
    }
}
