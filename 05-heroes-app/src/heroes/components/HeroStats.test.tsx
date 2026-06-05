import { describe, expect, test, vi } from 'vitest';
import { HeroStats } from './HeroStats';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useHeroSummary } from '../hooks/useHeroSummary';
import type { HeroesSummaryResponse } from '../interfaces/get-summary.response.interface';
import { heroResponseDataSummaryMock } from 'test/hero.response.summary';
import { FavoriteHeroProvider } from '../context/FavoriteHeroContext';
import { heroResponseDataByIdMock } from 'test/hero.response.data';

vi.mock('../hooks/useHeroSummary');
const mockUseHeroSummary = vi.mocked(useHeroSummary);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderHeroStats = (mockData?: Partial<HeroesSummaryResponse>) => {
  mockUseHeroSummary.mockReturnValue({
    data: mockData ?? undefined,
  } as unknown as ReturnType<typeof useHeroSummary>);

  return render(
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvider>
        <HeroStats />
      </FavoriteHeroProvider>
    </QueryClientProvider>,
  );
};

describe('HeroStats', () => {
  test('should render component with default values', () => {
    const { container } = renderHeroStats();
    expect(screen.getByText('Loading...')).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test('should render HeroStats with mock data', () => {
    const { container } = renderHeroStats(heroResponseDataSummaryMock);

    expect(container).toMatchSnapshot();
    expect(screen.getByText('Total de personajes')).toBeDefined();
    expect(screen.getByText('Favoritos')).toBeDefined();
    expect(screen.getByText('Más fuerte')).toBeDefined();
  });

  test('should change the percentage of favotites when a hero is added to favirites', () => {
    localStorage.setItem(
      'favorites',
      JSON.stringify([heroResponseDataByIdMock]),
    );

    renderHeroStats(heroResponseDataSummaryMock);

    const favoritePercentageElement = screen.getByTestId('favorite-percentage');
    expect(favoritePercentageElement.innerHTML).toContain('4.00%');

    const favoriteCountElement = screen.getByTestId('favorite-count');
    expect(favoriteCountElement.innerHTML).toContain('1');
  });
});
