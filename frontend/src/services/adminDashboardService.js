import adminService from "./adminService";
import productService from "./productService";
import orderService from "./orderService";
import categoryService from "./categoryService";
import returnsService from "./returnsService";
import shipmentService from "./shipmentService";

const adminDashboardService = {
  getDashboardStats: async () => {
    const [customers, retailers, products, orders, categories, returns, shipments] = await Promise.all([
      adminService.getCustomers(),
      adminService.getRetailers(),
      productService.getAllProducts(),
      orderService.getAllOrders(),
      categoryService.getAllCategories(),
      returnsService.getAllReturns(),
      shipmentService.getAllShipments()
    ]);

    const sortedOrders = [...orders].sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
    const activeCustomers = customers.filter((item) => !(item.isDelete || item.delete));
    const activeRetailers = retailers.filter((item) => !(item.isDelete || item.delete));
    const deliveredOrders = orders.filter((item) => (item.orderStatus || "").toUpperCase() === "DELIVERED");
    const pendingOrders = orders.filter((item) =>
      ["PLACED", "CONFIRMED", "SHIPPED"].includes((item.orderStatus || "").toUpperCase())
    );
    const cancelledOrders = orders.filter((item) => (item.orderStatus || "").toUpperCase() === "CANCELLED");
    const lowStockProducts = [...products]
      .filter((item) => Number(item.stockQuantity || 0) <= 10)
      .sort((a, b) => Number(a.stockQuantity || 0) - Number(b.stockQuantity || 0))
      .slice(0, 5);
    const revenue = orders.reduce((sum, item) => sum + Number(item.totalDiscountedPrice || 0), 0);
    const pendingReturns = returns.filter((item) => (item.status || "").toUpperCase() === "PENDING");
    const inTransitShipments = shipments.filter((item) =>
      ["CONFIRMED", "SHIPPED", "OUT_FOR_DELIVERY"].includes((item.status || "").toUpperCase())
    );

    return {
      customers: customers.length,
      retailers: retailers.length,
      products: products.length,
      orders: orders.length,
      categories: categories.length,
      activeCustomers: activeCustomers.length,
      activeRetailers: activeRetailers.length,
      deletedUsers: customers.length + retailers.length - activeCustomers.length - activeRetailers.length,
      deliveredOrders: deliveredOrders.length,
      pendingOrders: pendingOrders.length,
      cancelledOrders: cancelledOrders.length,
      revenue,
      lowStockProducts,
      returnsCount: returns.length,
      pendingReturns: pendingReturns.length,
      shipmentsCount: shipments.length,
      inTransitShipments: inTransitShipments.length,
      recentOrders: sortedOrders.slice(0, 6),
      allOrders: sortedOrders
    };
  },
};

export default adminDashboardService;
