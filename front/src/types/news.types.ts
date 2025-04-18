export interface NewsItem {
  newsId: number;
  newsWriter: string;
  newsTitle: string;
  newsUrl: string;
  regDt: string;
  hashTags: string;
  imgUrl: string;
  useYn: string;
  newsType: 'R' | 'N' | 'C'; // R: 언론보도, N: 인사이트, C: 고객사례
  newsBody?: string;
}