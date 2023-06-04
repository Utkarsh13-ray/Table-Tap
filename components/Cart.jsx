import { useStateContext } from "../context/stateContext";

const Cart = (props) => {
  const { totalPrice, cartItems } = useStateContext()

  return (
    <>
      <div className="flex flex-col">
        <div className="text-black p-4">
        <h1 className="text-xl font-bold">Your Cart</h1>
          <div className="my-2">
            {cartItems.map((item, ind) => (
                <div key={ind} className="flex w-60 justify-between">
                    <div>
                        <h1 className="text-lg">{item.name}</h1>
                        <h3 className="text-xs font-semibold">Quantity {item.quantity}</h3>
                    </div>
                    <div>
                        Total {item.quantity*item.price}
                    </div>
                </div>
            ))}
          </div>
          <div className="text-lg font-bold">Total-{totalPrice}</div>
          <button
            onClick={() => props.placeOrder()}
            className="p-2 mt-2 w-full bg-highlight rounded-md"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
