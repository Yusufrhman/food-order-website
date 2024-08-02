import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/userProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header />
        <Meals />
        <Checkout />
        <Cart></Cart>
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
