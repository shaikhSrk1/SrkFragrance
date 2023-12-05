import { useState, useContext, createContext, useEffect } from 'react';

//1.
const CartContext = createContext();

//2.
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let existingCartItem = localStorage.getItem('cart');
        if (existingCartItem) {
            setCart(JSON.parse(existingCartItem))
        }
    }, []);  //[auth]

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

//3. custom hook
const useCart = () => useContext(CartContext);

//4.
export { useCart, CartProvider };