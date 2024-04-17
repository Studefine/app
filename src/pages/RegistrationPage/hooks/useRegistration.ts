import { useMutation } from "react-query";
import { registration } from "../../../api/user";
import { UseFormSetError } from "react-hook-form/dist/types/form";
import { RegistrationParameters } from "../RegistrationPage";
import { useNavigate } from "react-router-dom";

type RegistrationErrorType = "ALREADY_EXISTS";
export const useRegistration = (
  setError: UseFormSetError<RegistrationParameters>,
) => {
  const navigate = useNavigate();

  return useMutation("registration", registration, {
    onSuccess: (_, variables) => {
      navigate("/registration/success", { state: { email: variables.email } });
    },
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
