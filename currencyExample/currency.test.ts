import {Money} from './currency';

test('multiple', () => {
  const five = Money.dollar(5);
  expect(Money.dollar(10)).toMatchObject(five.times(2));
  expect(Money.dollar(15)).toMatchObject(five.times(3));
});

test('equels', () => {
  expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
  expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
  expect(Money.franc(5).equals(Money.dollar(5))).toBe(false);
})

test('franc multiple', () => {
  const five = Money.franc(5);
  expect(Money.franc(10)).toMatchObject(five.times(2));
  expect(Money.franc(15)).toMatchObject(five.times(3));
});

test('currency', () => {
  expect(Money.dollar(1).currencyItem()).toBe('USD')
  expect(Money.franc(1).currencyItem()).toBe('CHF')
})

test('add test', () => {
  const sum = Money.dollar(5).plus(Money.dollar(5));
  expect(Money.dollar(10)).toMatchObject(sum)
})