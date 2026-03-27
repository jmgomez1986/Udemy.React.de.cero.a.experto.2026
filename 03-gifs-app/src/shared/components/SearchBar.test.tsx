import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  test('should render searchbar correctly', () => {
    const { container } = render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Buscar...');

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
    expect(input).toBeDefined();
  });

  test('should call onSearch with the correct value after 700ms', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onSearch={onQuery} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'TEST' } });

    // await new Promise((resolve) => setTimeout(resolve, 701));
    // expect(onQuery).toHaveBeenCalled();
    // expect(onQuery).toHaveBeenCalledWith('TEST');

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith('TEST');
    });
  });

  test('should call only once whith the last value (debonce)', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onSearch={onQuery} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'T' } });
    fireEvent.change(inputElement, { target: { value: 'TE' } });
    fireEvent.change(inputElement, { target: { value: 'TES' } });
    fireEvent.change(inputElement, { target: { value: 'TEST' } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledWith('TEST');
      expect(onQuery).toHaveBeenCalledTimes(1);
    });
  });

  test('should call onQuery when button clicked with the input value', () => {
    const onQuery = vi.fn();
    render(<SearchBar onSearch={onQuery} />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button');
    fireEvent.change(inputElement, { target: { value: 'TEST' } });
    fireEvent.click(buttonElement);

    expect(onQuery).toHaveBeenCalledWith('TEST');
    expect(onQuery).toHaveBeenCalledTimes(1);
  });

  test('should the input has the correct placeHolder value', () => {
    const inputPlaceholder = 'Busca el gif que necesitas';
    render(
      <SearchBar inputPlaceholder={inputPlaceholder} onSearch={() => {}} />,
    );

    const input = screen.getByPlaceholderText(inputPlaceholder);

    expect(input).toBeDefined();
  });

  test('should handleKeyDown called with key is ENTER', () => {
    const onQuery = vi.fn();
    render(<SearchBar onSearch={onQuery} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.keyDown(inputElement, { key: 'Enter' });

    expect(onQuery).toHaveBeenCalled();
  });

  test('should handleKeyDown called with key is NOT ENTER', () => {
    const onQuery = vi.fn();
    render(<SearchBar onSearch={onQuery} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.keyDown(inputElement, { key: '' });

    expect(onQuery).not.toHaveBeenCalled();
  });
});
