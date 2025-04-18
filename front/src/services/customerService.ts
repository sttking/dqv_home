import apiService from './api';
import { CustomerCase } from '../types/customer.types';
import { NewsItem } from '../types/news.types';

export const getAllCustomerCases = async (): Promise<CustomerCase[]> => {
  try {
    console.log('📦 Fetching customer cases...');
    const response = await apiService.get('/news/all');
    const newsItems = response.data.data as NewsItem[];

    // ✅ 이미지 URL 로그 추가
    const customerCases = newsItems.filter(
      item => item.newsType === 'C' && item.useYn === 'Y'
    ) as CustomerCase[];

    customerCases.forEach((item, idx) => {
      console.log(
        `🖼️ [${idx}] Title: ${item.newsTitle}, Image URL: ${item.imgUrl || '❌ 없음'}`
      );
    });

    return customerCases;
  } catch (error) {
    console.error('❌ Error fetching customer cases:', error);
    return [];
  }
};

export const getCustomerCaseById = async (newsId: number): Promise<CustomerCase | null> => {
  try {
    const response = await apiService.get(`/news/${newsId}`);
    const newsItem = response.data.data as NewsItem;
    if (newsItem && newsItem.newsType === 'C') {
      return newsItem as CustomerCase;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching customer case with ID ${newsId}:`, error);
    return null;
  }
};