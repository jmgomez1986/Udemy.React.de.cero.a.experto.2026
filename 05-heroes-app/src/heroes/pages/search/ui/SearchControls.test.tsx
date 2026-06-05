import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchControls } from './SearchControls';
import { MemoryRouter } from 'react-router';

// Esto es ppor el accodion de shadcn
if (globalThis.ResizeObserver === undefined) {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver = ResizeObserver; // window se reemplaza por globalThis, SONAR lo pide asi
}

const renderSearchControls = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
    </MemoryRouter>,
  );
};

describe('SearchControls', () => {
  test('should render search control with default values', () => {
    const { container } = renderSearchControls();

    expect(container).toMatchSnapshot();
  });

  test('should set input value when search param name is set', () => {
    renderSearchControls(['/?name=Batman']);

    const input = screen.getByPlaceholderText(
      'Search heroes, villains, powers, teams...',
    );
    expect(input.getAttribute('value')).toBe('Batman');
  });

  test('should change params when input is changed and enter is pressed', () => {
    renderSearchControls(['/?name=Batman']);

    const input = screen.getByPlaceholderText(
      'Search heroes, villains, powers, teams...',
    );
    expect(input.getAttribute('value')).toBe('Batman');

    fireEvent.change(input, { target: { value: 'Superman' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input.getAttribute('value')).toBe('Superman');
  });

  test('should change params strenght whe slider changed', () => {
    renderSearchControls([
      '/?name=Batman&active-avanced-search=advanced-filters',
    ]);
    const slider = screen.getByRole('slider');
    expect(slider.getAttribute('aria-valuenow')).toBe('0');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider.getAttribute('aria-valuenow')).toBe('1');
  });

  test('should accordion be open when active-avanced-search param is set', () => {
    renderSearchControls([
      '/?name=Batman&active-avanced-search=advanced-filters',
    ]);

    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('open');
  });

  test('should accordion be open when active-avanced-search param is no set', () => {
    renderSearchControls(['/?name=Batman']);

    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('closed');
  });
});
