const axios = require('axios');

const API_URL = 'http://localhost:9090/products/admin/add';

const products = [
  {
    productName: "Aloe Neem Tulsi Juice",
    description: "Supports immunity, blood purification and digestion.",
    brand: "Ayurkisan",
    price: 499,
    discount: 20,
    stockQuantity: 100,
    productImage: "/products_img/aloeneemtulsi.png",
    categoryId: "cat-juices-202",
    ingredients: "Aloe Vera, Neem, Tulsi",
    usageInstructions: "Mix 30ml with equal amount of water, consume twice daily.",
    dosage: "30ml twice a day",
    weight: "500ml"
  },
  {
    productName: "Aloe Moringa Juice",
    description: "Improves energy levels and supports nutrient absorption.",
    brand: "Ayurkisan",
    price: 349,
    discount: 15,
    stockQuantity: 120,
    productImage: "/products_img/aloemoringa.png",
    categoryId: "cat-juices-202",
    ingredients: "Aloe Vera, Moringa",
    usageInstructions: "Take on empty stomach in the morning.",
    dosage: "20-30ml daily",
    weight: "500ml"
  },
  {
    productName: "Ayupower Herbal Tea",
    description: "Herbal detox tea with natural antioxidant support.",
    brand: "Ayurkisan",
    price: 299,
    discount: 10,
    stockQuantity: 150,
    productImage: "/products_img/ayupower.png",
    categoryId: "cat-tea-202",
    ingredients: "Moringa, Tulsi, Amla, Ginger",
    usageInstructions: "Dip one bag in hot water for 3-5 minutes.",
    dosage: "1-2 cups daily",
    weight: "25 tea bags"
  }
];

// GenerateNumbered products 1-26
for (let i = 1; i <= 26; i++) {
  const categories = ["cat-juices-202", "cat-tea-202", "cat-skincare-202"];
  const category = categories[i % 3];
  const names = [
    "Herbal Bliss", "Purity Powder", "Vitality Extract", "Nature's Cure", 
    "Ayu-Shakti", "Bio-Herb", "Organic Glow", "Wellness Elixir",
    "Ancient Secret", "Modern Ayurveda", "Prana Essence", "Dharma Balance"
  ];
  const name = `${names[i % names.length]} - Collection ${i}`;
  
  products.push({
    productName: name,
    description: `A premium ayurvedic formulation from our artisanal collection ${i}. Supports holistic wellness and natural balance.`,
    brand: "Ayurkisan",
    price: 199 + (i * 10),
    discount: 10 + (i % 20),
    stockQuantity: 50 + i,
    productImage: `/products_img/${i}.png`,
    categoryId: category,
    ingredients: "Natural Herbal Blends",
    usageInstructions: "As directed by physician or on product label.",
    dosage: i % 2 === 0 ? "1 tablet twice daily" : "30ml daily",
    weight: i % 2 === 0 ? "60 caps" : "500ml"
  });
}

async function seed() {
  console.log(`Starting to seed ${products.length} products...`);
  for (const product of products) {
    try {
      const resp = await axios.post(API_URL, product);
      console.log(`Successfully added: ${product.productName}`);
    } catch (err) {
      console.error(`Failed to add: ${product.productName} - ${err.message}`);
    }
  }
  console.log("Seeding complete!");
}

seed();
