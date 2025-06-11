import React, { createContext, useContext, useReducer, useEffect } from "react";

// Crear el contexto
const AppContext = createContext();

// Reducer para manejar el estado del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

// Estado inicial del contexto
const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [], // Cargar carrito de localStorage
};

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Efecto para guardar el carrito en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // Funciones para manejar el carrito
  const addToCart = (product, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const calculateTotal = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <AppContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook para usar el contexto
export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
