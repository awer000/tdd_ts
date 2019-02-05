export interface Expression {
  reduce(bank:Bank, to:string):Money;
  plus(addend:Expression): Expression;
}

export class Pair {
  from: string;
  to: string;

  constructor(from:string, to:string) {
    this.from = from;
    this.to = to;
  }

  public equals(obj:Pair):boolean {
    const pair:Pair = obj;
    return this.from === pair.from && this.to === pair.to
  }

  public hashCode() {
    return 0;
  }
}

export class Bank {
  private rates = new Map();
  reduce(source: any, to: string):Money {
    return source.reduce(this, to);
  }
  rate(from:string, to:string) {
    if (from === to) return 1;
    const rate = this.rates.get([from, to].join(""));
    return Number(rate);
  }
  addRate(from:string, to:string, rate:number) {
    this.rates.set([from, to].join(""), rate)
  }
}

export class Sum implements Expression {
  augend: Expression;
  addend: Expression;

  constructor(augend:Expression, addend:Expression) {
    this.augend = augend;
    this.addend = addend;
  }
  public reduce(bank:Bank, to:string):Money {
    const amount:number = this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount;
    return new Money(amount, to)
  }
  public plus(addend: Expression):any {
    return new Sum(this, addend)
  }
}

export class Money implements Expression {
  amount: number;
  currency: string;

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
  times(multiplier: number):Expression {
    return new Money(this.amount * multiplier, this.currency)
  }
  public plus(addend:Expression):Expression {
    return new Sum(this, addend);
  }
  currencyItem() {
    return this.currency;
  }
  reduce(bank:Bank, to:string) {
    const rate:number = bank.rate(this.currency, to);
    return new Money(this.amount / rate, to);
  }
}
