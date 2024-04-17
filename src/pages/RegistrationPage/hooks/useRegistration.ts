import { useMutation } from "react-query";
import { registration } from "../../../api/user";
import { UseFormSetError } from "react-hook-form/dist/types/form";
import { RegistrationParameters } from "../RegistrationPage";

type RegistrationErrorType = "ALREADY_EXISTS";
export const useRegistration = (
  setError: UseFormSetError<RegistrationParameters>,
) => {
  return useMutation("registration", registration, {
    onError: (error: { message: RegistrationErrorType }) => {
      setError("email", {
        message:
          error.message === "ALREADY_EXISTS"
            ? "Ez az e-mail cím már regisztrálva van."
            : "",
      });
    },
  });
};
