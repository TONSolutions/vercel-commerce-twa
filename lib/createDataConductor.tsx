import { createContext, useContext } from "react";

import type { Context, ReactNode } from "react";

type ContextValues = unknown;

interface CreateDataConductorProviderProps<T> {
  value: T;
  children: ReactNode;
}

interface CreateDataConductorProps {
  displayName: string;
}

const createDataConductorContext = <T extends ContextValues>() =>
  createContext<T | undefined>(undefined);

const createDataConductorProvider = <T extends ContextValues>(
  Context: Context<T | undefined>,
  displayName: string
) =>
  Object.assign(
    ({ value, children }: CreateDataConductorProviderProps<T>) => (
      <Context.Provider value={value}>{children}</Context.Provider>
    ),

    { displayName }
  );

const createUseDataConductor =
  <T extends ContextValues>(context: Context<T | undefined>) =>
  () => {
    const result = useContext(context);

    if (!result) {
      throw new Error("data conductor context is undefined");
    }

    return result;
  };

const createDataConductor = <T extends ContextValues>({
  displayName
}: CreateDataConductorProps) => {
  const DataConductorContext = createDataConductorContext<T>();

  const DataConductorProvider = createDataConductorProvider<T>(DataConductorContext, displayName);

  const useDataConductor = createUseDataConductor<T>(DataConductorContext);

  return {
    DataConductorContext,
    DataConductorProvider,
    useDataConductor
  };
};

export { createDataConductor };
