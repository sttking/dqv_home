export interface CustomerCase {
  newsId: number;
  newsWriter: string;
  newsTitle: string; // "회사명:설명" 형식으로 저장
  imgUrl: string;
  hashTags: string;
  newsBody: string;
}