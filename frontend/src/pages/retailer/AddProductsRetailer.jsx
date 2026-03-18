import { useState } from "react";
import "../../styles/dashboard/retailerDashboard.css";

function AddProduct() {

const [product,setProduct] = useState({
name:"",
category:"",
price:"",
stock:"",
image:null
});

const handleChange = (e)=>{
setProduct({...product,[e.target.name]:e.target.value});
};

const handleImage = (e)=>{
setProduct({...product,image:e.target.files[0]});
};

const handleSubmit = (e)=>{
e.preventDefault();

console.log(product);

alert("Product Added Successfully");

setProduct({
name:"",
category:"",
price:"",
stock:"",
image:null
});
};

return(
<div className="retailer-content-inner">

<h1 className="dashboard-title">Add Product</h1>

<form className="product-form" onSubmit={handleSubmit}>

<input
type="text"
placeholder="Product Name"
name="name"
value={product.name}
onChange={handleChange}
/>

<select
name="category"
value={product.category}
onChange={handleChange}
>

<option value="">Select Category</option>
<option value="Juice">Juice</option>
<option value="Tea">Tea</option>
<option value="Powder">Powder</option>
<option value="Snack">Snack</option>

</select>

<input
type="number"
placeholder="Price"
name="price"
value={product.price}
onChange={handleChange}
/>

<input
type="number"
placeholder="Stock Quantity"
name="stock"
value={product.stock}
onChange={handleChange}
/>

<input
type="file"
onChange={handleImage}
/>

<button type="submit">
Add Product
</button>

</form>

</div>
)

}

export default AddProduct;