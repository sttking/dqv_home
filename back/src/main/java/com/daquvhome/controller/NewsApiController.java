package com.daquvhome.controller;

import com.daquvhome.Dto.NewsDto;
import com.daquvhome.common.ApiResponse;
import com.daquvhome.entity.HomepageNews;
import com.daquvhome.service.HomepageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class NewsApiController {

    @Autowired
    private HomepageService homepageService;

    @GetMapping("/news")
    public ApiResponse<Page<HomepageNews>> getNewsList(NewsDto newsDto) {
        return ApiResponse.success(homepageService.getHomepageNews(newsDto));
    }

    @GetMapping("/news/all")
    public ApiResponse<List<HomepageNews>> getAllNews() {
        return ApiResponse.success(homepageService.allNewsList());
    }

    @GetMapping("/news/{newsId}")
    public ApiResponse<Optional<HomepageNews>> getNewsById(@PathVariable Long newsId) {
        return ApiResponse.success(homepageService.getHomepageNews(newsId.intValue()));
    }
}