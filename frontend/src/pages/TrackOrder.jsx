import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import shipmentService from "../services/shipmentService";
import "../styles/pages/trackOrder.css";

function TrackOrder() {
  const params = useParams();
  const [orderId, setOrderId] = useState(params.orderId || "");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (event) => {
    event.preventDefault();
    if (!orderId.trim()) {
      toast.warning("Enter an order ID to track.");
      return;
    }

    try {
      setLoading(true);
      const data = await shipmentService.trackOrder(orderId.trim());
      setShipment(data);
    } catch (error) {
      console.error("Track order error:", error);
      toast.error(error.response?.data?.message || "Unable to fetch tracking details.");
      setShipment(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-order-page container reveal active">
      <div className="track-hero">
        <h1>Track Your Journey</h1>
        <p>Follow your organic wellness products from our farms to your doorstep.</p>
      </div>

      <div className="track-container">
        <div className="search-card glass">
          <h3>Order Tracking</h3>
          <p>Enter your Order ID to get real-time delivery updates.</p>
          <form className="track-form" onSubmit={handleTrack}>
            <div className="track-input-group">
              <input
                id="orderId"
                value={orderId}
                onChange={(event) => setOrderId(event.target.value)}
                placeholder="Ex: OD12345678"
                required
              />
            </div>
            <button type="submit" className="track-btn" disabled={loading}>
              {loading ? "Locating..." : "Track Package"}
            </button>
          </form>
        </div>

        {shipment && (
          <div className="status-card glass reveal active">
            <div className="status-header">
              <div>
                <span className="stats-label">Order Status</span>
                <h2>{shipment.status}</h2>
              </div>
              <div className="status-badge">{shipment.status}</div>
            </div>

            <div className="shipment-details-grid">
              <div className="detail-item">
                <span className="stats-label">Destination</span>
                <p>{shipment.shippingAddress}</p>
              </div>
              <div className="detail-item">
                <span className="stats-label">Recipient Contact</span>
                <p>{shipment.contactPhone}</p>
              </div>
            </div>

            <div className="tracking-timeline">
              <h3 className="timeline-title">Journey Progress</h3>
              {(shipment.trackingHistory || []).length > 0 ? (
                shipment.trackingHistory.map((update, index) => (
                  <div className={`timeline-item ${index === 0 ? "active" : ""}`} key={index}>
                    <div className="timeline-content">
                      <h4>{update.status}</h4>
                      <p>{update.remarks || "No additional remarks"}</p>
                      <span className="timeline-time">
                        {update.timestamp ? new Date(update.timestamp).toLocaleString("en-IN") : "Recent"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-history text-center">Initial processing started. Check back soon for more updates.</p>
              )}
            </div>
          </div>
        )}

        {!shipment && !loading && (
          <div className="no-selection glass text-center">
            <p>Waiting for your Order ID to Fetch Journey details.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
