const WISHLIST_KEY = "ayurkisan_wishlist";

function readWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to read wishlist:", error);
    return [];
  }
}

function writeWishlist(items) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

export function getWishlistItems() {
  return readWishlist();
}

export function isWishlisted(productId) {
  return readWishlist().some((item) => item.id === productId);
}

export function toggleWishlistItem(product) {
  const items = readWishlist();
  const exists = items.some((item) => item.id === product.id);

  if (exists) {
    const updated = items.filter((item) => item.id !== product.id);
    writeWishlist(updated);
    return { added: false, items: updated };
  }

  const updated = [product, ...items].slice(0, 24);
  writeWishlist(updated);
  return { added: true, items: updated };
}

export function removeWishlistItem(productId) {
  const updated = readWishlist().filter((item) => item.id !== productId);
  writeWishlist(updated);
  return updated;
}
