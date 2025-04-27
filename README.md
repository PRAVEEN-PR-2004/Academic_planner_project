🌐 AgroConnect

AgroConnect is an e-commerce platform designed to help users post and sell their products, while others can browse, filter, and purchase items. It provides a robust system with features like carts, wishlists, and profile management.

## 🚀 Features

1. **🛒 Huge Collections of Products**  
   Explore a variety of products posted by different users.

2. **🔍 Search and Filters**  
   Quickly find products using search and filtering options based on category, price, and more.

3. **🛍️ Cart**  
   Easily add products to your cart and proceed to checkout.

4. **💖 Wishlist**  
   Save products to your wishlist for future reference or purchase.

5. **🖥️ Interactive UI**  
   Enjoy a smooth and responsive user interface designed for ease of navigation.

6. **👤 Profile Maintenance**  
   Manage your personal profile, view order history, and update details with ease.
7. **🔒 Google OAuth Login**  
   Securely log in to your account using Google OAuth, providing a seamless authentication experience.

## 🛠️ Getting Started

### ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- **React.js**: Frontend framework
- **Java Spring Boot**: Backend services and API
- **Node.js**: JavaScript runtime environment
- **Maven**: Dependency management for Spring Boot

### 🔑 Google OAuth Configuration

To enable Google OAuth login, follow these steps to set up your Google Cloud project and obtain your client ID and secret. This configuration is essential for allowing users to securely log in with their Google accounts.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to "Credentials" and create OAuth 2.0 credentials.
4. Set the redirect URI to match your backend application's endpoint.
5. Add your client ID and secret to the application properties of your Spring Boot backend.

### 📥 Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   https://github.com/lokesh-kumaravel/AgroConnect.git

   ```

2. Navigate into the project directory:

   ```bash
   cd AgroConnect

   ```

3. Navigate into the Frontend directory:

   ```bash
   npm install

   ```

4. Navigate into the Backend directory:

   ```bash
   mvn install

   ```

5. Run the frontend:

   ```bash
   npm run dev

   ```

6. Run the backend:
   ```bash
   mvn spring-boot:run
   ```

Hosted on: PythonAnywhere

3. Core Features
   👤 User Profiles
   Create a profile with student details and enrolled courses.

🗓️ Timetable Management
Add and manage classes, assignments, exams.

⚡ Smart Scheduling (AI-Powered)
AI suggests optimal study slots based on tasks and deadlines.

⏰ Deadline Reminders
Automatic notifications for upcoming tasks, exams, and assignments.

📈 Progress Tracker
Visual dashboard showing completed vs pending tasks and total study hours.

🧠 AI Study Tips
Personalized suggestions and productivity advice via Groq API.

📅 Calendar View
View schedules by Day, Week, or Month for easier management.

4. AI Recommendation System
   The AI server utilizes Groq’s Llama 3 model via a Python Flask backend.

🔹 How It Works:
Input:
Students interact with a chatbot or request study suggestions.

Processing:

Uses a crafted system prompt to:

Focus on academic planning

Provide scheduling, goal-setting, and productivity advice

Keep responses friendly, concise, and on-topic

Output:
AI responds with personalized:

Study tips

Schedule optimizations

Motivational strategies

🔹 NLP and User Modeling
AI considers:

Student goals

Subjects enrolled

Upcoming deadlines

User preferences to generate accurate and effective suggestions.

5. Project Setup Instructions
   ⚙️ Frontend Setup
   bash
   Copy
   Edit
   cd frontend
   npm install
   npm run dev
   ⚙️ Backend Setup
   bash
   Copy
   Edit
   cd backend
   npm install
   npm run dev
   Setup required environment variables:

MONGODB_URI

JWT_SECRET

FRONTEND_URL

⚙️ AI Server Setup
bash
Copy
Edit
cd ai-server
pip install -r requirements.txt
python app.py
Setup .env file inside ai-server/ with:

env
Copy
Edit
GROQ_API_KEY=your_groq_api_key

### 🏠 Home Page

![HomePage](./screenshots/Screenshot%202025-04-27%20105431.png)

### 🏠 Dash Board

![DashboardPage](./screenshots/image3.png)

### 🏠 Calender

![CalenderPage](./screenshots/image4.png)

### 🏠 Time Table

![TimeTablePage](./screenshots/image5.png)

### 🏠 Suggestion Page

![SuggestionPage](./screenshots/image2.png)

### 🏠 Course Page

![CoursePage](./screenshots/image1.png)
🔥 Conclusion
Academic Planner with AI offers a smart, intuitive, and efficient way for students to manage their academic life — powered by modern web technologies and cutting-edge AI!
