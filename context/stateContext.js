import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const Context = createContext()

export const StateContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)

    let foundProduct;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
          console.log("Auth", currentuser);
          setUser(currentuser);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);

    const logIn = async (email, password) => {
        console.log("login called")
        return await signInWithEmailAndPassword(auth, email, password);
      }
      const signUp = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
      }
      const logOut = async () => {
        return await signOut(auth);
      }
    
      

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

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find ((item) => item._id == id)
        index = cartItems.findIndex((product) => product._id === id)
        const newCartItems = cartItems.filter((item) => item._id!==id)

        if(value === 'inc') {
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice((prev) => prev+foundProduct.price)
            setTotalQuantities(prev => prev+1)
        }else if(value === 'dec') {
            if(foundProduct.quantity > 1) {
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}])
            setTotalPrice((prev) => prev-foundProduct.price)
            setTotalQuantities(prev => prev-1)
            }
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
                toggleCartItemQuantity,
                onRemove,
                logIn,
                signUp,
                logOut,
                user,
                setUser
            }}
        >
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)