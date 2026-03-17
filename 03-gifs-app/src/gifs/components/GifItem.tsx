import type { Gif } from '../interfaces/gif.interface';

interface Props {
  gifItem: Gif;
}

export const GifItem = ({ gifItem }: Props) => {
  return (
    <div key={gifItem.id} className="gif-card">
      <img src={gifItem.url} alt={gifItem.title} />
      <h3>{gifItem.title}</h3>
      <p>
        {gifItem.width}x{gifItem.height} (1.5mb)
      </p>
    </div>
  );
};
