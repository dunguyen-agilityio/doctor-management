import { createContext, useState } from 'react';

export const FocusContext = createContext(false);
export const FocusDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

export const FocusProvider = ({ children }: React.PropsWithChildren) => {
  const [focus, setFocus] = useState(false);

  return (
    <FocusDispatchContext.Provider value={setFocus}>
      <FocusContext.Provider value={focus}>{children}</FocusContext.Provider>
    </FocusDispatchContext.Provider>
  );
};
