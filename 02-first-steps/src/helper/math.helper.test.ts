import { describe, expect, test } from 'vitest';
import { add, divide, multiply, subtract } from './math.helper';

describe('add helper', () => {
  test('should add two positive numbers', () => {
    // !Arrange
    const a = 1;
    const b = 1;
    // !Act
    const result = add(a, b);
    // !Assert
    expect(result).toBe(a + b);
  });

  test('should add two negative numbers', () => {
    // !Arrange
    const a = -2;
    const b = -4;
    // !Act
    const result = add(a, b);
    // !Assert
    expect(result).toBe(a + b);
  });
});

describe('subtract helper', () => {
  test('should subtract two positive numbers', () => {
    // !Arrange
    const a = 5;
    const b = 3;
    // !Act
    const result = subtract(a, b);
    // !Assert
    expect(result).toBe(a - b);
  });

  test('should subtract two negative numbers', () => {
    // !Arrange
    const a = -2;
    const b = -4;
    // !Act
    const result = subtract(a, b);
    // !Assert
    expect(result).toBe(a - b);
  });
});

describe('multiply helper', () => {
  test('should multiply two positive numbers', () => {
    // !Arrange
    const a = 5;
    const b = 3;
    // !Act
    const result = multiply(a, b);
    // !Assert
    expect(result).toBe(a * b);
  });

  test('should multiply two negative numbers', () => {
    // !Arrange
    const a = -2;
    const b = -4;
    // !Act
    const result = multiply(a, b);
    // !Assert
    expect(result).toBe(a * b);
  });

  test('should multiply positive number with zero', () => {
    // !Arrange
    const a = 5;
    const b = 0;
    // !Act
    const result = multiply(a, b);
    // !Assert
    expect(result).toBe(0);
  });
});

describe('divide helper', () => {
  test('should divide two positive numbers', () => {
    // !Arrange
    const a = 6;
    const b = 2;
    // !Act
    const result = divide(a, b);
    // !Assert
    expect(result).toBe(a / b);
  });

  test('should divide two negative numbers', () => {
    // !Arrange
    const a = -6;
    const b = -2;
    // !Act
    const result = divide(a, b);
    // !Assert
    expect(result).toBe(a / b);
  });

  test('should divide a positive number by zero', () => {
    // !Arrange
    const a = 5;
    const b = 0;
    // !Act
    const result = divide(a, b);
    // !Assert
    expect(result).toBe(Infinity);
  });
});
