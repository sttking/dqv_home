package com.daquvhome.controller;

import com.daquvhome.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URLConnection;

@RestController
@RequestMapping("/api/v1")
public class ResourceApiController {

    @Value("${download.path}")
    private String downloadPath;

    private final ResourceLoader resourceLoader;

    @Autowired
    public ResourceApiController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Resource resource = resourceLoader.getResource(downloadPath + fileName);

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            String mimeType = URLConnection.guessContentTypeFromName(fileName);

            // Resource의 내용에 접근해보면서 IOException 체크
            resource.contentLength();

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, mimeType)
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}