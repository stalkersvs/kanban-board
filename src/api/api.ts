import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// eslint-disable-next-line no-shadow
enum HTTP_METHOD {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete'
}

type definition = {
  id: string;
  name: string;
}

export type Item = definition;

export interface List extends definition {
  items: Item[]
}

export interface Board extends definition {
  lists: List[]
}

export interface Kanban {
  boards: Board[]
}

export interface ApiInterface {
   axios: AxiosInstance;
   getKanban(): void;
}

export default class Api implements ApiInterface {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();

    this.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

    this.axios.interceptors.request.use((config: AxiosRequestConfig) => {
    // eslint-disable-next-line no-param-reassign
      config.headers.common = {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
      };
      return config;
    });

    this.axios.interceptors.response.use((response) => response, (error) => Promise.reject(error));

    console.log('set default xhr');
  }

  public getKanban() : Promise<Kanban> {
    return new Promise((resolve, reject) => {
      (this as any).axios({
        url: '/board',
        method: HTTP_METHOD.GET,
      }).then((response: any) => {
        resolve(response.data);
      }).catch((error: any) => {
        reject(error.data);
      });
    });
  }
}
