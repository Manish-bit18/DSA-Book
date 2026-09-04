# DSA Book

### Master DSA Pattern by Pattern

**DSA Book** is a full-stack web application I built to organize and track my DSA preparation pattern by pattern.

Instead of solving random problems, the application provides a structured collection of DSA topics, patterns, and problems where I can track what I have solved and what I still need to practice.

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
* Structured DSA content stored in JSON files

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

This structure helps identify the pattern behind a problem instead of treating every problem as a completely different question.

---

## Project Structure

The repository is divided into separate frontend and backend applications:

```text
DSA-Book/
│
├── Frontend/
├── Backend/
└── README.md
```

### Frontend

The frontend is built with **React + Vite + Tailwind CSS**.

It is responsible for the user interface, including displaying topics, patterns, problems, and progress.

The frontend is organized into reusable components and pages and communicates with the backend through REST APIs using Axios.

```text
React Frontend
      │
      │ REST API
      ▼
Spring Boot Backend
```

### Backend

The backend is built using **Java and Spring Boot**.

I followed a layered architecture to separate the responsibilities of different parts of the application.

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Persistence Layer
```

**Controller** handles API requests coming from the frontend.

**Service** contains the application logic and processes requested operations.

**Repository** handles persistence operations using **Spring Data JPA**.

**Entity** classes represent the application's data models.

**Hibernate** is used as the JPA implementation for ORM and persistence operations.

---

## DSA Data Structure

The DSA content is maintained as structured JSON data inside the backend resources.

The project contains separate JSON files for different DSA areas, such as:

```text
Backend/
└── src/
    └── main/
        └── resources/
            └── data/
                ├── arrays.json
                ├── backtracking.json
                ├── binarysearch.json
                ├── bitmanipulation.json
                ├── bst.json
                ├── chapters.json
                ├── companies.json
                ├── hashmap.json
                ├── heap.json
                ├── linkedlist.json
                ├── math.json
                └── patterns.json
```

The content follows a structured hierarchy:

```text
18 Topics
    ↓
136 Patterns
    ↓
Problems
```

A topic represents a broader area of DSA, while a pattern represents a specific technique or approach used to solve problems.

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
```

Using structured JSON files makes the DSA content easier to organize, maintain, and expand.

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
                Persistence Layer
```

The overall flow is:

```text
JSON DSA Content
       ↓
Spring Boot Backend
       ↓
Service Layer
       ↓
JPA / Hibernate
       ↓
Persistence Layer
       ↓
REST APIs
       ↓
React Frontend
```

The frontend is responsible for the user interface, while the backend handles application logic, API requests, and persistence operations.

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

### Data

* JSON

### Tools

* Git
* GitHub
* IntelliJ IDEA
* VS Code
* Postman

---

## Development Approach

I built the project in stages.

First, I organized the DSA content into topics, patterns, and problems using structured JSON files.

Then, I designed the backend using Spring Boot and separated it into controller, service, repository, entity, mapper, DTO, and other supporting layers.

Spring Data JPA and Hibernate were used to handle persistence operations.

Once the backend APIs were ready, I developed the React frontend and connected it with the Spring Boot backend using REST APIs.

The overall development flow was:

```text
DSA Content
     ↓
JSON Data Organization
     ↓
Backend Architecture
     ↓
Persistence Layer
     ↓
Spring Boot APIs
     ↓
React Frontend
     ↓
Problem Tracking
     ↓
Deployment
```

The frontend and backend are maintained as separate applications and deployed for online access.

---

## Key Features

* Topic-wise DSA organization
* Pattern-wise problem organization
* **136 DSA patterns across 18 topics**
* Problem-solving status tracking
* Structured JSON-based DSA content
* REST API-based frontend/backend communication
* Spring Data JPA-based persistence
* Responsive React interface
* Pattern and topic-based navigation

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

The project also helped me understand how a **React frontend, Spring Boot backend, REST APIs, JSON-based content, and JPA-based persistence** work together in a full-stack application.

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

**DSA Book — Master DSA Pattern by Pattern**

https://dsa-book-frontend.onrender.com/

---

## Author

**Manish Prajapati**
B.Tech CSE Student
