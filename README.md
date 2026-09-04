# DSA Book

**DSA Book** is a full-stack web application I built to organize and track my DSA preparation pattern by pattern.

Instead of solving random problems, the idea is to have a structured collection of DSA topics, patterns, and problems where I can track what I have solved and what I still need to practice.

**Live:** https://dsa-book-frontend.onrender.com/
**Repository:** https://github.com/Manish-bit18/DSA-Book

---

## Project Overview

DSA Book currently contains:

* **18 DSA Topics**
* **136 DSA Patterns**
* A collection of problems organized under these patterns
* Problem-solving status tracking
* Pattern-wise and topic-wise organization

The main structure of the application is:

```text
Topic
  └── Pattern
        └── Problems
```

For example:

```text
Arrays
  ├── Two Pointers
  │     ├── Problem 1
  │     ├── Problem 2
  │     └── Problem 3
  │
  ├── Sliding Window
  │     ├── Problem 1
  │     └── Problem 2
  │
  └── Prefix Sum
        ├── Problem 1
        └── Problem 2
```

This structure helps in identifying the pattern behind a problem instead of treating every problem as a completely different question.

---

## How I Structured the Project

The repository is divided into three major parts:

```text
DSA-Book/
│
├── Frontend/
├── Backend/
├── data/
└── README.md
```

### Frontend

The frontend is built with **React + Vite**.

It is responsible for the complete user interface of the application, including displaying topics, patterns, problems and progress.

The frontend is organized into reusable components and pages instead of keeping everything in a single file.

It communicates with the backend through REST APIs using Axios.

```text
React Frontend
      │
      │ REST API
      ▼
Spring Boot Backend
```

### Backend

The backend is built using **Java and Spring Boot**.

I followed a layered architecture so that the responsibilities of different parts of the backend remain separated.

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
MySQL
```

**Controller** handles the API requests coming from the frontend.

**Service** contains the application logic and processes the requested operations.

**Repository** handles database operations using Spring Data JPA.

**MySQL** stores the application data.

---

## DSA Data Structure

The DSA content is maintained separately in the `data` directory.

I structured the data around three levels:

```text
18 Topics
    ↓
136 Patterns
    ↓
Problems
```

A topic represents a broader area of DSA, while patterns represent the specific techniques or approaches used to solve problems.

For example:

```text
Topic
  ↓
Arrays

Pattern
  ↓
Sliding Window

Problems
  ↓
Problem 1
Problem 2
Problem 3
...
```

Keeping the DSA data separate from the frontend and backend makes it easier to maintain and expand the problem collection.

---

## Application Architecture

The complete application works as a full-stack system:

```text
                    DSA Book
                       │
              ┌────────┴────────┐
              │                 │
          Frontend            Backend
           React             Spring Boot
              │                 │
              │    REST API     │
              └────────┬────────┘
                       │
                  Spring Data JPA
                       │
                     MySQL
```

The frontend is responsible for the user interface, while the backend handles the application logic and database operations.

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
* Hibernate
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

## Development Approach

I built the project in stages.

First, I organized the DSA content into topics and patterns. After deciding how the data should be structured, I created the backend and database layer to manage that data.

Once the APIs were ready, I developed the React frontend and connected it with the Spring Boot backend.

The overall development flow was:

```text
DSA Content
     ↓
Data Organization
     ↓
Database
     ↓
Spring Boot APIs
     ↓
React Frontend
     ↓
Problem Tracking
     ↓
Deployment
```

The project is deployed online, with the frontend and backend maintained as separate parts of the application.

---

## Purpose

I built DSA Book primarily to use it during my own DSA preparation.

The goal was to have one place where I could:

* Learn DSA topic by topic
* Understand different problem-solving patterns
* Practice problems belonging to the same pattern
* Track solved problems
* Identify patterns that need more practice
* Come back to problems for revision

The project also helped me understand how a frontend, backend, database, and REST APIs work together in a complete full-stack application.

---

## Future Improvements

Some improvements I plan to work on:

* Add more problems and patterns
* Improve progress tracking
* Add better filtering and search
* Add detailed problem notes
* Add more revision-focused features
* Improve analytics for topic and pattern-wise progress
* Improve mobile responsiveness

---

## Live Project

**DSA Book - Master DSA Pattern by Pattern**

https://dsa-book-frontend.onrender.com/

---

## Author

**Manish**
B.Tech CSE Student
