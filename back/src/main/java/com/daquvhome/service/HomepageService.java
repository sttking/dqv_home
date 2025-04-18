package com.daquvhome.service;

import com.daquvhome.Dto.NewsDto;
import com.daquvhome.entity.HomepageNews;
import com.daquvhome.repository.HomepageNewsJpaRepository;
import com.daquvhome.repository.HomepageNewsPagingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.*;

@Service
public class HomepageService {

    @Autowired
    HomepageNewsPagingRepository homepageNewsPagingRepository;

    @Autowired
    HomepageNewsJpaRepository homepageNewsJpaRepository;

    /**
     * 뉴스 리스트 가져오기.
     * @param newsDto
     * @return
     */
    public List<HomepageNews> allNewsList(){

//        List<HomepageNews> newsList = homepageNewsJpaRepository.findAllByUseYn("Y", Sort.by( Sort.Order.desc("regDt"), Sort.Order.desc("newsId") ));
        List<HomepageNews> newsList = homepageNewsJpaRepository.findAllByUseYnOrderByRegDtDescNewsIdDesc("Y");

        return newsList;
    }
    public Page<HomepageNews> getHomepageNews(NewsDto newsDto){
        String newsType = newsDto.getNewsType();
        int page = newsDto.getPage();
        int size = newsDto.getSize();

        Map<String, Object> map = new HashMap<>();
        map.put("newsType", newsType);

        if("A".equals(newsType)){
            // 뉴스타입 전체 조회면 조건 제거.
            map.remove("newsType");
        }

        Specification<HomepageNews> spec = getSingleSpec(map);

        Pageable pageable = PageRequest.of(page, size, Sort.by("regDt").descending());
        Page<HomepageNews> pageList = homepageNewsPagingRepository.findAll(spec, pageable);

        return pageList;
    }

    public Optional<HomepageNews> getHomepageNews(int Id){
        Optional<HomepageNews> pageList = homepageNewsPagingRepository.findById(Long.valueOf(Id));
        return pageList;
    }

    @SuppressWarnings("unused")
    private Specification<HomepageNews> getSingleSpec(Map<String, Object> map){
        return new Specification<HomepageNews>() {
            private static final long serialVersionUID = 1L;

            @Override
            public Predicate toPredicate(Root<HomepageNews> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Predicate predicate = cb.conjunction();
                if(map.get("newsType") != null)
                    predicate = cb.and( cb.equal( root.get("newsType"), map.get("newsType").toString() ) );
                return predicate;
            }
        };
    }

    @SuppressWarnings({"unused", "unchecked"})
    private Specification<HomepageNews> getMultiSpec(Map<String, Object> map){
        return new Specification<HomepageNews>() {
            private static final long serialVersionUID = 1L;

            @Override
            public Predicate toPredicate(Root<HomepageNews> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Predicate p = cb.conjunction();
                List<Predicate> pList = new ArrayList<Predicate>();
                /*TEXT BOX 조회*/
                if(map.get("id") != null) {
                    List<String> values = (ArrayList<String>) map.get("id");
                    p = cb.and(p, cb.like(root.get("id"), "%"+values.get(0)+"%"));
                    for(int i=1, n=values.size(); i<n; i++) {
                        p = cb.or(p, cb.like(root.get("id"), "%"+values.get(i)+"%"));
                    }
                }
                if(map.get("name") != null) {
                    List<String> values = (ArrayList<String>) map.get("name");
                    p = cb.and(p, cb.like(root.get("name"), "%"+values.get(0)+"%"));
                    for(int i=1, n=values.size(); i<n; i++) {
                        p = cb.or(p, cb.like(root.get("name"), "%"+values.get(i)+"%"));
                    }
                }
                /*COMBO BOX 조회*/
                if(map.get("useYn") != null) {
                    List<String> values = (ArrayList<String>) map.get("useYn");
                    List<String> list = new ArrayList<String>();
                    for(String value : values) {
                        list.add(value);
                    }
                    p = cb.and(root.get("useYn").in(list));
                }
                /*날짜타입 조회*/
                if(map.get("regDtm") != null) {
                    if(map.get("range") != null && (boolean) map.get("range")) {
                        int[][] range = null;
                        String format = "", func = "DATE_FORMAT"; /*ORACLE : TO_CHAR*/
                        /*기간 조회의 경우*/
                        List<String> values = (ArrayList<String>) map.get("regDtm");
                        String dtm = values.get(0);
                        if(dtm.length() == 16) { /*type date의 경우*/
                            range = new int[][]{{0,8},{8,16}};
                            format = "%Y%m%d";
                        }else if(dtm.length() == 24) { /*type datetime의 경우*/
                            range = new int[][]{{0,12},{12,24}};
                            format = "%Y%m%d%H%i%s";
                        }
                        p = cb.and(p, cb.between(cb.function(func, String.class, root.get("regDtm"), cb.literal(format))
                                , dtm.substring(range[0][0], range[0][1])+((dtm.length()==24)?"00":"")
                                , dtm.substring(range[1][0], range[1][1])+((dtm.length()==24)?"59":"")));
                        for(int i=1; i<values.size(); i++) {
                            p = cb.or(p, cb.between(cb.function(func, String.class, root.get("regDtm"), cb.literal(format))
                                    , values.get(i).substring(range[0][0], range[0][1])+((dtm.length()==24)?"00":"")
                                    , values.get(i).substring(range[1][0], range[1][1])+((dtm.length()==24)?"59":"")));
                        }
                    }else {
                        /*해당 날짜들로만 검색할 경우*/
                        List<String> values = (ArrayList<String>) map.get("regDtm");
                        List<String> list = new ArrayList<String>();
                        for(String value : values) {
                            list.add(value);
                        }
                        p = cb.and(cb.function("DATE_FORMAT", String.class, root.get("regDtm"), cb.literal("%Y%m%d")).in(list)); /*mariadb*/
                        //p = cb.and(cb.function("TO_CHAR", String.class, root.get("regDtm"), cb.literal("yyyyMMdd")).in(list)); /*oracle*/
                    }
                }
                return p;
            }
        };
    }

    public Specification<HomepageNews> withNewsType(String newsType) {
        return (Specification<HomepageNews>) ((root, query, builder) ->
                builder.equal(root.get("newsType"), newsType)
        );
    }
}
