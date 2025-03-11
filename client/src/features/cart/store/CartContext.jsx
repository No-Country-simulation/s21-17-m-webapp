import PropTypes from "prop-types";
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estado inicial del carrito desde localStorage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cartItem");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Sincronizar cambios del carrito con localStorage
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cart));
  }, [cart]);

  // Agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingProduct) {
        // Si el producto ya está en el carrito, incrementamos la cantidad
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es un nuevo producto, lo agregamos con cantidad inicial 1
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      return updatedCart;
    });
  };

  // Eliminar un producto completamente del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Incrementar la cantidad de un producto
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Disminuir la cantidad de un producto (mínimo 1)
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : undefined,
              }
            : item
        )
        .filter((item) => item.quantity !== undefined)
    );
  };

  // Vaciar completamente el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Obtener el total de productos en el carrito
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener el total del precio en el carrito
  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => useContext(CartContext);

// Validación de PropTypes
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
