import axios, {AxiosInstance} from 'axios';
import {Product} from '../types';

class Api {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `http://10.0.2.2:3000/`,
    });
  }

  getProducts = async (params: {
    _page?: number;
    _limit?: number;
    search?: string;
  }): Promise<Product[]> => {
    const {_page, _limit, search} = params;
    //json-server does not support search, so I had to do it this way :/
    const response = await this.instance.get<Product[]>('products', {
      params: {_page, _limit},
    });
    return response.data.filter(
      product =>
        !search || product.model.toLowerCase().includes(search.toLowerCase()),
    );
  };
}
const api = new Api();

export default api;
