import React, {
  useCallback,
  memo,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { COLORS } from '@constants';

interface InputProps extends TextInputProps {
  field: string;
  onChangeText?: (value: string, field?: string) => void;
}

export default memo(
  forwardRef<Pick<TextInput, 'focus'>, InputProps>(
    ({ field, onChangeText, ...rest }, ref) => {
      const inputRef = useRef<TextInput>(null);

      useImperativeHandle(ref, () => {
        return {
          focus: () => {
            inputRef.current?.focus();
          },
        };
      });

      const handleChangeInput = useCallback(
        (value: string) => {
          onChangeText?.(value, field);
        },
        [field, onChangeText],
      );

      return (
        <TextInput
          placeholderTextColor={COLORS.SECONDARY}
          onChangeText={handleChangeInput}
          style={[styles.input, { color: COLORS.BLACK }]}
          ref={inputRef}
          {...rest}
        />
      );
    },
  ),
);

const styles = StyleSheet.create({
  input: {
    fontSize: 13,
    fontWeight: '400',
    paddingVertical: 14,
    paddingHorizontal: 60,
  },
});
