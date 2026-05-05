import { heroApi } from '../api/hero.api';
import type { HeroResponse } from '../interfaces/get-hero.response.interface';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroAction = async (idSlug: string): Promise<HeroResponse> => {
  const { data } = await heroApi.get<HeroResponse>(`/${idSlug}`);

  return {
    ...data,
    image: `${BASE_URL}/images/${data.image}`,
  };
};
