export type TStateDispatchAction<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
];
