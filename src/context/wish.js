import { useState, useContext, createContext, useEffect } from 'react';

//1.
const WishContext = createContext();

//2.
const WishProvider = ({ children }) => {
    const [wish, setWish] = useState([]);

    useEffect(() => {
        let existingCartItem = localStorage.getItem('wish');
        if (existingCartItem) {
            setWish(JSON.parse(existingCartItem))
        }
    }, []);  //[auth]

    return (
        <WishContext.Provider value={[wish, setWish]}>
            {children}
        </WishContext.Provider>
    );
};

//3. custom hook
const useWishlist = () => useContext(WishContext);

//4.
export { useWishlist, WishProvider };