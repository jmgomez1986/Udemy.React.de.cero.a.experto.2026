import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { searchHeroesAction } from '@/heroes/actions/search-heros.action';
import SearchPage from './SearchPage';
import type { Hero } from '@/heroes/interfaces/hero.interface';

/*********************
 ******* MOCKS *******
 **********************/
vi.mock('@/heroes/actions/search-heros.action');
const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

/****************************************************
 ***** Si se hace mock de componente, se deben ******
 ***** hacer mocks de todos los modulos usados ******
 ***** en el componente a testear, si se hace  ******
 ***** uno y se usan mas, falla el test        ******
 ****************************************************/
vi.mock('@/components/custom/CustomJumbotron', () => ({
  CustomJumbotron: () => (
    <div data-testid="custom-jumbotron">Custom Jumbotron</div>
  ),
}));
vi.mock('@/components/custom/CustomBreadcrumbs', () => ({
  CustomBreadcrumbs: () => (
    <div data-testid="custom-breadcrumbs">Custom Breadcrumbs</div>
  ),
}));
vi.mock('@/heroes/components/HeroStats', () => ({
  HeroStats: () => <div data-testid="hero-stats">Hero Stats</div>,
}));
vi.mock('./ui/SearchControls', () => ({
  SearchControls: () => (
    <div data-testid="search-controls">Search Controls</div>
  ),
}));
vi.mock('@/heroes/components/HeroGrid', () => ({
  HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
    <div data-testid="hero-grid">
      {heroes.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  ),
}));
/********************************* */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderSearchPage = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('should render searchPage with default values', () => {
    // render(<SearchPage />);
    const { container } = renderSearchPage();
    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: '',
      strength: '',
    });
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('custom-jumbotron')).toBeDefined();
    expect(screen.getByTestId('custom-breadcrumbs')).toBeDefined();
    expect(screen.getByTestId('hero-stats')).toBeDefined();
    expect(screen.getByTestId('search-controls')).toBeDefined();
    expect(screen.getByTestId('hero-grid')).toBeDefined();
  });

  test('should call search action with name parameter', () => {
    renderSearchPage(['/search?name=superman']);
    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: 'superman',
      strength: '',
    });
  });

  test('should call search action with strength parameter', () => {
    renderSearchPage(['/search?strength=6']);
    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: '',
      strength: '6',
    });
  });

  test('should call search action with name and strength parameter', () => {
    renderSearchPage(['/search?name=superman&strength=6']);
    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: 'superman',
      strength: '6',
    });
  });

  test('should render HeroGrid with search results', async () => {
    const mockHeroes = [
      {
        id: '1',
        name: 'Clark Kent',
      } as unknown as Hero,
      {
        id: '2',
        name: 'Bruce Wayne',
      } as unknown as Hero,
    ];

    // Como SearchHeroesAction devuelve na promesa, se usa resolveValues y se hacen los
    // expect dentro de un waitFor
    mockSearchHeroesAction.mockResolvedValue(mockHeroes);

    renderSearchPage();
    await waitFor(() => {
      expect(screen.getByText('Clark Kent')).toBeDefined();
      expect(screen.getByText('Bruce Wayne')).toBeDefined();

      screen.debug();
    });
  });
});
