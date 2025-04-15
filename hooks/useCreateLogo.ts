import { useMutation } from '@tanstack/react-query';
import { logoApi } from '../api/logo';

interface CreateLogoRequest {
  prompt: string;
  style: string;
}

interface CreateLogoResponse {
  id: string;
  imageUrl: string;
  createdAt: string;
}

interface SurpriseMeResponse {
  prompt: string;
}

export const useCreateLogo = () => {
  const createLogoMutation = useMutation({
    mutationFn: (data: CreateLogoRequest) => logoApi.createLogo(data),
  });

  const surpriseMeMutation = useMutation({
    mutationFn: () => logoApi.surpriseMe(),
  });

  return {
    mutateAsync: createLogoMutation.mutateAsync,
    isPending: createLogoMutation.isPending,
    surpriseMe: surpriseMeMutation.mutateAsync,
    isSurprisePending: surpriseMeMutation.isPending,
  };
}; 