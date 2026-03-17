import type { Gif } from '../interfaces/gif.interface';
import { GifItem } from './GifItem';

interface Props {
  gifs: Gif[];
}
export const GifList = ({ gifs }: Props) => {
  return (
    <div className="gifs-container">
      {gifs.map((gif) => (
        <GifItem key={gif.id} gifItem={gif} />
      ))}
    </div>
  );
};
