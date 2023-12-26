
class Customer {
  orders = [];
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  addOrder(order) {
    this.orders.push(order);
  }
}
let customer1 = new Customer("Supanee", "Nakhon Pathom");

class Order {
    Payment=null;
    orderDetails=[];
  constructor(date, status){
    this.date = date;
    this.status = status;
  }

  calcSubTotal() {
    console.log("calcSubTotal");
  }

  calcTax() {
    console.log("calcTax");
  }

  calcTotal() {
    console.log("calcTotal");
  }

  calcTotalWeight() {
    console.log("calcTotalWeight");
  }
  addPayment(Payment){
    this.Payment = Payment;
  }
  addOrderDetail(orderDetail){
    this.orderDetail.push(orderDetail);
  }
}
let order1 = new Order("10/12/2564");
order1.calcSubTotal();
order1.calcTax();
order1.calcTotal();
order1.calcTotalWeight();
console.log(order1);


class OrderDetail {
    item = null;
  constructor(quantity, taxStatus) {
    this.quantity = quantity;
    this.taxStatus = taxStatus;
  }

  calcSubTotal() {
    console.log("calcSubTotal");
  }

  calcWeight() {
    console.log("calcWeight");
  }

  calcTax() {
    console.log("calcTax");
  }
  addItem(item){
    this.item=item;
  }
}

let orderDetail1 = new OrderDetail(2, "Taxable");
orderDetail1.calcSubTotal();
orderDetail1.calcWeight();
orderDetail1.calcTax();
console.log(orderDetail1);


class Item {
  constructor(shippingWeight, description, price) {
    this.shippingWeight = shippingWeight;
    this.description = description;
    this.price = price;
  }

  getPriceForQuantity() {
    console.log("getPriceForQuantity");
  }

  getTax() {
    console.log("getTax");
  }

  inStock() {
    console.log("inStock");
  }
}

let item1 = new Item(3, "VeryGood", 150);
item1.getPriceForQuantity();
item1.getTax();
item1.inStock();
console.log(item1);


class Payment {
  constructor(amount) {
    this.amount = amount;
  }
}


class Cash extends Payment {
  constructor(amount, cashTendered) {
    super(amount);
    this.cashTendered = cashTendered;
  }
}

class Check extends Payment {
  constructor(amount, name, bankID) {
    super(amount);
    this.name = name;
    this.bankID = bankID;
  }

  authorized() {
    console.log("authorized");
  }
}

let check1 = new Check(350, "น้ำเจี๊ยบ", "350");
check1.authorized();
console.log(check1);

class Credit extends Payment {
  constructor(amount, number, type, expDate) {
    super(amount);
    this.number = number;
    this.type = type;
    this.expDate = expDate;
  }

  authorized() {
    console.log("authorized");
  }
}

let credit1 = new Credit("shp",1, "0", "10-12-2564");
credit1.authorized();
console.log(credit1);