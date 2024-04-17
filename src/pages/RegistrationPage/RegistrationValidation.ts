import * as Yup from "yup";

const requiredText: string = "Ennek a mezőnek a kitöltése kötelező";

export const RegistrationValidation = Yup.object().shape({
  email: Yup.string().required(requiredText),
  name: Yup.string().required(requiredText),
  password: Yup.string().required(requiredText),
  passwordAgain: Yup.string()
    .required(requiredText)
    .oneOf([Yup.ref("password")], "A jelszavak nem egyeznek meg"),
});
