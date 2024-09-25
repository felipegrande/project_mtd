import { createContext, useState, useContext, ReactNode } from 'react';

interface CartItem {
    name: string;
    quantity: number;
    price: number;
    thumbnail: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addItemToCart: (item: CartItem) => void;
    updateCartItem: (updatedItem: CartItem) => void;
    removeItemFromCart: (name: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addItemToCart = (item: CartItem) => {
        setCartItems((prevItems) => {

            const existingItem = prevItems.find(i => i.name === item.name);

            if (existingItem) {

                return prevItems.map(itens =>
                    itens.name === item.name
                        ? { ...itens, quantity: itens.quantity + 1 }
                        : itens
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const updateCartItem = (updatedItem: CartItem) => {
        setCartItems((prevItems) => {
            return prevItems
                .map((item) =>
                    item.name === updatedItem.name
                        ? { ...item, quantity: updatedItem.quantity }
                        : item
                )
                .filter((item) => item.quantity > 0);
        });
    };

    const removeItemFromCart = (name: string) => {
        setCartItems((prevItems) =>
            prevItems.filter(item => item.name !== name)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, updateCartItem, clearCart, removeItemFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
