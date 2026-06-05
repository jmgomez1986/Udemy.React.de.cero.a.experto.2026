import { describe, expect, test, vi } from 'vitest';
import { appRouter } from './app.router';
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from 'react-router';
import { render, screen } from '@testing-library/react';

vi.mock('@/heroes/layouts/HeroesLayout', () => ({
  HeroesLayout: () => (
    <div data-testid="heroes-layout">
      Heroes Layout
      <Outlet />
    </div>
  ),
}));
vi.mock('@/heroes/pages/home/HomePage', () => ({
  HomePage: () => <div data-testid="home-page">Home Page</div>,
}));
vi.mock('@/admin/pages/AdminPage', () => ({
  AdminPage: () => <div data-testid="admin-page">Admin Page</div>,
}));
vi.mock('@/heroes/pages/hero/HeroPage', () => ({
  HeroPage: () => {
    const { idSlug } = useParams();
    return <div data-testid="hero-page">Hero Page - {idSlug}</div>;
  },
}));
vi.mock('@/heroes/pages/search/SearchPage', () => ({
  default: () => <div data-testid="search-page">Search Page</div>,
}));

describe('appRouter', () => {
  test('should be configured as expected', () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  test('should render home page at root path', () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('home-page')).toBeDefined();
  });

  test('should render hero page at /heroes/:idSlug path', () => {
    const idSlug = 'superman';
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: [`/heroes/${idSlug}`],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('hero-page')).toBeDefined();
    expect(screen.getByTestId('hero-page').innerHTML).toContain(idSlug);
  });

  test('should render search page at /search path', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/search'],
    });
    render(<RouterProvider router={router} />);

    // expect(await screen.findByText('Búsqueda de Superhéroes')).toBeDefined();
    expect(await screen.findByTestId('search-page')).toBeDefined();
  });

  test('should render admin page at /admin path', () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/admin'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('admin-page')).toBeDefined();
  });

  test('should redirect to home page for unknown routes', () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/abc'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('home-page')).toBeDefined();
  });
});
