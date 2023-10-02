import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast"
import { useEffect } from "react"
import { auth } from "../config/firebase"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";

const Context = createContext()

export const StateContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);

    // Authentication
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => setUser(currentuser));
        return () => unsubscribe()
    }, []);

    const logIn = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }
    const signUp = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }
    const logOut = async () => {
        return await signOut(auth);
    } 
    const passwordReset = async (email) => {
        return await sendPasswordResetEmail(auth, email, { url: "http://localhost:3000/login"});
      }
    
    const confirmThePasswordReset = async (oobCode, newPassword) => {
        if(!oobCode && !newPassword) return;
        return await confirmPasswordReset(auth, oobCode, newPassword)
    }


    //Menu 
    let foundProduct;
    const onAdd = (product, quantity) => {
        if(quantity=== 0) {
            toast.error("Quantity should be atleast 1")
        }
        else{
            const checkProductInCart = cartItems.find((item) => item.id === product.id)

            setTotalPrice((prev) => prev + product.price * quantity)
            setTotalQuantities((prev) => prev + quantity)

            if(checkProductInCart) {
                const updatedCartItems = cartItems.map((item) => {
                    if(item.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + quantity
                        }
                    }
                    return item
                })
                setCartItems(updatedCartItems)
            } else {
            product.quantity = quantity
            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${quantity} ${product.name} added to the cart.`)
    }
    }


    const onRemove = (id) => {
        foundProduct = cartItems.find((item) => item._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id)

        setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(prev => prev - foundProduct.quantity)
        setCartItems(newCartItems)
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                setCartItems,
                setShowCart,
                totalPrice,
                totalQuantities,
                onAdd,
                onRemove,
                logIn,
                signUp,
                logOut,
                user,
                setUser,
                passwordReset,
                confirmThePasswordReset
            }}
        >
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)