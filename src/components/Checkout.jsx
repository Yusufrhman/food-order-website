import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/userProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const Checkout = () => {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  const cartTotal = cartContext.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredData = Object.fromEntries(formData.entries());
    sendRequest(
      JSON.stringify({
        order: { items: cartContext.items, customer: enteredData },
      })
    );
  }

  let actions = (
    <>
      <Button
        type="button"
        textOnly={true}
        onClick={userProgressContext.hideCheckout}
      >
        Close
      </Button>
      <Button>Submit</Button>
    </>
  );
  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressContext.progress === "checkout"}
        onClose={() => {
          clearData();
          userProgressContext.hideCheckout;
          cartContext.clearCart();
        }}
      >
        <h2>Success!</h2>
        <p>Your order submitted successfully.</p>
        <Button type="button" onClick={userProgressContext.hideCheckout}>
          Ok
        </Button>
      </Modal>
    );
  }
  return (
    <Modal
      className="checkout"
      open={userProgressContext.progress === "checkout"}
      onClose={userProgressContext.hideCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Fullname" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to make order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
