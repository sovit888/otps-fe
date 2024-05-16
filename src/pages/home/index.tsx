import { Box, Button, Stack, Typography } from "@mui/material";
import PinInput from "../../components/PinInput";
import { useFormik } from "formik";
import { otpSchema } from "../../schema/opt.schema";
import axiosInstance from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/otp", values);
        console.log(response.data, "hahha");
        console.log(response);
        toast.success("Successfully verified", {
          autoClose: 1200,
        });
        setTimeout(() => {
          navigate("/success");
        }, 1200);
      } catch (error) {
        toast.error("Error", {
          autoClose: 1200,
        });
      }
    },
  });
  return (
    <>
      <ToastContainer position="top-right" />
      <form onSubmit={formik.handleSubmit}>
        <Stack textAlign={"center"} spacing={"20px"}>
          <Typography fontSize={"40px"} fontWeight={700}>
            Verification Code:
          </Typography>
          <Box>
            <PinInput
              count={6}
              error={!!formik.errors?.code}
              handleChange={(data: string) => {
                formik.setFieldValue("code", data);
              }}
            />
            {formik.errors?.code && (
              <Typography sx={{ color: "red" }}>
                {formik.errors?.code}
              </Typography>
            )}
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#192A56",
                p: "10px 30px",
                "&:hover": {
                  background: "#192A56",
                  opacity: 0.8,
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </form>
    </>
  );
};

export default HomePage;
