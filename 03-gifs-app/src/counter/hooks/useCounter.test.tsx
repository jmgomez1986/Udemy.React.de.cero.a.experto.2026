import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useCounter } from './useCounter';

describe('UseCounter', () => {
  // let result;

  // beforeEach(() => {
  //   const { result: hookValue } = renderHook(() => useCounter());
  //   result = hookValue;
  // });

  test('should initialize with the default value', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(0);
  });

  test('should initialize with initial value', () => {
    const initialValue = 5;
    const { result } = renderHook(() => useCounter(initialValue));

    expect(result.current.counter).toBe(initialValue);
  });

  test('should increment counter when handleAdd is called', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(1);
  });

  test('should decrement counter when handleSubtract is called', () => {
    const { result } = renderHook(() => useCounter(1));

    act(() => {
      result.current.handleSubtract();
    });
    expect(result.current.counter).toBe(0);
  });

  test('should reset counter when handleReset is called', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleAdd();
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(2);

    act(() => {
      result.current.handleReset();
    });
    expect(result.current.counter).toBe(0);
  });
});
