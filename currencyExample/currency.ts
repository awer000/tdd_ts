export class Money {
  protected amount: number;
  protected currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  static dollar(amount: number) {
    return new Money(amount, 'USD');
  }
  static franc(amount: number) {
    return new Money(amount, 'CHF');
  }

  equals(moneyObj: any) {
    const money = moneyObj;
    return this.amount === money.amount 
      && this.currencyItem() === money.currencyItem();
  }
  times(multiplier: number) {
    return new Money(this.amount * multiplier, this.currency)
  }
  plus(addend:any) {
    return new Money(this.amount + addend.amount, this.currency)
  }
  currencyItem() {
    return this.currency;
  }
}
