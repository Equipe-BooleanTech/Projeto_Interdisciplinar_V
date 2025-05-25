import { api } from './API';

export const get = async <IRequest, IResponse>(
  path: string,
  params?: IRequest
): Promise<IResponse> => {
  const response = await api.get(path, { params });
  return response.data;
};

export const post = async <IRequest, IResponse>(
  path: string,
  params?: IRequest
): Promise<IResponse> => {
  const response = await api.post(path, { params });
  return response.data;
};

export const put = async <IRequest, IResponse>(
  path: string,
  params?: IRequest
): Promise<IResponse> => {
  const response = await api.put(path, { params });
  return response.data;
};

export const remove = async <IRequest, IResponse>(
  path: string,
  params?: IRequest
): Promise<IResponse> => {
  const response = await api.delete(path, { params });
  return response.data;
};
