import { useState } from "react";
import "../../styles/dashboard/retailerDashboard.css";

function RetailerProducts() {

const [products,setProducts] = useState([
{
id:1,
name:"Aloe Neem Tulsi Juice",
category:"Juice",
price:450,
stock:20
},
{
id:2,
name:"Haldi Power Tea",
category:"Tea",
price:320,
stock:15
},
{
id:3,
name:"Moringa Powder",
category:"Powder",
price:350,
stock:10
}
]);

const deleteProduct = (id)=>{
setProducts(products.filter(p=>p.id!==id));
};

return(
<div className="retailer-content-inner">

<h1 className="dashboard-title">My Products</h1>

<div className="products-table">

<table>

<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Category</th>
<th>Price</th>
<th>Stock</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{products.map((product)=>(
<tr key={product.id}>

<td>{product.id}</td>
<td>{product.name}</td>
<td>{product.category}</td>
<td>₹{product.price}</td>
<td>{product.stock}</td>

<td>

<button className="edit-btn">Edit</button>

<button
className="delete-btn"
onClick={()=>deleteProduct(product.id)}
>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>

</div>
)

}

export default RetailerProducts