import { Button, Stack, Typography } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter></BrowserRouter>
      <Stack spacing={"20px"}>
        <Typography>Verification Code:</Typography>
        <Button variant="contained">Hello world</Button>
      </Stack>
    </>
  );
};

export default App;
