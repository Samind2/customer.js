class Customer {
  orders = [];
  constructor(name, address) {
      this.name = name;
      this.address = address;
  }
  addOrder(order){
      this.orders.push(order);
  }
}

class Order {
  payment = null;
  orderDetails = [];
  constructor(date, status) {
      this.date = date;
      this.status = status;
  }
  calcSubTotal() {
      let subTotal = 0;
      for(let i = 0; i< this.orderDetails.length; i++){
          subTotal += this.orderDetails[i].calcSubTotal();
      }
      return subTotal
  }
  calcTax() {
      let tax = 0;
      for(let i = 0; i< this.orderDetails.length; i++){
          tax += this.orderDetails[i].calcTax();
      }
      return tax
  }
  calcTotal() {
      return this.calcSubTotal() + this.calcTax();
  }
  calcTotalWeight() {
      let weight = 0;
      for(let i = 0; i< this.orderDetails.length; i++){
          weight += this.orderDetails[i].calcTotalWeight();
      }
      return weight;
  }
  addPayment(payment) {
      this.payment = payment;
  }
  addOrderDetail(orderDetail) {
      this.orderDetails.push(orderDetail);
  }
}

class OrderDetail {
      item = null;
  constructor(quantity, taxStatus) {
      this.quantity = quantity;
      this.taxStatus = taxStatus;
  }
  calcSubTotal() {
      return this.item.getPriceForQuantity(this.quantity);
  }
  calcTax() {
      return this.item.getTax(this.taxStatus);
  }
  calcTotalWeight() {
      return this.item.shippingWeight;
  }
  addItem(item) {
      this.item = item;
  }
}

class Item {
  inStock = true;
  constructor(shippingWeight, description, price) {
      this.shippingWeight = shippingWeight;
      this.description = description;
      this.price = price;
  }
  setInStock(status){
      this.inStock = status;
  }
  getPriceForQuantity(quantity) {
      return this.price * quantity;
  }
  getTax(taxStatus) {
      if(taxStatus === "Tax included"){
          return 0;
      }
      else{
          return this.price * 0.07;
      }
  }
  inStock() {
      return this.inStock;
  }
}

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
  authorized(){
      console.log("Authorizing Check")
  }
}

class Credit extends Payment {
  constructor(amount, number, type, expDate) {
      super(amount);
      this.number = number;
      this.type = type;
      this.expDate = expDate;
  }
  authorized(){
      console.log("Authorizing Credit Card")
  }
}

//let credit1 = new Credit("shp",1, "0", "10-12-2564");
//credit1.authorized();
//console.log(credit1);

const Oldmain = () => {
  let customer1 = new Customer("Supanee Rungsirat", "Nakhon Pathom");
  //console.log(customer1);
  //product item
  const item1 = new Item(0.3, "อออินวัน", 299);
  const item2 = new Item(0.1, "ป็อปบอมบ์แซ่บ", 39);
  const item3 = new Item(0.2, "เดอะบอกซ์ ออลสตาร์", 159);
  const item4 = new Item(0.2, "ชิคแอนด์แชร์ ทีมนักเก็ตป็อป", 99);
  const item5 = new Item(0.4, "คอมโบข้าวไก่กรอบแกงเขียวหวาน เคเอฟซี", 89);

  //create order
  const order1 = new Order("8/1/2567", "In process");

  //add order to a customer
  customer1.addOrder(order1);
  //console.log(order1);

  //create orderdetail
  const orderDetail1 = new OrderDetail(5, "tax included");
  orderDetail1.addItem(item2);
  const orderDetail2 = new OrderDetail(2, "tax included");
  orderDetail2.addItem(item5);
  // console.log(orderDetail1);

  //add orderdetail to a order
  order1.addOrderDetail(orderDetail1);
  order1.addOrderDetail(orderDetail2);

  //console.log(customer1.orders[0]);

  //Name : Supanee Rungsirat
  //จำนวนคำสั่งซื้อ : 1
  //ลำดับที่ 1 ป็อปบอมบ์แซ่บ จำนวน 5 รายการ ราคา 195 บาท
  //ลำดับที่ 2 คอมโบข้าวได่กรอบแกงเขียวหวาน จำนวน 2 รายการ ราคา 178 บาท
  //รวมทั้งหมด 374 บาท

  console.log(customer1);
  console.log(" ชื่อ : " + customer1.name);
  console.log(" จำนวนคำสั่งซื้อ : " + customer1.orders.length);
  for (let i = 0; i < customer1.orders.length; i++) {
    console.log(" คำสั่งซื้อที่ : " + (i + 1));
    let total = 0;

    //console.log(customer1.orders[i].orderDetail);

    for (let k = 0; k < customer1.orders[i].orderDetails.length; k++) {
      const item = customer1.orders[i].orderDetails[k].item;
      const quantity = customer1.orders[i].orderDetails[k].quantity;
      const subTotal = quantity * item.price;
      total += subTotal;
      console.log(
        " ลำดับที่ " +
          (k + 1) +
          "" +
          item.description +
          " จำนวน " +
          quantity +
          " รายการ " +
          " ราคา " +
          subTotal +
          " บาท "
      );
    }
    console.log(" รวมทั้งหมด " + total + " บาท ");
  }

  //////////////////////////////////////////////////////////////////////

  const order2 = new Order("8/1/2567", "In process");

  //add order to a customer
  customer1.addOrder(order2);
  //console.log(order1);

  //create orderdetail
  const orderDetail3 = new OrderDetail(3, "tax included");
  orderDetail3.addItem(item1);
  const orderDetail4 = new OrderDetail(2, "tax included");
  orderDetail4.addItem(item4);
  // console.log(orderDetail1);

  //add orderdetail to a order
  order2.addOrderDetail(orderDetail3);
  order2.addOrderDetail(orderDetail4);

  //console.log(customer1.orders[0]);

  //Name : Supanee Rungsirat
  //จำนวนคำสั่งซื้อ : 1
  //ลำดับที่ 1 ป็อปบอมบ์แซ่บ จำนวน 5 รายการ ราคา 195 บาท
  //ลำดับที่ 2 คอมโบข้าวได่กรอบแกงเขียวหวาน จำนวน 2 รายการ ราคา 178 บาท
  //รวมทั้งหมด 374 บาท

  console.log(customer1);
  console.log(" ชื่อ : " + customer1.name);
  console.log(" จำนวนคำสั่งซื้อ : " + customer1.orders.length);
  for (let i = 0; i < customer1.orders.length; i++) {
    console.log(" คำสั่งซื้อที่ : " + (i + 1));
    let total = 0;

    //console.log(customer1.orders[i].orderDetail);

    for (let k = 0; k < customer1.orders[i].orderDetails.length; k++) {
      const item = customer1.orders[i].orderDetails[k].item;
      const quantity = customer1.orders[i].orderDetails[k].quantity;
      const subTotal = quantity * item.price;
      total += subTotal;
      console.log(
        " ลำดับที่ " +
          (k + 1) +
          "" +
          item.description +
          " จำนวน " +
          quantity +
          " รายการ " +
          " ราคา " +
          subTotal +
          " บาท "
      );
    }
    console.log(" รวมทั้งหมด " + total + " บาท ");
  }
}

const main = () => {
  // สร้างข้อมูลลูกค้า
  let customer1 = new Customer("Supanee", "Nakhon Pathom");
  let customer2 = new Customer("Arthittaya", "Nakhon Pathom");
  //console.log(customer1);

  // สร้างสินค้า Item
  const item1 = new Item(0.3, "ออลอินวันบักเก็ต", 299);
  const item2 = new Item(0.1, "ป๊อบบอมบ์แซ่บ", 39);
  const item3 = new Item(0.2, "เดอะบอกซ์ ออลสตาร์", 159);
  const item4 = new Item(0.2, "ชิคแอนด์แชร์ ทีมนักเก็ตส์ป๊อป", 159);
  const item5 = new Item(0.4, "คอมโบข้าวไก่กรอบแกงเขียวหวาน เคเอฟซี", 89);

  // สร้างคำสั่งซื้อ Order
  const order1 = new Order("13/01/2567", "In process");
  const order2 = new Order("13/01/2567", "In process");
  const order3 = new Order("13/01/2567", "In process");


  // สร้างรายละเอียดคำสั่งซื้อ OrderDetail
  const orderDetail1 = new OrderDetail(2, "Tex included");
  orderDetail1.addItem(item1);
  const orderDetail2 = new OrderDetail(6, "Tex included");
  orderDetail2.addItem(item2);
  const orderDetail3 = new OrderDetail(2, "Tex included");
  orderDetail3.addItem(item5);
  const orderDetail4 = new OrderDetail(1, "Tex included");
  orderDetail4.addItem(item3);
  const orderDetail5 = new OrderDetail(3, "Tex included");
  orderDetail5.addItem(item4)
  const orderDetail6 = new OrderDetail(1, "Tex included");
  orderDetail6.addItem(item1);

  // เพิ่มคำสั่งซื้อลงในลูกค้าคนที่ 1 
  customer1.addOrder(order1);

  // เพิ่มคำสั่งซื้อลงในลูกค้าคนที่ 2
  customer2.addOrder(order2);
  customer2.addOrder(order3);

  // เพิ่มรายละเอียดคำสั่งซื้อลงใน order1
  order1.addOrderDetail(orderDetail1);
  order1.addOrderDetail(orderDetail2);

  // เพิ่มรายละเอียดคำสั่งซื้อลงใน order2
  order2.addOrderDetail(orderDetail3);
  order2.addOrderDetail(orderDetail4);
  order2.addOrderDetail(orderDetail5);

  // เพิ่มรายละเอียดคำสั่งซื้อลงใน order3
  order3.addOrderDetail(orderDetail6);
  order3.addOrderDetail(orderDetail3);
  order3.addOrderDetail(orderDetail5);


  // แสดงรายละเอียดคำสั่งซื้อลูกค้าคนที่ 1 
  console.log("ชื่อ : " + customer1.name);
  console.log("จำนวนคำสั่งซื้อ : " + customer1.orders.length);
  for (let i = 0; i < customer1.orders.length; i++) {
      console.log("คำสั่งซื้อที่ : " + (i + 1));
      for (let q = 0; q < customer1.orders[i].orderDetails.length; q++) {

          console.log(
              "รายการที่ : " +
              (q + 1) + " " +
              customer1.orders[i].orderDetails[q].item.description +
              " จำนวน " +
              customer1.orders[i].orderDetails[q].quantity +
              " ราคา " +
              customer1.orders[i].orderDetails[q].calcSubTotal() +
              " บาท"
          );
      }
      console.log("รวมทั้งหมด " + customer1.orders[i].calcTotal() + " บาทรวมภาษี");
  }
  console.log("----------------------------------------------------------------------");
  // แสดงรายละเอียดคำสั่งซื้อลูกค้าคนที่ 2
  console.log("ชื่อ : " + customer2.name);
  console.log("จำนวนคำสั่งซื้อ : " + customer2.orders.length);

  customer2.orders.forEach((order, i) => {
      console.log("คำสั่งซื้อที่ : " + (i + 1));

      order.orderDetails.map((orderDetail, q) => {
          console.log(
              "รายการที่ : " +
              (q + 1) + " " +
              orderDetail.item.description +
              " จำนวน " +
              orderDetail.quantity +
              " ราคา " +
              orderDetail.calcSubTotal() +
              " บาท"
          );
      });

      console.log("รวมทั้งหมด " + order.calcTotal() + " บาทรวมภาษี");
  });

}

main();
