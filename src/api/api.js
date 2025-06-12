const API_BASE_URL = import.meta.env.VITE_API_URL;

// Obtener products desde la API
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
// Filtrar pedidos por fechas y estado
export const filterOrders = async (startDate, endDate, status) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/orders/filter?startDate=${startDate}&endDate=${endDate}&status=${status}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching filtered orders: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching filtered orders:", error);
    throw error;
  }
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error(`Error creating product: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Actualizar un producto
export const updateProduct = async (productId, productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error(`Error updating product: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error deleting product: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Obtener orders desde la API
export const getOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) {
      throw new Error(`Error fetching orders: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Actualizar un pedido como entregado
export const markOrderAsDelivered = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado: "entregado" }),
    });
    if (!response.ok) {
      throw new Error(`Error updating order: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// Obtener detalles de un pedido
export const getOrderDetails = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    if (!response.ok) {
      throw new Error(`Error fetching order details: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};