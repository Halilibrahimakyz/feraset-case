import { api } from './axios';

export interface CreateLogoRequest {
  prompt: string;
  style: string;
}

export interface CreateLogoResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  imageUrl?: string;
  error?: string;
}

export interface SurpriseMeResponse {
  prompt: string;
}

export const logoApi = {
  createLogo: async (data: CreateLogoRequest) => {
    const response = await api.post<CreateLogoResponse>('api/logos', data);
    return response.data;
  },

  surpriseMe: async () => {
    const response = await api.get<SurpriseMeResponse>('api/logos/surprise-me');
    return response.data;
  },
}; 