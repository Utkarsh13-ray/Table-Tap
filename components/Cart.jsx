import { useStateContext } from "../context/stateContext";

const Cart = (props) => {
  const { totalPrice, cartItems } = useStateContext()
  function toTitleCase(str) {
    const titleCase = str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  
    return titleCase;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="p-4">
        <h1 className="text-xl font-bold">Your Cart</h1>
          <div className="my-2 ">
            {cartItems.map((item, ind) => (
                <div key={ind} className="flex w-60 justify-between border-b rounded p-1">
                    <div>
                        <h1 className="text-lg">{toTitleCase(item.name)}</h1>
                        <h3 className="text-xs font-semibold">Quantity {item.quantity}</h3>
                    </div>
                    <div>
                        ₹{item.quantity*item.price}
                    </div>
                </div>
            ))}
          </div>
          <div className="text-lg font-bold">Total-₹{totalPrice}</div>
          <button
            onClick={() => props.placeOrder()}
            className="p-2 mt-2 w-full bg-secondary text-white rounded-md"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
