import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from '../redux/themeSlice';
import { logoutUser } from '../redux/userSlice';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isDarkMode, drawerOpen } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);

  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/login');
  };

  const handleMenuClick = (path) => {
    dispatch(toggleDrawer());
    router.push(path);
  };

  const drawerList = () => (
    <Box
      sx={{
        width: 250,
        bgcolor: isDarkMode ? '#121212' : '#f5f5f5',
        color: isDarkMode ? 'white' : 'black',
      }}
    >
      <List>
        {['/', '/menu', '/cart'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(text)}>
              <ListItemIcon>
                {index === 0 ? <HomeIcon /> : index === 1 ? <MenuBookIcon /> : <ShoppingCartIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        {user && (
          <ListItem key="logout" disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ bgcolor: isDarkMode ? '#121212' : '#f5f5f5', color: isDarkMode ? 'white' : 'black' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          [Restaurant Name]
        </Typography>
        <Button variant="contained" color="primary" href="/menu">
          View Menu
        </Button>
        {user ? (
          <>
            <Button variant="contained" color="primary" href="/cart">
              Cart
            </Button>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" color="primary" href="/login">
              Login
            </Button>
            <Button variant="contained" color="secondary" href="/signup">
              Sign Up
            </Button>
          </>
        )}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Button onClick={handleDrawerToggle}>
            <MenuIcon />
          </Button>
        </Box>
      </Toolbar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ sx: { width: 250 } }}
      >
        {drawerList()}
      </Drawer>
    </AppBar>
  );
};

export default Header;