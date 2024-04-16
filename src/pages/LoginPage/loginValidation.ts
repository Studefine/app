import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  stayLoggedIn: Yup.boolean().required("Ennek a mezőnek a kitöltése kötelező"),
  email: Yup.string().required("Ennek a mezőnek a kitöltése kötelező"),
  password: Yup.string().required(),
});
