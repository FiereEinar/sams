import { createContext, useContext, useState, PropsWithChildren } from 'react';

type UpdateContextType = {
  isUpdating: boolean;
  setIsUpdating: (value: boolean) => void;
};

const UpdateContext = createContext<UpdateContextType>({
  isUpdating: false,
  setIsUpdating: () => {},
});

export function UpdateProvider({ children }: PropsWithChildren) {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <UpdateContext.Provider value={{ isUpdating, setIsUpdating }}>
      {children}
    </UpdateContext.Provider>
  );
}

export function useUpdate() {
  return useContext(UpdateContext);
}
