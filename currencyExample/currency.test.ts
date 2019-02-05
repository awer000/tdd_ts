import {Money, Bank, Expression, Sum} from './currency';

test('dollar multiple', () => {
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
  const five = Money.dollar(5);
  const sum = five.plus(five)
  const bank = new Bank();
  const reduced = bank.reduce(sum, 'USD')
  expect(Money.dollar(10)).toMatchObject(reduced)
})

test('test plus returns sum', () => {
  const five = Money.dollar(5);
  const result = five.plus(five);
  const sum = result;
  expect(five).toBe(sum.augend);
  expect(five).toBe(sum.addend);
})

test('test reduce sum', () => {
  const sum: Expression = new Sum(Money.dollar(1), Money.dollar(14));
  const bank: Bank = new Bank();
  const result: Money = bank.reduce(sum, 'USD');
  expect(Money.dollar(15)).toMatchObject(result)
})

test('reduce money', () => {
  const bank:Bank = new Bank();
  const result: Money = bank.reduce(Money.dollar(1), 'USD');
  expect(Money.dollar(1)).toMatchObject(result);
})

test('reduce money different currency', () => {
  const bank:Bank = new Bank();
  bank.addRate('CHF', 'USD', 2);
  const result:Money = bank.reduce(Money.franc(2), 'USD');
  expect(Money.dollar(1)).toMatchObject(result);
})

test('identity rate', () => {
  expect(1).toBe(new Bank().rate('USD', "USD"))
  expect(1).toBe(new Bank().rate('CHF', "CHF"))
})

test('mixed addition', () => {
  const fiveBucks:Expression = Money.dollar(5);
  const tenFrancs:Expression = Money.franc(10);
  const bank = new Bank();
  bank.addRate('CHF', 'USD', 2);
  const result = bank.reduce(fiveBucks.plus(tenFrancs), 'USD');
  expect(Money.dollar(10)).toMatchObject(result)
})

test('sum plus money', () => {
  const fiveBucks = Money.dollar(5);
  const tenFrancs = Money.franc(10);
  const bank:Bank = new Bank();
  bank.addRate('CHF', 'USD', 2);
  const sum = new Sum(fiveBucks, tenFrancs).plus(fiveBucks);
  const result = bank.reduce(sum, 'USD')
  expect(Money.dollar(15)).toMatchObject(result);
})