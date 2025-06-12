import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  IconButton
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const PendingOrders = ({ orders }) => {
  const pendingOrders = orders.filter((order) => order.status === "pending");

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Pedidos Pendientes
      </Typography>
      {pendingOrders.length > 0 ? (
        pendingOrders.map((order) => (
          <Card key={order.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pedido ID: {order.orderId}
              </Typography>
               <Typography>
                <strong>{order.orderDate}</strong> {order.orderDni}
              </Typography>
              <Chip key={order.id+77} label="Pendiente" color="info"  sx={{ marginBottom: 2 }} />
              <Chip key={order.id} label={order.delivery='retiro'? 'Retira' : 'Envio Domicilio'} color={order.delivery='retiro'? 'warning' : 'info'} sx={{ marginBottom: 2 }} />
              <Typography>
                <strong>{order.customerName}</strong>  <strong>{order.customerEmail}</strong> 
                <IconButton
                    color="primary"
                    onClick={() => {
                      navigator.clipboard.writeText(order.customerEmail);
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
              </Typography>
              🏠{order.deliveryAddress}
             
              <Typography>
                <strong>{order.customerPhone}</strong> 
                <IconButton
                    component="a"
                    href={`https://wa.me/${order.customerPhone}`}
                    target="_blank"
                  >
                    <WhatsAppIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      navigator.clipboard.writeText(order.customerPhone);
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
              </Typography>
              <hr />
              <List>
                {order.items.map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText
                      primary={`|${item.productId}#${item.name}| $ ${item.price}`}
                      secondary={`Cantidad: ${item.quantity}`}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Typography variant="h6" gutterBottom>
                Total: ${order.totalPrice}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No hay pedidos pendientes.</Typography>
      )}
    </Box>
  );
};

export default PendingOrders;
