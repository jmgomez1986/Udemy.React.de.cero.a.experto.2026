import { useEffect, useState } from 'react';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface Props {
  id: number;
}
export const usePokemon = ({ id }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPokemonById = async (id: number) => {
      setIsLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();

      setPokemon({
        id,
        name: data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      });
      setIsLoading(false);
    };
    getPokemonById(id);
  }, [id]);

  return { pokemon, isLoading, formattedId: id.toString().padStart(3, '0') };
};
