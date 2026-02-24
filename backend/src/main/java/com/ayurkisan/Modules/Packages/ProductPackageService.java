package com.ayurkisan.Modules.Packages;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductPackageService {

    @Autowired
    private ProductPackageRepository repository;

    // CREATE
    public ProductPackage createPackage(ProductPackage productPackage) {

        if (repository.existsByNameIgnoreCase(productPackage.getName())) {
            throw new RuntimeException("Package with this name already exists");
        }

        productPackage.generateId();
        return repository.save(productPackage);
    }

    // GET ALL
    public List<ProductPackage> getAllPackages() {

        List<ProductPackage> list = repository.findAll();

        if (list.isEmpty()) {
            throw new RuntimeException("No packages found");
        }

        return list;
    }

    // GET BY NAME
    public ProductPackage getByName(String name) {

        return repository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new RuntimeException("Package not found"));
    }

    // UPDATE BY NAME
    public ProductPackage updateByName(String name, ProductPackage updatedPackage) {

        ProductPackage existing = repository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        existing.setItems(updatedPackage.getItems());
        existing.setBundlePrice(updatedPackage.getBundlePrice());
        existing.setCompareAtPrice(updatedPackage.getCompareAtPrice());
        existing.setActive(updatedPackage.getActive());

        return repository.save(existing);
    }

    // DELETE BY NAME
    public void deleteByName(String name) {

        if (!repository.existsByNameIgnoreCase(name)) {
            throw new RuntimeException("Package not found");
        }

        repository.deleteByNameIgnoreCase(name);
    }
}