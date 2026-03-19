import { useEffect, useState } from 'react';

interface Props {
  inputPlaceholder?: string;
  buttonTitle?: string;
  onSearch: (searchTerm: string) => void;
}

export const SearchBar = ({
  inputPlaceholder = 'Buscar...',
  buttonTitle = 'Buscar',
  onSearch,
}: Props) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      onSearch(query);
    }, 700);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [query, onSearch]);

  const handleSearch = () => {
    onSearch(query);
    setQuery('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={inputPlaceholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}> {buttonTitle} </button>
    </div>
  );
};
