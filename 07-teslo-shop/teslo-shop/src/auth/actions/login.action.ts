import { tesloApi } from '@/api/teslo-api';
import type { AuthResponse } from '../interfaces/aut.response';

interface Props {
  email: string;
  password: string;
}

export const loginAction = async (props: Props): Promise<AuthResponse> => {
  const { email, password } = props;

  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
