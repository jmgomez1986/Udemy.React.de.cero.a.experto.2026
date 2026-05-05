import { heroApi } from '../api/hero.api';
import type { HeroesSummaryResponse } from '../interfaces/get-summary.response.interface';

export const getSummaryAction = async () => {
  const { data } = await heroApi.get<HeroesSummaryResponse>('/summary');

  return data;
};
