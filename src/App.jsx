import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Badge, Container, Typography, Box, Grid } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Card from "./Components/comp";
import { data } from "./Products/Cards";
import CartPage from "./Components/cartpage";
import Carousel from "./Components/Carousel";

const App = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      );
    } else {
      setCart([...cart, item]);
    }
  };

  return (
    <Box>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Cart
          </Typography>
          {location.pathname !== "/cart" && (
            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {location.pathname === "/" && (
        <Box sx={{ textAlign: "center", p: 2, backgroundColor: "#f5f5f5" }}>

          <marquee behavior="" direction="rtl">
            <Typography variant="h5" color="primary" fontWeight="bold">
            🛒✨ Welcome to my cart – Grab the Best Deals on Groceries, Fresh Vegetables, Dry Fruits, and Moreee.....
            </Typography>

          </marquee>
        </Box>
      )}

      {location.pathname !== "/cart" && <Carousel />}

      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route
            path="/"
            element={
              <Grid container spacing={2} justifyContent="center">
                {data.map((item) => (
                  <Grid item xs={6} sm={6} md={4} lg={3} key={item._id}>
                    <Card data={item} addToCart={addToCart} />
                  </Grid>
                ))}
              </Grid>
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                updateQuantity={(id, quantity) => {
                  if (quantity > 0) {
                    updateQuantity(id, quantity);
                  } else {
                    removeItem(id);
                  }
                }}
                removeItem={removeItem}
              />
            }
          />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;