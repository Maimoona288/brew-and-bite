require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Review = require("./models/Review");

const categories = [
  { name: "Coffee", icon: "☕", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600" },
  { name: "Tea", icon: "🍵", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600" },
  { name: "Burgers", icon: "🍔", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600" },
  { name: "Pizza", icon: "🍕", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600" },
  { name: "Desserts", icon: "🍰", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600" },
  { name: "Drinks", icon: "🥤", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600" },
];

const productsByCategory = {
  Coffee: [
    { name: "Cappuccino", price: 4.5, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800", description: "Rich espresso topped with velvety steamed milk foam.", ingredients: ["Espresso", "Steamed Milk", "Milk Foam"], featured: true, rating: 4.7 },
    { name: "Cold Coffee", price: 4.2, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800", description: "Chilled coffee blended with milk and a scoop of ice cream.", ingredients: ["Espresso", "Milk", "Ice", "Ice Cream"], featured: true, rating: 4.5 },
    { name: "Caramel Macchiato", price: 5.0, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800", description: "Espresso layered with vanilla milk and caramel drizzle.", ingredients: ["Espresso", "Vanilla Syrup", "Milk", "Caramel"], rating: 4.6 },
    { name: "Espresso Shot", price: 3.0, image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800", description: "A bold, concentrated shot of our house-blend espresso.", ingredients: ["Espresso Beans"], rating: 4.3 },
  ],
  Tea: [
    { name: "Green Tea", price: 3.2, image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800", description: "Light and refreshing antioxidant-rich green tea.", ingredients: ["Green Tea Leaves"], rating: 4.1 },
    { name: "Masala Chai", price: 3.5, image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800", description: "Spiced black tea simmered with milk and warm spices.", ingredients: ["Black Tea", "Milk", "Cardamom", "Ginger"], rating: 4.6 },
  ],
  Burgers: [
    { name: "Chicken Burger", price: 7.5, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800", description: "Crispy chicken fillet with lettuce, cheese and house sauce.", ingredients: ["Chicken Fillet", "Bun", "Lettuce", "Cheese", "Sauce"], featured: true, rating: 4.8 },
    { name: "Beef Burger", price: 8.5, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800", description: "Juicy grilled beef patty with cheddar and caramelized onions.", ingredients: ["Beef Patty", "Bun", "Cheddar", "Onion"], rating: 4.7 },
    { name: "French Fries", price: 3.0, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800", description: "Crispy golden fries seasoned with our signature spice mix.", ingredients: ["Potato", "Salt", "Spices"], featured: true, rating: 4.4 },
  ],
  Pizza: [
    { name: "Margherita Pizza", price: 9.0, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800", description: "Classic pizza with tomato, fresh mozzarella and basil.", ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Basil"], rating: 4.6 },
    { name: "Pepperoni Pizza", price: 10.5, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800", description: "Loaded with spicy pepperoni and extra mozzarella cheese.", ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Pepperoni"], rating: 4.8 },
  ],
  Desserts: [
    { name: "Chocolate Cake", price: 5.5, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800", description: "Decadent layered chocolate cake with rich ganache.", ingredients: ["Chocolate", "Flour", "Sugar", "Cream"], featured: true, rating: 4.9 },
    { name: "Cheesecake", price: 5.8, image: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=800", description: "Creamy baked cheesecake with a buttery biscuit base.", ingredients: ["Cream Cheese", "Biscuit", "Sugar"], rating: 4.7 },
  ],
  Drinks: [
    { name: "Fresh Lemonade", price: 3.0, image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=800", description: "Freshly squeezed lemons with a hint of mint.", ingredients: ["Lemon", "Sugar", "Mint", "Water"], rating: 4.3 },
    { name: "Iced Tea", price: 3.0, image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=800", description: "Chilled black tea with a citrus twist.", ingredients: ["Black Tea", "Lemon", "Ice"], rating: 4.2 },
  ],
};

const reviewSeeds = [
  { name: "Ayesha", rating: 5, comment: "Excellent coffee and cozy atmosphere. My weekend go-to spot." },
  { name: "Bilal", rating: 5, comment: "The chicken burger is unbelievably good and the fries are crispy every time." },
  { name: "Sara", rating: 4, comment: "Loved the cheesecake, service was quick and friendly." },
  { name: "Hamza", rating: 5, comment: "Best cappuccino in town, consistent quality on every visit." },
];

const run = async () => {
  await connectDB();

  console.log("Clearing old data...");
  await Promise.all([
    User.deleteMany({ role: "admin" }),
    Category.deleteMany({}),
    Product.deleteMany({}),
    Review.deleteMany({}),
  ]);

  console.log("Creating admin user...");
  const admin = await User.create({
    name: "Restaurant Admin",
    email: "admin@brewandbite.com",
    password: "Admin@123",
    role: "admin",
  });

  console.log("Creating categories...");
  const createdCategories = await Category.insertMany(categories);
  const categoryMap = {};
  createdCategories.forEach((c) => (categoryMap[c.name] = c._id));

  console.log("Creating products...");
  const productsToInsert = [];
  Object.entries(productsByCategory).forEach(([catName, items]) => {
    items.forEach((item) => {
      productsToInsert.push({ ...item, category: categoryMap[catName], available: true });
    });
  });
  await Product.insertMany(productsToInsert);

  console.log("Creating sample reviews...");
  const reviewsToInsert = reviewSeeds.map((r) => ({ ...r, user: admin._id }));
  await Review.insertMany(reviewsToInsert);

  // console.log("\nSeed complete!");
  // console.log("Admin login -> email: admin@brewandbite.com | password: Admin@123\n");
  mongoose.connection.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
