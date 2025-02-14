import { useState } from 'react';

const Toggle = ({
  children,
}: {
  children: (params: {
    isToggle: boolean;
    setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: () => void;
  }) => React.ReactNode;
}) => {
  const [isToggle, setIsToggle] = useState(false);

  return children({
    isToggle,
    setIsToggle,
    toggle: () => setIsToggle((prev) => !prev),
  });
};

export default Toggle;
