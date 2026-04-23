const express = require("express");
const cors = require("cors");
const orders = require("./orders");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/orders", (req, res) => {
  const search = (req.query.search || "").trim().toLowerCase();

  let filtered = [...orders];

  if (search) {
    filtered = filtered.filter(order =>
      order.orderId.toLowerCase().includes(search) ||
      order.customer.toLowerCase().includes(search)
    );
  }


  // filter code 
  const status = req.query.status
  if(status){
    filtered = filtered.filter(order => order.status === status)
  }

 // amount filter
  const amount = req.query.amount;

  if(amount) {
        filtered = filtered.filter(order => order.amount >= Number(amount) );
    }

    const { from, to } = req.query;

    if (from && to) {
        filtered = filtered.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate >= new Date(from) && orderDate <= new Date(to);
        });
    }

    const sort = req.query.sort;

    if (sort === "amount_desc") {
        filtered.sort((a, b) => {
            if (a.amount < b.amount) return 1;
            else return -1;
        });
    }

    if (sort === "date_desc") {
        filtered.sort((a, b) => {
            if (new Date(a.date) < new Date(b.date)) return 1;
            else return -1;
        });
    }

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    
  res.json({
        total: filtered.length,
        page: page,
        totalPages: Math.ceil(filtered.length / limit),
        data: paginated
    });

    filtered = filtered.map(order => {
      const subtotal = order.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      const tax = subtotal * 0.18;
      const total = subtotal + tax + order.shipping;

      return {
       ...order,
        amount: Math.round(total)
      };
    });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});