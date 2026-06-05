import { beforeEach, describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import { useHeroPaginated } from '@/heroes/hooks/useHeroPaginated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from './HomePage';
import { FavoriteHeroProvider } from '@/heroes/context/FavoriteHeroContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderHomePage = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>,
  );
};

// Se crea un mock de useHeroPaginated
vi.mock('@/heroes/hooks/useHeroPaginated');
const mockUsePaginatedHero = vi.mocked(useHeroPaginated);

mockUsePaginatedHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof useHeroPaginated>);

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('should render Home Page whith default values', () => {
    const { container } = renderHomePage();
    expect(container).toMatchSnapshot();
  });

  test('should call useHeroPaginated with default values', () => {
    renderHomePage();

    expect(mockUsePaginatedHero).toHaveBeenCalled();
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, 'all');
  });

  test('should call useHeroPaginated with custom query params', () => {
    renderHomePage(['/?page=2&limit=10&category=villains']);

    expect(mockUsePaginatedHero).toHaveBeenCalled();
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(2, 10, 'villains');
  });

  test('should called useHeroPaginated with default page and same limit on tab clicked', () => {
    renderHomePage(['/?tab=favorites&page=2&limit=10']);
    // Obtenemos el tab para hacer click, pero con shadcn, se transforman en botones
    // los identifican la propiedad role
    const [, , , villainsTab] = screen.getAllByRole('tab');
    screen.debug(villainsTab);
    fireEvent.click(villainsTab);
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 10, 'villain');
  });
});
