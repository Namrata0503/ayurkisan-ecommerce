package com.ayurkisan.dto;

import java.util.List;
import com.ayurkisan.Modules.Orders.Order;

public class DashboardDTO {
    private long totalProducts;
    private long totalCategories;
    private long totalUsers;
    private long totalOrders;
    private List<Order> recentOrders;

    public DashboardDTO() {}

    public DashboardDTO(long totalProducts, long totalCategories, long totalUsers, long totalOrders, List<Order> recentOrders) {
        this.totalProducts = totalProducts;
        this.totalCategories = totalCategories;
        this.totalUsers = totalUsers;
        this.totalOrders = totalOrders;
        this.recentOrders = recentOrders;
    }

    // Getters and Setters
    public long getTotalProducts() { return totalProducts; }
    public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }

    public long getTotalCategories() { return totalCategories; }
    public void setTotalCategories(long totalCategories) { this.totalCategories = totalCategories; }

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }

    public List<Order> getRecentOrders() { return recentOrders; }
    public void setRecentOrders(List<Order> recentOrders) { this.recentOrders = recentOrders; }
}
