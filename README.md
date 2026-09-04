# DSA Book

### Master DSA Pattern by Pattern

DSA Book is a project I built to track my Data Structures and Algorithms (DSA) preparation in a structured way.

While solving DSA problems, I wanted something where I could keep track of the patterns I had learned, the questions I had solved, and my overall progress. Instead of maintaining everything in a notebook or spreadsheet, I decided to build a web application for it.

**Live Website:** https://dsa-book-frontend.onrender.com/

**GitHub Repository:** https://github.com/Manish-bit18/DSA-Book

---

## Features

### DSA Patterns

The main idea of DSA Book is to learn and practice DSA pattern by pattern instead of randomly solving questions.

Problems are organized according to the pattern or concept they belong to, making it easier to understand which techniques are being used and where I need more practice.

Some of the patterns and concepts covered include:

* Arrays
* Strings
* Two Pointers
* Sliding Window
* Prefix Sum
* Hashing
* Binary Search
* Stack
* Queue
* Linked List
* Recursion
* Trees
* Graphs
* Greedy
* Dynamic Programming

---

## Problem Tracking

DSA Book allows me to keep track of the problems I am solving.

For each problem, I can maintain information such as:

* Problem name
* Problem link
* Difficulty
* Pattern/topic
* Solving status
* Notes or approach

This makes it easier to come back to previously solved problems and revise them instead of solving the same type of problem from scratch again.

---

## Progress Tracking

The application provides an overview of my DSA preparation so I can see how much I have completed.

Instead of only counting the total number of problems, the goal is to understand my progress across different DSA patterns.

This helps answer questions like:

* Which patterns have I completed?
* Which patterns need more practice?
* How many problems have I solved?
* What should I revise next?

---

## Pattern-Based Learning

One of the main reasons I built this project was because I noticed that many DSA problems become easier once you recognize the underlying pattern.

For example:

```text
Problem
   ↓
Understand the problem
   ↓
Identify the pattern
   ↓
Learn the approach
   ↓
Solve similar problems
   ↓
Track progress
```

Instead of treating every LeetCode problem as a completely new problem, DSA Book focuses on recognizing and practicing reusable patterns.

---

## Project Structure

The repository is divided into three main parts:

```text
DSA-Book
│
├── Backend
│   └── Backend application
│
├── Frontend
│   └── Web application
│
├── data
│   └── DSA problems and related data
│
└── README.md
```

### Frontend

The frontend contains the user interface of DSA Book.

It handles:

* Displaying DSA patterns
* Showing problems
* Tracking problem status
* Displaying progress
* Navigation between different sections
* Communicating with the backend

### Backend

The backend handles the application logic and APIs.

It is responsible for:

* Managing DSA problem data
* Handling API requests
* Updating problem status
* Providing data to the frontend
* Connecting the application with the database

### Data

The `data` directory contains the DSA-related data used by the application.

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* DaisyUI
* Axios

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Maven

### Database

* MySQL

### Tools

* Git
* GitHub
* IntelliJ IDEA
* VS Code
* Postman

---

## How the Application Works

The basic flow of the application is:

```text
                    DSA Book
                       │
             ┌─────────┴─────────┐
             │                   │
          Frontend            Backend
             │                   │
             │              REST APIs
             │                   │
             └──────────┬────────┘
                        │
                     Database
```

The frontend communicates with the Spring Boot backend through REST APIs. The backend processes the requests and works with the database to store and retrieve the required information.

---

## Running the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Manish-bit18/DSA-Book.git
cd DSA-Book
```

### 2. Run the Backend

Go to the backend directory:

```bash
cd Backend
```

Configure the database connection in the Spring Boot configuration and make sure MySQL is running.

Then run the Spring Boot application from IntelliJ IDEA or using Maven.

### 3. Run the Frontend

Open another terminal and go to the frontend directory:

```bash
cd Frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will then be available on the local development URL provided by Vite.

---

## Why I Built This

I built DSA Book mainly for my own DSA preparation.

I was solving problems from different platforms and learning different patterns, but keeping track of everything separately was becoming difficult.

So I decided to build something that combines DSA learning, problem solving, pattern recognition, progress tracking, and revision into one application.

It also gave me a chance to work on a complete application instead of only solving individual coding problems.

---

## Future Improvements

There are several things I would like to improve in the future:

* Add more DSA patterns and problems
* Improve progress analytics
* Add daily and weekly solving statistics
* Add better revision tracking
* Add difficulty-wise progress
* Add search and filtering
* Add user authentication
* Improve the UI and mobile responsiveness
* Add more detailed notes for individual problems

---

## Live Project

The project is deployed and can be accessed here:

https://dsa-book-frontend.onrender.com/

---

## Author

**Manish**

B.Tech CSE Student

I built this project as part of my DSA preparation and to get more practical experience in building full-stack applications.
