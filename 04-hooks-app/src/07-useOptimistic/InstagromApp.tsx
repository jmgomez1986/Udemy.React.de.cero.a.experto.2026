import { useOptimistic, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface Comment {
  id: string;
  text: string;
  optimistic?: boolean;
}

export const InstagromApp = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: crypto.randomUUID(), text: '¡Gran foto!' },
    { id: crypto.randomUUID(), text: 'Me encanta 🧡' },
  ]);

  const [isPending, startTransition] = useTransition();

  const [optimisticComments, addOptimisticComments] = useOptimistic(
    comments,
    (currentComments, newCommentText: string) => {
      return [
        ...currentComments,
        {
          id: crypto.randomUUID(),
          text: newCommentText,
          optimistic: true,
        },
      ];
    },
  );

  const handleAddComment = async (formData: FormData) => {
    const postMessage = formData.get('post-message') as string;
    console.log('Nuevo comentario: ', postMessage);

    addOptimisticComments(postMessage);

    startTransition(async () => {
      // Simular peticion http
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // setComments((prev) => [
      //   ...prev,
      //   {
      //     id: crypto.randomUUID(),
      //     text: postMessage,
      //     optimistic: false,
      //   },
      // ]);

      //! Simular error
      setComments((prev) => prev);
      toast.error('Error al enviar el comentario', {
        description: 'Intenta nuevamente',
        duration: 10_000, // se pueden usar guion bajo para separar los miles -> 10_000 === 10000 son 10 segundos
        position: 'top-right',
        action: {
          label: 'Cerrar',
          onClick: () => toast.dismiss(),
        },
      });
    });
  };

  return (
    <div className="bg-slate-700 h-screen flex flex-col items-center justify-center">
      {/* Post de ejemplo */}
      <div className="flex flex-col items-center justify-center bg-gray-300 rounded-t-3xl p-4 w-125">
        <img
          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop"
          alt="Instagrom"
          className="object-cover rounded-xl mb-4"
        />
        <p className="text-black font-bold mb-4">
          Mira que interesante esta funcionalidad de la API de React.
        </p>
      </div>

      {/* Comentarios */}
      <ul className="flex flex-col items-start justify-center bg-gray-300 w-125 p-4">
        {optimisticComments.map((comment) => (
          <li key={comment.id} className="flex items-center gap-2 mb-2">
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white text-center">A</span>
            </div>
            <p className="text-black">{comment.text}</p>
            {comment.optimistic && (
              <span className="text-gray-500 text-sm">enviando... </span>
            )}
          </li>
        ))}
      </ul>

      {/* Formulario de comentarios */}
      <form
        action={handleAddComment}
        className="flex flex-col items-center justify-center bg-gray-300 w-125 rounded-b-3xl p-4"
      >
        <input
          type="text"
          name="post-message"
          placeholder="Escribe un comentario"
          required
          className="w-full p-2 rounded-md mb-2 text-black bg-white"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
