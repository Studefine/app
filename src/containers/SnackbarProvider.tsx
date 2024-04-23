import {AlertProps} from "@mui/material/Alert/Alert";
import React, {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
} from "react";
import {errorCodes} from "../types/errorCodes";
import {Alert, Snackbar, SnackbarProps} from "@mui/material";

type IOpenProps = {
    duration?: number;
    color?: AlertProps["severity"];
    message: string | Error;
};
type IOpen = (props: IOpenProps) => void;
const SnackbarContext = createContext<{ open: IOpen }>({
    open: () => {
    },
});
const AUTO_HIDE_DURATION = 5000;
export const SnackbarProvider: FC<PropsWithChildren> = ({children}) => {
    const [autoHideDuration, setAutoHideDuration] =
        useState<number>(AUTO_HIDE_DURATION);
    const [message, setMessage] = useState<string>("");
    const [alertColor, setAlertColor] = useState<AlertProps["severity"]>("error");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const open: IOpen = ({duration = AUTO_HIDE_DURATION, color, message}) => {
        setAutoHideDuration(duration);
        if (typeof message === "string") {
            setAlertColor(color);
            setMessage(message);
        } else {
            setAlertColor("error");

            try {
                setMessage(errorCodes[message.message as keyof typeof errorCodes]);
            } catch (e) {
                setMessage("Valami nemvárt hiba történt");
            }
        }
        setIsOpen(true);
    };
    const handleClose: SnackbarProps["onClose"] = (_, reason) => {
        if (reason === "clickaway") return;

        setIsOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{open}}>
            <Snackbar
                open={isOpen}
                onClose={handleClose}
                message={message}
                autoHideDuration={autoHideDuration}
            >
                <Alert severity={alertColor} variant="filled" sx={{width: "100%"}}>
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </SnackbarContext.Provider>
    );
};
export const useSnackbarContext = () => useContext(SnackbarContext);