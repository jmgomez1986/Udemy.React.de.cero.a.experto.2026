import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { GifList } from './gifs/components/GifList';
import { useGifs } from './gifs/hooks/useGifs';

export const GifsApp = () => {
  const { gifs, previousSearches, handlePreviousSearchClicked, handleSearch } =
    useGifs();

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Gifs App"
        subtitle="Encuentra los mejores gifs"
        description="Busca y comparte gifs de forma fácil"
      />

      {/* Search */}
      <SearchBar
        inputPlaceholder="Busca el gif que necesitas"
        buttonTitle="Buscar"
        onSearch={handleSearch}
      />

      {/* Búsquedas previas */}
      <PreviousSearches
        title="Búsquedas previas"
        previousSearches={previousSearches}
        onLabelClicked={handlePreviousSearchClicked}
      />

      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  );
};
