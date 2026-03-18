export function formatPrice(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}

export function normalizeProduct(product, categories = []) {
  const category =
    categories.find((item) => item.id === product.categoryId)?.categoryName ||
    product.categoryName ||
    product.brand ||
    "General Wellness";

  return {
    ...product,
    id: product.id || product._id,
    name: product.productName || product.name,
    image: product.productImage || product.image,
    categoryName: category,
    displayPrice: product.finalPrice || product.discountedPrice || product.price || 0
  };
}
