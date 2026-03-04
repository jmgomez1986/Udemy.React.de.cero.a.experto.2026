import { useState } from 'react';
// import './ItenCounter.css';
import styles from './ItenCounter.module.css';

interface Props {
  productName: string;
  productQuantity?: number;
}

export const ItemCounter = ({ productName, productQuantity = 0 }: Props) => {
  const [count, setcount] = useState(productQuantity);

  const handleAdd = () => {
    setcount(count + 1);
  };

  const handleSubtract = () => {
    if (count === 0) return;
    setcount(count - 1);
  };

  return (
    <section
      // style={{
      //   display: 'flex',
      //   alignItems: 'center',
      //   gap: '1rem',
      //   marginTop: '1rem',
      // }}
      // className="item-row"
      className={styles['item-row']}
    >
      <span
        className={styles['item-text']}
        style={{ color: count === 0 ? 'red' : 'black' }}
      >
        {productName}
      </span>
      <button onClick={handleSubtract}>-1</button>
      <span>{count}</span>
      <button onClick={handleAdd}>+1</button>
    </section>
  );
};
