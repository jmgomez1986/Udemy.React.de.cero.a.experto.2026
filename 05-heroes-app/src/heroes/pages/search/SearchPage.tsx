import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { useQuery } from '@tanstack/react-query';
import { searchHeroesAction } from '@/heroes/actions/search-heros.action';
import { useSearchParams } from 'react-router';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') ?? '';
  const strength = searchParams.get('strength') ?? '';

  const { data: searchHeroesResponse } = useQuery({
    queryKey: ['search-heroes', { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      {/* Jumbotron */}
      <CustomJumbotron
        title="Búsqueda de Superhéroes"
        description="Descubre, explora y gestiona tus superhéroes y villanos favoritos"
      />
      <CustomBreadcrumbs
        currentPage="Search superheroes"
        breadcrumbs={[
          { key: 1, label: 'Home 1', to: '/' },
          { key: 2, label: 'Home 2', to: '/' },
          { key: 3, label: 'Home 3', to: '/' },
        ]}
      />
      {/* Stats Dashboard */}
      <HeroStats />
      {/* Filter and search */}
      <SearchControls />

      {/* Heroes Result */}
      <HeroGrid heroes={searchHeroesResponse ?? []} />
    </>
  );
};

export default SearchPage;
