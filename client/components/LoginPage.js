import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button, Box, Alert } from '@mui/material';
import { useFormik } from 'formik';
import  as Yup from 'yup';
import { loginUser } from '../../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.theme);
  const [loginError, setLoginError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser(values));
        setLoginError(null);
        router.push('/');
      } catch (error) {
        setLoginError(error.message);
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
        Login
      </Typography>
      {loginError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loginError}
        </Alert>
      )}
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
        <Grid container spacing={3}>
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
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;