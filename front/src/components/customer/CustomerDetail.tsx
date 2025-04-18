import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CustomerCase } from '../../types/customer.types';
import { getCustomerCaseById, getAllCustomerCases } from '../../services/customerService';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CustomerDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const newsId = Number(searchParams.get('newsId') || '0');
  
  const [customerCase, setCustomerCase] = useState<CustomerCase | null>(null);
  const [relatedCases, setRelatedCases] = useState<CustomerCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });

    const fetchCustomerCase = async () => {
      if (newsId === 0) return;
      
      try {
        setLoading(true);
        const caseData = await getCustomerCaseById(newsId);
        
        if (caseData) {
          setCustomerCase(caseData);
          
          // 관련 고객사례 가져오기 (현재 케이스 제외)
          const allCases = await getAllCustomerCases();
          const related = allCases
            .filter(item => item.newsId !== newsId)
            .slice(0, 3); // 최대 3개만 표시
          
          setRelatedCases(related);
        }
      } catch (error) {
        console.error('Error fetching customer case:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerCase();
  }, [newsId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!customerCase) {
    return <div>고객 사례를 찾을 수 없습니다.</div>;
  }

  return (
    <div id="sub" className="sub">
      <section className="sub-content">
        <div className="sub-wrap">
          <div className="customer-content" dangerouslySetInnerHTML={{ __html: customerCase.newsBody }} />
        </div>
      </section>
      
      {relatedCases.length > 0 && (
        <section className="sub-recomend sub-back-gray">
          <div className="sub-wrap">
            <h4>관련 정보</h4>
            <div className="sub-recomend-swiper">
              <ul className="sub-customer-list swiper-wrapper pt-0 pb-0">
                {relatedCases.map((item) => {
                  const titleParts = item.newsTitle.split(':');
                  const customerName = titleParts[0];
                  const description = titleParts[1] || '';
                  const hashTags = item.hashTags.split(',').slice(0, 3);

                  return (
                    <li key={item.newsId} className="swiper-slide">
                      <Link to={`/customer/contents?newsId=${item.newsId}`}>
                        <img src={item.imgUrl} alt={`${customerName} 고객사례 이미지`} />
                        <p className="customer-tit">{customerName}</p>
                        <p className="customer-text">{description}</p>
                        <ul className="customer-tag">
                          {hashTags.map((tag, idx) => (
                            <li key={idx}><p>{tag}</p></li>
                          ))}
                        </ul>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CustomerDetail;