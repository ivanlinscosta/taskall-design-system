import { useCallback, useRef, useState } from "react";

type UseControllableStateOptions<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>) {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const valueRef = useRef(value);
  valueRef.current = value;

  const setValue = useCallback(
    (nextValue: T) => {
      if (isControlled) {
        onChange?.(nextValue);
        return;
      }
      setInternalValue(nextValue);
      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [
    isControlled ? (valueRef.current as T) : internalValue,
    setValue,
  ] as const;
}
