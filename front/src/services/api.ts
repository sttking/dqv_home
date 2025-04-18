import axios from 'axios';
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError
} from 'axios';

class ApiService {
  private readonly api: AxiosInstance;
  
  constructor() {
    const baseURL = process.env.REACT_APP_API_URL
      ? `${process.env.REACT_APP_API_URL}/api/v1`
      : 'http://localhost:8000/api/v1';

    console.log("✅ baseURL 설정 확인:", baseURL);

    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // 요청 인터셉터 - FormData인 경우 content-type 자동 설정
    this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (config.data instanceof FormData) {
        // FormData인 경우 브라우저가 자동으로 boundary를 포함한 적절한 content-type 설정
        if (config.headers) {
          delete config.headers['Content-Type'];
        }
      }
      return config;
    });

    // 응답 인터셉터
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response) {
          console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Request error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  // GET 요청
  public get<T = any>(url: string, config?: any): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, config);
  }

  // POST 요청
  public post<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data, config);
  }

  // PUT 요청
  public put<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data, config);
  }

  // DELETE 요청
  public delete<T = any>(url: string, config?: any): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url, config);
  }

  // API 인스턴스 getter
  public getApiInstance(): AxiosInstance {
    return this.api;
  }
}

// API 서비스 단일 인스턴스 생성 (싱글톤 패턴)
const apiService = new ApiService();
export default apiService;