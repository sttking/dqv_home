import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NewsItem } from '../../types/news.types';
import { getAllNews } from '../../services/newsService';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewsList: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 뉴스 타입에 따른 클래스 및 텍스트 매핑
  const NEWS_TYPE_TEXT = {
    'R': '언론보도',
    'N': '인사이트',
    'C': '고객사례'
  };

  const NEWS_TYPE_STYLE = {
    'R': 'press',
    'N': 'insite',
    'C': 'customer'
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });

    const fetchNews = async () => {
      try {
        const allNews = await getAllNews();
        // 언론보도(R)와 인사이트(N) 타입만 필터링하고, useYn이 'Y'인 것만 표시
        const filteredNews = allNews.filter(item => 
          (item.newsType === 'R' || item.newsType === 'N') && item.useYn === 'Y'
        );
        setNews(filteredNews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div id="sub" className="sub">
      <section className="sub-header">
        <div className="list-header text-left">
          <h2>다큐브의</h2>
          <h1>새로운 소식을 만나보세요.</h1>
        </div>
      </section>
      <section className="sub-content sub-back-gray">
        <div className="sub-wrap">
          <ul className="sub-news-list sublist" id="newsList" data-aos="fade-up">
            {news.map(item => (
              <li key={item.newsId}>
              <Link 
                href={`/news/contents?newsId=${item.newsId}`} 
                className={NEWS_TYPE_STYLE[item.newsType as 'R' | 'N' |'C']}
              >
                <div>
                  <p className="sub-news-type">{NEWS_TYPE_TEXT[item.newsType as 'R' | 'N' | 'C']}</p>
                  <p className="sub-news-title">{item.newsTitle}</p>
                </div>
              </Link>
            </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default NewsList;