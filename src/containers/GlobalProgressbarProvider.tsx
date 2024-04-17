import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { LinearProgressProps } from "@mui/material/LinearProgress/LinearProgress";
import { LinearProgress } from "@mui/material";

interface GlobalProgressbarContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  progressbarProps?: LinearProgressProps;
}

const globalProgressbarContext = createContext<GlobalProgressbarContext>({
  isLoading: false,
  setIsLoading: () => {},
});

const GlobalProgressbarProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [progressbarProps] = useState<LinearProgressProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <globalProgressbarContext.Provider
      value={{ progressbarProps, isLoading, setIsLoading }}
    >
      {children}
    </globalProgressbarContext.Provider>
  );
};
export const useGlobalProgressbarContext = () =>
  useContext(globalProgressbarContext);

export const GlobalProgressbar = () => {
  const { progressbarProps, isLoading } = useGlobalProgressbarContext();
  if (!isLoading) return null;

  return (
    <LinearProgress
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: ({ spacing }) => spacing(0.5),
      }}
      {...progressbarProps}
    />
  );
};

export default GlobalProgressbarProvider;
