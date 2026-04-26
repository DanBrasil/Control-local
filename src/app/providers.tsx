import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ConfirmDialogProvider } from "../shared/hooks/useConfirmDialog";
import { ToastProvider } from "../shared/hooks/useToast";
import { GlobalStyles } from "../styles/GlobalStyles";
import { theme } from "../styles/theme";

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ConfirmDialogProvider>
          <ToastProvider>
            <GlobalStyles />
            {children}
          </ToastProvider>
        </ConfirmDialogProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
