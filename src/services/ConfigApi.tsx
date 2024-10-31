import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface ApiResponse<T> {
  data: T;
  // otros campos que puedas esperar de la respuesta
}
// Más tipos específicos según lo que tu API retorne

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = 'https://back-proservicios-1.onrender.com/api/') {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async request<T>(method: string, url: string, data?: T): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance.request({
      method,
      url,
      data,
    });
    return response.data.data; // Suponiendo que la respuesta es de tipo ApiResponse con un campo "data"
  }

  public get<T>(path: string): Promise<T> {
    const url = `/${path}`;
    return this.request<T>('GET', url);
  }

  public post<T>(path: string, data: T): Promise<T> {
    const url = `/${path}`;
    return this.request<T>('POST', url, data);
  }
  
  public put<T>(path: string, data: T): Promise<T> {
    const url = `/${path}`;
    return this.request<T>('PUT', url, data);
  }
}

export default new ApiService();
