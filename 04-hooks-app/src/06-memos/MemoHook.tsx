import { useCallback, useState } from 'react';
import { MyTitle } from './ui/MyTitle';
import { MySubtitle } from './ui/MySubtitle';

export const MemoHook = () => {
  const [title, setTitle] = useState('Hola');
  const [subtitle, setSubtitle] = useState('Mundo');

  const handleCallMyAPI = useCallback(() => {
    console.log('Llamando a API - ', subtitle);
  }, [subtitle]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-6xl font-thin text-white">MemoHook</h1>

      <MyTitle title={title} />
      <MySubtitle subtitle={subtitle} callMyAPI={handleCallMyAPI} />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle('Hello')}
      >
        Cambiar Titulo
      </button>

      <button
        className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
        onClick={() => setSubtitle('World')}
      >
        Cambiar Subtitulo
      </button>
    </div>
  );
};
