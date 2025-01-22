# FitBuddy - Your Personal Health and Fitness Companion

FitBuddy is a comprehensive web-based health and fitness application designed to help users track their daily calorie intake, plan meals with the help of AI, purchase health-related products, and connect with a community of fitness enthusiasts.

**Vercel Link:** https://fit-buddy-2004.vercel.app/

---
## Features

### 1. **Calorie Tracking**
- Log daily calorie intake with a large food database.
- Keep a history of past calorie records by date.
- Visual representation of calorie consumption with progress bars.

### 2. **AI-Powered Meal Planning**
- Personalized AI meal plans using the Gemini API.
- AI health tips tailored to user input and preferences.

### 3. **E-commerce Section**
- Purchase gym and health-related supplements.
- Integrated with Stripe for secure payments.

### 4. **Community and Social Features**
- Connect with other users and share fitness goals.
- Join groups for challenges and discussions.

### 5. **Customizable Goals and Workout Plans**
- Set personal fitness goals and track progress.
- Weekly workout plan updates.

### 6. **Data Privacy and Security**
- Secure user authentication using JWT.
- Data stored in MongoDB with robust encryption.

---

## Tech Stack

### Frontend:
- React.js with Vite
- CSS for additional custom styling

### Backend:
- Node.js with Express.js
- RESTful APIs for data handling

### Database:
- MongoDB for user and app data storage

### AI Integration:
- Gemini API for meal planning and health tips

### Payment Gateway:
- Stripe API for e-commerce transactions

---

## Installation and Setup

### Prerequisites:
- Node.js and npm installed.
- MongoDB installed and running locally.

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/FitBuddy.git
   ```

2. Navigate to the project directory:
   ```bash
   cd FitBuddy
   ```

3. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

4. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

5. Create a `.env` file in the `server` directory with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/healthapp
   GEMINI_API_KEY=your_gemini_api_key
   SECRET_STRIPE_KEY=your_stripe_secret_key
   ```

6. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

7. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

8. Open the application in your browser at `http://localhost:5173`.

---

## Usage
- **Sign Up/Login:** Create an account or log in.
- **Track Calories:** Add daily food items and monitor calorie intake.
- **AI Meal Planning:** Input preferences and get meal plans from the AI.
- **Shop:** Browse and purchase fitness-related products.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

If you have any questions or suggestions, feel free to reach out:
- **Developer:** Ayush Das
- **Email:** ayushdas1904@gmail.com
- **GitHub:** https://github.com/Ayushdas1904

---

### Keywords
Fitness, Calorie Tracker, Meal Planning, AI Integration, E-commerce, Health Tips, MERN Stack, Secure Payments, MongoDB, React, Node.js, Stripe.

