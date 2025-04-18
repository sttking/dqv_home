package com.daquvhome.repository;

import com.daquvhome.entity.HomepageNews;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface HomepageNewsJpaRepository extends JpaRepository<HomepageNews, Long>{

    List<HomepageNews> findAllByUseYn(String useYn, Sort sort);
    List<HomepageNews> findAllByUseYnOrderByRegDtDescNewsIdDesc(String useYn);
}