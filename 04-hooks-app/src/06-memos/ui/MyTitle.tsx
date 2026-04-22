import React from 'react';

interface Props {
  title: string;
}

export const MyTitle = React.memo(({ title }: Props) => {
  console.log('My title re-render');
  return <div className="text-4xl font-bold">{title}</div>;
});
