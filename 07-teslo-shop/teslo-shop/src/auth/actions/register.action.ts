import { tesloApi } from '@/api/teslo-api';
import type { AuthResponse } from '../interfaces/aut.response';

interface Props {
  fullName: string;
  email: string;
  password: string;
}

export const registerAction = async (props: Props): Promise<AuthResponse> => {
  const { email, password, fullName } = props;

  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
