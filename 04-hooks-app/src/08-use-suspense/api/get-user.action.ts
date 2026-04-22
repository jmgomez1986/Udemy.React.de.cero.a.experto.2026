export interface User {
  id: number;
  name: string;
  location: string;
  role: string;
}

export const getUserAction = async (id: number) => {
  await new Promise((res) => setTimeout(res, 2000));

  return {
    id,
    name: 'Matias Gomez',
    location: 'Tandil, Buenos Aires',
    role: 'Senior Software Designer',
  };
};
