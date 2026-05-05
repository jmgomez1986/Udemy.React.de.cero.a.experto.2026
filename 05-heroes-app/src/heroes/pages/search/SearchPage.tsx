import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';

export const SearchPage = () => {
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
    </>
  );
};

export default SearchPage;
