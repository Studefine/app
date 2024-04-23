import { useMutation } from "react-query";
import { registration } from "../../../api/user";
import { UseFormSetError } from "react-hook-form/dist/types/form";
import { RegistrationParameters } from "../RegistrationPage";
import { useNavigate } from "react-router-dom";

import {useSnackbarContext} from "../../../containers/SnackbarProvider";

export const useRegistration = (
  setError: UseFormSetError<RegistrationParameters>,
) => {
  const navigate = useNavigate();
  const { open } = useSnackbarContext();

  return useMutation("registration", registration, {
    onSuccess: (_, variables) => {
      navigate("/registration/success", { state: { email: variables.email } });
    },
    onError: (error: Error) => {
      if (error.message === "EMAIL_IS_ALREADY_EXISTS") {
        setError("email", {
          message: "Ez az e-mail cím már regisztrálva van.",
        });
      } else {
        open({ message: error });
      }
    },
  });
};
