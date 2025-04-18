package com.daquvhome.repository;

import com.daquvhome.entity.ContactHistoryEntity;
import com.daquvhome.entity.HomepageNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ContactHistoryRepository extends JpaRepository<ContactHistoryEntity, Long>{
    List<ContactHistoryEntity> findAllByMailSendYnOrderByRegDtTm(String mailSendYn);
}
