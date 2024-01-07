import React from "react";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function AllList() {
  const { user, buy: listToBuy } = useSelector((state) => state);
  const dispatch = useDispatch();

  const remove = (id) => {
    axios.post(`http://localhost:8080/api/bay/delete/:${user}/:${id}`, user, id)
      .then((newbuy) => {
        dispatch({ type: "DELETE_BUY", user: user, id: id });
        alert(" נמחק בהצלחה!!");
      })
      .catch((error) => {
        alert(" error");
      });
  };
  const edit = (buy) => {
    axios.post(`http://localhost:8080/api/bay/edit`, buy).then((buy) => {
      dispatch({ type: "EDIT_BUY", buy: buy });
      alert("המתכון עודכן!!");
    }).catch((error) => {
      alert("המתכון עודכן!!");
    });
  }
  return (
    <Container maxWidth="md">
      <Box mt={3}>
        {listToBuy?.length ? (
          listToBuy.map((item, index) => (
            <Paper key={index} elevation={3} sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}>
              <Typography variant="body1">
                Name: {item.Name}, Count: {item.Count}
              </Typography>
              <Button variant="contained" color="secondary" onClick={() => remove(item?.Id)} sx={{ ml: 2 }}>
                Remove
              </Button>
              <Button variant="contained" color="secondary" onClick={() => edit(item)} sx={{ ml: 2 }}>
                edit
              </Button>
            </Paper>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            No product in the list!!
          </Typography>
        )}
      </Box>
    </Container>
  );
}