export interface ErrorBus {
  state: boolean;
  errorCode?: undefined;
}

export const errorBus: ErrorBus = {state: false};
