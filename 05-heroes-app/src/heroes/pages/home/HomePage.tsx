import { Heart } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { useMemo } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { useHeroSummary } from '@/heroes/hooks/useHeroSummary';
import { useHeroPaginated } from '@/heroes/hooks/useHeroPaginated';

export const HomePage = () => {
  const [searParams, setSearchParams] = useSearchParams();

  const activeTab = searParams.get('tab') ?? '';
  const page = searParams.get('page') ?? '1';
  const limit = searParams.get('limit') ?? '6';
  const category = searParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  const setActiveTab = (tabName: string, categoryName: string) => {
    // setSearchParams({ tab });
    setSearchParams((prev) => {
      prev.set('tab', tabName);
      prev.set('category', categoryName);
      prev.set('page', '1');
      return prev;
    });
  };

  // const [activeTab, setActiveTab] = useState<
  //   'all' | 'favorites' | 'heroes' | 'villains'
  // >('all');

  // useEffect(() => {
  //   getHeroesByPage().then();
  // }, []);

  // const { data: heroesResponse } = useQuery({
  //   queryKey: ['heroes', { page, limit }],
  //   queryFn: () => getHeroesByPageAction(+page, +limit),
  //   staleTime: 1000 * 60 * 5, // 5 minutos, tiempo que mantiene "fresca" la respuesta sin llamar de nuevo al BE
  // });

  // const { data: heroesResponse } = useQuery({
  //   queryKey: ['summary-information'],
  //   queryFn: getSummaryAction,
  //   staleTime: 1000 * 60 * 5,
  // });

  const { data: heroesResponse } = useHeroPaginated(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Universo de Superhéroes"
        description="Descubre, explora y administra superhéroes y villanos"
      />

      <CustomBreadcrumbs
        currentPage="Superheroes"
        breadcrumbs={[
          { key: 1, label: 'Home 1', to: '/' },
          { key: 2, label: 'Home 2', to: '/' },
          { key: 3, label: 'Home 3', to: '/' },
        ]}
      />
      {/* Stats Dashboard */}
      <HeroStats />

      {/* Tabs */}
      <Tabs value={selectedTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" onClick={() => setActiveTab('all', 'all')}>
            All Characters ({summary?.totalHeroes})
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() => setActiveTab('favourites', 'favourites')}
          >
            <Heart className="h-4 w-4" />
            Favorites (3)
          </TabsTrigger>
          <TabsTrigger
            value="heroes"
            onClick={() => setActiveTab('heroes', 'hero')}
          >
            Heroes ({summary?.heroCount})
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() => setActiveTab('villains', 'villain')}
          >
            Villains ({summary?.villainCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {/* Character Grid */}
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>

        <TabsContent value="favorites">
          {/* Character Grid */}
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>

        <TabsContent value="heroes">
          {/* Character Grid */}
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>

        <TabsContent value="villains">
          {/* Character Grid */}
          <HeroGrid heroes={heroesResponse?.heroes ?? []} />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
    </>
  );
};
