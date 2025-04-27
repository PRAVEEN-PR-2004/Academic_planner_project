📚 Academic Planner with AI – Documentation

1. Project Overview
   Academic Planner is an intelligent, full-stack web application designed to help students organize their academic schedules, track deadlines, manage study plans, and receive AI-powered personalized study suggestions.

It combines a modern frontend, secure backend, and a powerful AI assistant to guide students in planning their academic journey effectively.

2. Technologies Used
   Frontend
   React with Vite (Functional Components & Hooks)

Tailwind CSS and Tailwind UI for styling

Redux for State Management

Hosted on: Netlify

Backend
Node.js with Express

JWT Authentication for security

RESTful API design

MongoDB for database storage

Hosted on: Render

AI Server
Python Flask server

Groq API integration (using Llama 3 model)

Natural Language Processing (NLP) based system prompt

Hosted on: PythonAnywhere

3. Core Features
   User Profiles:
   Users can create a profile including basic student information and enrolled course list.

Timetable Creation:
Add and manage classes, assignments, exams.

Smart Scheduling (AI-powered):
AI suggests optimal study slots based on user's tasks and deadlines.

Deadline Reminders:
Automatic reminders for upcoming tasks, exams, and assignments.

Progress Tracker:
Visual representation of completed vs pending tasks, total study hours.

AI Study Tips:
Personalized suggestions and productivity advice using Groq API.

Calendar View:
Visual planner (Day/Week/Month view) for easier management.

4. AI Recommendation Approach
   The AI server uses Groq's Llama 3 model through a Python Flask server. Here's how it works:

Input:
Students can interact with a chatbot or request study suggestions.

Processing:
The system uses a carefully crafted System Prompt that:

Guides the AI to focus on academic planning

Provides advice on scheduling, goal setting, productivity, and task management

Ensures responses are friendly, concise, and on-topic

Output:
The AI responds with personalized study tips, schedule optimizations, and motivational strategies.

🧠 NLP and User Modeling:
The AI considers the user’s goals, subjects, upcoming deadlines, and preferences to generate suggestions.
Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
cd backend
npm install
npm run dev
Setup environment variables:

MONGODB_URI

JWT_SECRET

FRONTEND_URL

AI Server Setup
bash
Copy
Edit
cd ai-server
pip install -r requirements.txt
python app.py
Setup .env file with:

GROQ_API_KEY=your_groq_api_key

### 🏠 Home Page

![HomePage](https://ibb.co/4ZpfCsPm)
