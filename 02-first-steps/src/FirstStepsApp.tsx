// import { MyAwesomeApp } from './MyAwesomeApp';
import { ItemCounter } from './shopping-cart/ItemCounter';

interface ItemInCart {
  productName: string;
  productQuantity: number;
}

const itemsInCart: ItemInCart[] = [
  {
    productName: 'Nintendo Switch 2',
    productQuantity: 1,
  },
  {
    productName: 'Pro Controller',
    productQuantity: 0,
  },
  {
    productName: 'Super Smash',
    productQuantity: 3,
  },
];

export function FirstStepsApp() {
  return (
    <>
      {/* <h1>Hola Mundo!!!</h1>
      <p>Esto es un párrafo</p>

      <button>Click Me</button>

      <div>
        <h2>Hola dentro de un div</h2>
      </div>

      <MyAwesomeApp /> */}

      <h1>Carrito de compras</h1>

      {/* <ItemCounter productName="Nintendo Switch 2" productQuantity={1} />
      <ItemCounter productName="Pro Controller" />
      <ItemCounter productName="Super Smash" productQuantity={3} /> */}

      {itemsInCart.map((item) => (
        <ItemCounter
          key={item.productName}
          productName={item.productName}
          productQuantity={item.productQuantity}
        />
      ))}
    </>
  );
}
