import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <Container sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "3rem" }}>404 Not found</Typography>
        <Typography>
          Click <Button onClick={handleClick}>here</Button> to go home
        </Typography>
      </Container>
    </>
  );
};

export default ErrorPage;
