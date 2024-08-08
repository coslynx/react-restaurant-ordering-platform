import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getOrderById } from '../../utils/api';

const OrderTrackingPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const fetchedOrder = await getOrderById(orderId);
        setOrder(fetchedOrder);
      } catch (error) {
        // Handle errors gracefully
        console.error('Error fetching order:', error);
        // Redirect to an error page or display an error message
        router.push('/error');
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId, router]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
          Order not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
        Order Tracking
      </Typography>
      <Typography variant="h6" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
        Order ID: {order._id}
      </Typography>
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
            {order.items.map((item) => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row" sx={{ color: isDarkMode ? 'white' : 'black' }}>
                  {item.name}
                </TableCell>
                <TableCell align="right" sx={{ color: isDarkMode ? 'white' : 'black' }}>
                  {item.quantity}
                </TableCell>
                <TableCell align="right" sx={{ color: isDarkMode ? 'white' : 'black' }}>
                  ${item.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
          Order Status: {order.status}
        </Typography>
        <Typography variant="body1" gutterBottom align="center" sx={{ color: isDarkMode ? 'white' : 'black' }}>
          Estimated Delivery Time: {order.estimatedDeliveryTime}
        </Typography>
      </Box>
    </Container>
  );
};

export default OrderTrackingPage;