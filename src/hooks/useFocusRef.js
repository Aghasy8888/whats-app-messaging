import { useEffect } from 'react';

const useFocusRef = (inputRef, dependencies, cursorAtStart = false) => {
  useEffect(() => {
    const setSelectionRangeExists =
      typeof inputRef?.current?.setSelectionRange === 'function';
    const focusExists = typeof inputRef?.current?.focus === 'function';

    if (inputRef.current && focusExists) {
      inputRef.current.focus();
      if (cursorAtStart && setSelectionRangeExists) {
        inputRef.current.setSelectionRange(0, 0);
      }
    }
  }, [inputRef, ...dependencies]);
};

export default useFocusRef;
