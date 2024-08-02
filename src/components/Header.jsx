import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/userProgressContext";
function Header() {
  const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);
    
  function handleShowCart() {
    userProgressContext.showCart();
  }

  const totalCartItems = cartContext.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
