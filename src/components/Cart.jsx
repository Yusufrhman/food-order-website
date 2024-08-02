import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/userProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const cartTotal = cartContext.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  return (
    <Modal
      className="cart"
      open={userProgressContext.progress === "cart"}
      onClose={
        userProgressContext.progress === "cart"
          ? userProgressContext.hideCart
          : null
      }
    >
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartContext.addItem(item)}
            onDecrease={() => cartContext.removeItem(item.id)}
          ></CartItem>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly={true} onClick={userProgressContext.hideCart}>
          Close
        </Button>
        {cartContext.items.length > 0 && (
          <Button textOnly={false} onClick={userProgressContext.showCheckout}>
            Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}
