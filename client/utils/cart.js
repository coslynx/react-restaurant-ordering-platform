import React from 'react';
import { Container, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { isDarkMode } = useSelector((state) => state.theme);

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price  item.quantity;
    });
    return total;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
          Your cart is empty.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ color: isDarkMode ? 'white' : 'black' }}>Item</TableCell>
                <TableCell align="right" sx={{ color: isDarkMode ? 'white' : 'black' }}>Quantity</TableCell>
                <TableCell align="right" sx={{ color: isDarkMode ? 'white' : 'black' }}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row" sx={{ color: isDarkMode ? 'white' : 'black' }}>
                    {item.name}
                  </TableCell>
                  <TableCell align="right" sx={{ color: isDarkMode ? 'white' : 'black' }}>
                    {item.quantity}
                  </TableCell>
                  <TableCell align="right" sx={{ color: isDarkMode ? 'white' : 'black' }}>
                    ${(item.price  item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'left' }}>
          <Typography variant="h6" gutterBottom sx={{ color: isDarkMode ? 'white' : 'black' }}>
            Total:
          </Typography>
          <Typography variant="h5" sx={{ color: isDarkMode ? 'white' : 'black' }}>
            ${calculateTotal().toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" href="/checkout" disabled={cartItems.length === 0}>
            Proceed to Checkout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;