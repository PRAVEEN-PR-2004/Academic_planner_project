📚 Academic Planner with AI – Documentation

1. Project Overview
   Academic Planner is an intelligent, full-stack web application designed to help students:

Organize academic schedules

Track deadlines

Manage study plans

Receive AI-powered personalized study suggestions

It combines a modern frontend, secure backend, and a powerful AI assistant to guide students in effectively planning their academic journey.

2. Technologies Used
   🚀 Frontend
   React with Vite (Functional Components & Hooks)

Tailwind CSS and Tailwind UI for styling

Redux for state management

Hosted on: Netlify

🛠️ Backend
Node.js with Express

JWT Authentication for security

RESTful API design

MongoDB for database storage

Hosted on: Render

🤖 AI Server
Python Flask server

Groq API integration (Llama 3 model)

Natural Language Processing (NLP) based system prompt

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
