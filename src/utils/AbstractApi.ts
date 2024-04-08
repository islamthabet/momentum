import axiosInstance from '@/config/axiosInstance';

export abstract class BasicCrud<T extends { id: string }, F> {
  protected endPoint = '';

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }
  async getAll(): Promise<T[]> {
    const res = await axiosInstance.get(this.endPoint);
    return res.data;
  }
  async getOne(id: string): Promise<T> {
    const res = await axiosInstance.get(`${this.endPoint}/${id}`);
    return res.data;
  }
  async create(data: F): Promise<T> {
    const res = await axiosInstance.post(this.endPoint, data);
    return res.data;
  }
  async update(data: Partial<T>) {
    const res = await axiosInstance.patch(`${this.endPoint}/${data.id}`, data);
    return res.data;
  }

  async delete(id: string) {
    const res = await axiosInstance.delete(`${this.endPoint}/${id}`);
    return res.data;
  }
}
