import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { NewsItem } from '../../types/news.types';
import { getNewsById, getAllNews } from '../../services/newsService';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewsDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const newsId = Number(searchParams.get('newsId') || '0');
  
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 뉴스 타입에 따른 클래스 및 텍스트 매핑
  const NEWS_TYPE_TEXT = {
    'R': '언론보도',
    'N': '인사이트'
  };

  const NEWS_TYPE_STYLE = {
    'R': 'press',
    'N': 'insite'
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });

    const fetchNewsItem = async () => {
      if (newsId === 0) return;
      
      try {
        setLoading(true);
        const newsData = await getNewsById(newsId);
        
        if (newsData && (newsData.newsType === 'R' || newsData.newsType === 'N')) {
          setNewsItem(newsData);
          
          // 관련 뉴스 가져오기 (현재 뉴스 제외하고 같은 타입)
          const allNews = await getAllNews();
          const related = allNews
            .filter(item => 
              item.newsId !== newsId && 
              item.newsType === newsData.newsType &&
              item.useYn === 'Y'
            )
            .slice(0, 3); // 최대 3개만 표시
          
          setRelatedNews(related);
        }
      } catch (error) {
        console.error('Error fetching news item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [newsId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!newsItem) {
    return <div>뉴스를 찾을 수 없습니다.</div>;
  }

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div id="sub" className="sub">
      <section className="sub-content">
        <div className="sub-wrap">
          <div className="news-content">
            <div className="news-header">
              <p className="news-con-type">{NEWS_TYPE_TEXT[newsItem.newsType as 'R' | 'N']}</p>
              <p className="news-con-tit">{newsItem.newsTitle}</p>
              <p className="news-con-date">{formatDate(newsItem.regDt)}</p>
            </div>
            <div className="news-con" dangerouslySetInnerHTML={{ __html: newsItem.newsBody || '' }} />
            <div className="text-left">
              <Link to="/news/list" className="daquv-btn">
                <img src={`${process.env.PUBLIC_URL}/img/sub/img_con_list.png`} alt="목록으로" />목록으로
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {relatedNews.length > 0 && (
        <section className="sub-recomend sub-back-gray">
          <div className="sub-wrap">
            <h4>관련 정보</h4>
            <div className="sub-recomend-swiper">
              <ul className="sub-news-list swiper-wrapper pt-0 pb-0">
                {relatedNews.map(item => (
                  <li key={item.newsId} className="swiper-slide">
                    <Link 
                      to={`/news/contents?newsId=${item.newsId}`} 
                      className={NEWS_TYPE_STYLE[item.newsType as 'R' | 'N']}
                    >
                      <p className="sub-news-type">{NEWS_TYPE_TEXT[item.newsType as 'R' | 'N']}</p>
                      <p className="sub-news-title">{item.newsTitle}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsDetail;