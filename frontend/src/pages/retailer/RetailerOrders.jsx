import { useState } from "react";
import "../../styles/dashboard/retailerDashboard.css";

function RetailerOrders(){

const [orders,setOrders] = useState([
{
id:"ORD1001",
customer:"Rahul Patil",
product:"Aloe Neem Tulsi Juice",
price:450,
status:"Processing"
},
{
id:"ORD1002",
customer:"Neha Sharma",
product:"Haldi Power Tea",
price:320,
status:"Shipped"
},
{
id:"ORD1003",
customer:"Amit Singh",
product:"Moringa Powder",
price:350,
status:"Delivered"
}
]);

const updateStatus = (id,newStatus)=>{
setOrders(
orders.map(order =>
order.id === id ? {...order,status:newStatus} : order
)
);
};

return(
<div className="retailer-content-inner">

<h1 className="dashboard-title">Customer Orders</h1>

<div className="orders-table">

<table>

<thead>

<tr>
<th>Order ID</th>
<th>Customer</th>
<th>Product</th>
<th>Price</th>
<th>Status</th>
<th>Update</th>
</tr>

</thead>

<tbody>

{orders.map((order)=>(
<tr key={order.id}>

<td>{order.id}</td>
<td>{order.customer}</td>
<td>{order.product}</td>
<td>₹{order.price}</td>

<td>
<span className={`status ${order.status.toLowerCase()}`}>
{order.status}
</span>
</td>

<td>

<select
value={order.status}
onChange={(e)=>updateStatus(order.id,e.target.value)}
>

<option value="Processing">Processing</option>
<option value="Shipped">Shipped</option>
<option value="Delivered">Delivered</option>

</select>

</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

)

}

export default RetailerOrders