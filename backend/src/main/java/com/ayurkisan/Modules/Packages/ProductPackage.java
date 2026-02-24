package com.ayurkisan.Modules.Packages;

import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Document(collection = "ProductPackages")
public class ProductPackage {

    @Id
    private String id;

    @NotBlank(message = "Package name is required")
    private String name;

    @NotEmpty(message = "Items list cannot be empty")
    @Valid
    private List<PackageItem> items;

    @NotNull(message = "Bundle price is required")
    @Positive(message = "Bundle price must be positive")
    private Double bundlePrice;

    @NotNull(message = "Compare price is required")
    @Positive(message = "Compare price must be positive")
    private Double compareAtPrice;

    @NotNull(message = "Active status is required")
    private Boolean active;

    // 🔥 Generate ID automatically
    public void generateId() {
        this.id = "pkg-" + UUID.randomUUID().toString().substring(0, 8);
    }

    // Getters and Setters

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<PackageItem> getItems() { return items; }
    public void setItems(List<PackageItem> items) { this.items = items; }

    public Double getBundlePrice() { return bundlePrice; }
    public void setBundlePrice(Double bundlePrice) { this.bundlePrice = bundlePrice; }

    public Double getCompareAtPrice() { return compareAtPrice; }
    public void setCompareAtPrice(Double compareAtPrice) { this.compareAtPrice = compareAtPrice; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}