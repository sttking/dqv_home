package com.daquvhome.repository;

import com.daquvhome.entity.HomepageNews;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface HomepageNewsPagingRepository extends PagingAndSortingRepository<HomepageNews, Long>, JpaSpecificationExecutor<HomepageNews> {

}
