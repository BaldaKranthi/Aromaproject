Spring Boot MongoDB Order API for Aroma Frontend

Steps to Run:

1. Make sure MongoDB is running locally at mongodb://localhost:27017
2. Database name: aromadb
3. Run the project:
   - Navigate to project folder
   - Run: mvn spring-boot:run

API Endpoint:
POST http://localhost:8080/api/saveOrder

Expected JSON Body Example:
{
  "customerName": "Vishwa",
  "phone": "9876543210",
  "email": "vishwa@gmail.com",
  "cartItems": [
    { "itemName": "Paneer Pizza", "quantity": 2, "price": 250 },
    { "itemName": "Chicken Burger", "quantity": 1, "price": 180 }
  ],
  "totalPrice": 680
}

CORS is enabled. Frontend JS can send fetch POST request directly.
