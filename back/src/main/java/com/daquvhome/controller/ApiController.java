package com.daquvhome.controller;

import com.daquvhome.Dto.NewsDto;
import com.daquvhome.entity.HomepageNews;
import com.daquvhome.service.HomepageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class ApiController {
    @Autowired
    HomepageService homepageService;

    /**
     * 뉴스 리스트 가져오기.
     * @param newsDto
     * @return
     */
    @GetMapping("/newsList")
    public Page<HomepageNews> newsList(
            NewsDto newsDto){
        return homepageService.getHomepageNews(newsDto);
    }
    @GetMapping("/allNewsList")
    public ResponseEntity allNewsList(){
        return ResponseEntity.ok(homepageService.allNewsList());
    }

    @GetMapping("/newsContent")
    public Optional<HomepageNews> newsContent(@RequestParam(value = "newsId") int id){
        return homepageService.getHomepageNews(id);
    }
}
