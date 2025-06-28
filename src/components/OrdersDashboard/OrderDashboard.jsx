import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid, List, ListItem, ListItemText, Checkbox } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { updateOrderStatus } from "../../api/api";

const OrdersDashboard = ({ orders , ordersPending }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Fecha actual
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    const dateFiltered = orders.filter(order => order.orderDate === selectedDate);
    const pending = ordersPending;
    setFilteredOrders(dateFiltered);
    setPendingOrders(pending);
  }, [orders, selectedDate]);

  const markAsDelivered = (orderId) => {
    updateOrderStatus(orderId, "delivered")
      .then(() => {
        // Actualizar la lista de pedidos pendientes
        setPendingOrders(pendingOrders.filter(order => order.id !== orderId));
    })
      .catch((err) => console.error("Error updating order status:", err));
  };
  

  // Agrupar pedidos por fecha para calcular la cantidad de pedidos
  const dailyData = orders.reduce((acc, order) => {
    const day = order.orderDate;
    acc[day] = (acc[day] || 0) + 1; // Contar el pedido
    return acc;
  }, {});

  const chartData = Object.entries(dailyData).map(([date, orderCount]) => ({ date, orderCount }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Pedidos para la fecha: {selectedDate}</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis label={{ value: "Cantidad de pedidos", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="orderCount" fill="#8884d8" onClick={(data) => setSelectedDate(data.date)} />
          </BarChart>
        </ResponsiveContainer>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            
            <List>
              {pendingOrders.map((order) => (
                <ListItem key={order.orderId+99} disablePadding>
                  <Checkbox onClick={() => markAsDelivered(order.id)} />
                  <ListItemText
                    primary={`Pedido #${order.orderId} - ${order.customerName}`}
                    secondary={`Total: $${order.totalPrice}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OrdersDashboard;
