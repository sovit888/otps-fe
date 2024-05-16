import * as yup from "yup";

export const otpSchema = yup.object().shape({
  code: yup
    .string()
    .required("Code is required")
    .min(6, "Please enter all fields"),
});
