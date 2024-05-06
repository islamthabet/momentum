import axiosInstance from '@/config/axiosInstance';

export interface IRes<T> {
  data: T;
  status: number;
  message: string;
}
export abstract class BasicCrud<T extends { id: string }, F> {
  protected endPoint = '';

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }
  async getAll(): Promise<IRes<T[]>> {
    const res = await axiosInstance.get(this.endPoint);
    return res.data;
  }
  async getOne(id: string): Promise<IRes<T>> {
    const res = await axiosInstance.get(`${this.endPoint}/${id}`);
    return res.data;
  }
  async create(data: F): Promise<IRes<T>> {
    const res = await axiosInstance.post(this.endPoint, data);
    return res.data;
  }
  async update(data: Partial<T>): Promise<IRes<T>> {
    const res = await axiosInstance.patch(`${this.endPoint}/${data.id}`, data);
    return res.data;
  }

  async delete(id: string) {
    const res = await axiosInstance.delete(`${this.endPoint}/${id}`);
    return res.data;
  }
}
