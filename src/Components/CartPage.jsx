import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = ({ cart, updateQuantity, removeItem }) => {
  const overallTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 }, backgroundColor: '#f4f4f4' }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="outlined" sx={{ marginBottom: 2 }}>
          ⬅ Back To Home
        </Button>
      </Link>

      <Typography variant="h4" gutterBottom>Your Cart</Typography>

      {cart.length > 0 ? (
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer component={Paper}>
            <Table 
              sx={{ 
                minWidth: 650, 
                display: { xs: "block", sm: "table" }, // Show table on larger screens, block on mobile
                overflowX: "auto"
              }} 
              aria-label="cart table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <img
                        src={item.mobileImage}
                        alt={item.name}
                        style={{ width: '80px', height: 'auto' }}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                          flexWrap: "nowrap",
                        }}
                      >
                        <Button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          sx={{
                            minWidth: "30px",
                            padding: "5px",
                            fontSize: "18px",
                            "@media (max-width: 600px)": {
                              minWidth: "25px",
                              fontSize: "14px",
                            },
                          }}
                          variant="contained"
                        >
                          -
                        </Button>

                        <Typography
                          variant="body1"
                          component="span"
                          sx={{
                            width: "40px",
                            textAlign: "center",
                            "@media (max-width: 600px)": {
                              fontSize: "14px",
                            },
                          }}
                        >
                          {item.quantity}
                        </Typography>

                        <Button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          sx={{
                            minWidth: "30px",
                            padding: "5px",
                            fontSize: "18px",
                            "@media (max-width: 600px)": {
                              minWidth: "25px",
                              fontSize: "14px",
                            },
                          }}
                          variant="contained"
                        >
                          +
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>${(item.price).toFixed(2)}</TableCell>
                    <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => removeItem(item._id)}
                        color="error"
                        sx={{
                          minWidth: "40px",
                          padding: "5px",
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Typography variant="h6">Your cart is empty.</Typography>
      )}

      {cart.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Overall Total: ${overallTotal.toFixed(2)}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;