package com.daquvhome.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@EnableAsync
@Configuration
public class AsyncConfig {

    @Bean
    public ThreadPoolTaskExecutor threadPoolTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(8); // 기본적으로 실행을 대기하고 있는 Thread 개수
        executor.setMaxPoolSize(8); // 동시 동작하는, 최대 Thread 개수
        // MaxPoolSize 를 초과하는 요청이 Thread 생성 요청 시 해당 내용을 Queue 에 저장하게 되고, 사용할 수 있는 Thread 여유 자리가 발생하면 하나씩 꺼내져서 동작하게 된다.
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("DH-ASYNC-"); // spring 이 생성하는 스레드의 접두사를 지정.
        executor.initialize();
        return executor;
    }
}
