import "../../styles/dashboard/retailerDashboard.css";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

function SalesAnalytics(){

const data = {
labels:["Jan","Feb","Mar","Apr","May","Jun"],

datasets:[
{
label:"Monthly Sales ₹",
data:[12000,19000,15000,22000,18000,25000],
backgroundColor:"#1b4332"
}
]
};

const options = {
responsive:true,
plugins:{
legend:{
position:"top"
}
}
};

return(
<div className="retailer-content-inner">

<h1 className="dashboard-title">Sales Analytics</h1>

<div className="analytics-cards">

<div className="card">
<h3>Total Revenue</h3>
<p>₹1,20,000</p>
</div>

<div className="card">
<h3>Total Orders</h3>
<p>340</p>
</div>

<div className="card">
<h3>Top Product</h3>
<p>Aloe Neem Tulsi Juice</p>
</div>

</div>

<div className="chart-container">

<Bar data={data} options={options} />

</div>

</div>
)

}

export default SalesAnalytics