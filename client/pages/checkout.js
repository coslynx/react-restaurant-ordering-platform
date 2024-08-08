import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import  as Yup from 'yup';
import { createOrder } from '../../redux/orderSlice';
import { useRouter } from 'next/router';

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useSelector((state) => state.theme);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      paymentMethod: 'card', // Default payment method
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email format').required('Required'),
      phone: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Create the order in Redux
        await dispatch(createOrder({ ...values, items: cartItems }));
        // Clear cart after successful order creation
        dispatch(clearCart());
        setIsLoading(false);
        // Redirect to the order tracking page
        router.push('/order-tracking');
      } catch (error) {
        setIsLoading(false);
        console.error('Error placing order:', error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
        Checkout
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            {/ Add Payment Method Selection Here /}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" color="primary">
                Place Order
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default CheckoutPage;