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
   getAxiosInstance() : AxiosInstance;
}

/**
 * Api calls definitions and axios root instance
 */
export default class Api implements ApiInterface {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();

    this.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

    console.log('set default xhr');
  }

  /**
   * Return  axions instance
   */
  getAxiosInstance() : AxiosInstance {
    return this.axios;
  }

  /**
   * Get list of boards
   */
  public getKanban() : Promise<Kanban> {
    return new Promise((resolve, reject) => {
      this.axios({
        url: '/board',
        method: HTTP_METHOD.GET,
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error.data);
      });
    });
  }

  /**
   * Get board by id
   *
   * @param {number} boardId
   */
  public getBoard(boardId: string) : Promise<Board> {
    return new Promise((resolve, reject) => {
      this.axios({
        url: `/board/${boardId}`,
        method: HTTP_METHOD.GET,
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error.data);
      });
    });
  }

  /**
   * Create new board
   *
   * @param {Board} board
   */
  public createBoard(board: Board) : Promise<Board> {
    return new Promise((resolve, reject) => {
      this.axios({
        url: '/board',
        method: HTTP_METHOD.POST,
        data: board,
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error.data);
      });
    });
  }

  /**
   * Replace board by id
   *
   * @param {string} boardId
   * @param {Board} board
   */
  public updateBoard(boardId: string, board: Board) : Promise<Board> {
    return new Promise((resolve, reject) => {
      this.axios({
        url: `/board/${boardId}`,
        method: HTTP_METHOD.PUT,
        data: board,
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error.data);
      });
    });
  }

  /**
   * Delete board by id
   *
   * @param {string} boardId
   */
  public deleteBoard(boardId: string) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.axios({
        url: `/board/${boardId}`,
        method: HTTP_METHOD.DELETE,
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error.data);
      });
    });
  }
}
