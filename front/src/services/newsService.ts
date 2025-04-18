import apiService from './api';
import { NewsItem } from '../types/news.types';

export const getAllNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await apiService.get('/news/all');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching all news:', error);
    return [];
  }
};

export const getNewsById = async (newsId: number): Promise<NewsItem | null> => {
  try {
    const response = await apiService.get(`/news/${newsId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching news with ID ${newsId}:`, error);
    return null;
  }
};