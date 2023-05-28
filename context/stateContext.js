import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast"

const Context = createContext()

export const StateContext = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)
    const [navHeight, setNavHeight] = useState(0)

    let foundProduct;

    const onAdd = (product, quantity) => {
        if(quantity=== 0) {
            toast.error("Quantity should be atleast 1")
        }
        else{

            const checkProductInCart = cartItems.find((item) => item.id === product.id)
            console.log(checkProductInCart)
            
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

    const incQty = () => {
        setQty((prev) => prev+1)
    }

    const decQty = () => {
        setQty((prev) => {
            if(prev-1 < 1) return 1
            return prev-1
        })
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                setShowCart,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                currentUser,
                setCurrentUser,
                navHeight,
                setNavHeight
            }}
        >
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => (Context)