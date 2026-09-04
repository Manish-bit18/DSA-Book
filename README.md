## Project Structure

DSA Book is divided into three main parts: `Frontend`, `Backend`, and `data`.

```text
DSA-Book
│
├── Frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── Backend
│   ├── src
│   │   └── main
│   │       └── java
│   │           └── ...
│   ├── pom.xml
│   └── ...
│
├── data
│   └── DSA problem data
│
└── README.md
```

### Frontend

The frontend is built using React and Vite.

The main purpose of the frontend is to provide the interface through which I can browse DSA patterns, topics, and problems and keep track of my progress.

The frontend is divided into different components and pages so that each part of the application has a separate responsibility.

The general flow of the frontend is:

```text
User
 │
 ▼
React UI
 │
 ├── Patterns
 ├── Topics
 ├── Problems
 ├── Progress
 └── Problem Details
 │
 ▼
API Calls
 │
 ▼
Spring Boot Backend
```

The frontend communicates with the backend using REST APIs. Axios is used for making HTTP requests to the backend.

### Backend

The backend is built using Java and Spring Boot.

I used Spring Boot to create the REST APIs required by the frontend. The backend handles the application logic and communicates with the database using Spring Data JPA.

The backend follows a layered structure:

```text
Controller
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
Database
```

#### Controller Layer

The controller layer exposes REST endpoints that can be called by the frontend.

It receives requests from the frontend and passes them to the appropriate service.

#### Service Layer

The service layer contains the main application logic.

It handles operations such as retrieving problems, updating solving status, fetching patterns and topics, and preparing the required data for the frontend.

#### Repository Layer

The repository layer is responsible for communicating with the database.

Spring Data JPA is used here to perform database operations without having to write every SQL query manually.

#### Database

MySQL is used as the database for storing the application data.

The backend communicates with MySQL through Spring Data JPA and Hibernate.

---

## DSA Content Structure

The main idea behind DSA Book is to organize DSA preparation in a hierarchy rather than keeping all problems in one large list.

The structure is:

```text
DSA
 │
 ├── Pattern
 │      │
 │      └── Topic
 │              │
 │              └── Problems
```

For example:

```text
Arrays
 │
 ├── Prefix Sum
 │      ├── Problem 1
 │      ├── Problem 2
 │      └── Problem 3
 │
 ├── Two Pointers
 │      ├── Problem 1
 │      └── Problem 2
 │
 └── Sliding Window
        ├── Problem 1
        └── Problem 2
```

This structure makes it easier to learn DSA based on the technique used to solve a problem.

---

## Patterns and Topics

**The current version of DSA Book contains 136 DSA Patterns** and 18** Topics**, covering a wide range of commonly used techniques and concepts.

The patterns are organized so that related problems can be practiced together instead of solving random questions.

### DSA Patterns

The project currently covers patterns such as:

* Array Traversal
* Two Pointers
* Sliding Window
* Prefix Sum
* Hashing
* Binary Search
* Sorting
* Stack
* Queue
* Linked List
* Recursion
* Backtracking
* Trees
* Binary Search Tree
* Heap / Priority Queue
* Graph
* Greedy
* Dynamic Programming
* Bit Manipulation
* And more

### Topics

Each pattern is further divided into smaller topics.

For example:

```text
Pattern: Sliding Window
│
├── Fixed Size Window
├── Variable Size Window
└── Frequency Based Window
```

Similarly, a larger topic such as Trees can contain multiple subtopics and different types of problems.

This allows the project to be used not only as a problem tracker but also as a structured DSA learning resource.

---

## Problem Organization

Each problem is associated with its relevant pattern and topic.

A typical problem contains information such as:

```text
Problem
│
├── Problem Name
├── Problem Link
├── Difficulty
├── Pattern
├── Topic
└── Solving Status
```

This makes it possible to filter and organize problems based on different criteria.

For example, I can focus only on:

```text
Pattern → Sliding Window
        ↓
Topic → Variable Size Window
        ↓
Problems → Practice Problems
```

This approach makes revision easier because I can go back to a particular pattern and practice multiple problems based on the same technique.

---

## Tracking DSA Progress

The project is also designed to track my progress while solving problems.

Instead of maintaining a separate notebook or spreadsheet, the solving status is maintained directly in the application.

The progress can be viewed based on the available DSA structure, allowing me to understand which patterns and topics I have already practiced and which ones still need attention.

The main purpose is not just to count solved problems but to understand how much of the DSA syllabus I have covered.

---

## Data Structure

The DSA data is maintained separately from the application logic.

The `data` directory contains the DSA-related information used by the application.

This separation makes it easier to add new problems, topics, or patterns without having to change the main application structure.

The overall architecture can be represented as:

```text
                    DSA Book
                       │
          ┌────────────┴────────────┐
          │                         │
      Frontend                   Backend
       React                    Spring Boot
          │                         │
          │                      Service
          │                         │
          │                     Repository
          │                         │
          └────── REST API ────────┤
                                    │
                                  MySQL
```

---

## How I Built the Project

I built DSA Book as a full-stack project while working on my own DSA preparation.

The first part was organizing the DSA content into patterns, topics, and problems. Once the data structure was decided, I created the backend APIs using Spring Boot.

After setting up the backend and database, I built the React frontend to display the DSA content and interact with those APIs.

The development process was roughly:

```text
DSA Content
     ↓
Data Organization
     ↓
Database Design
     ↓
Spring Boot Backend
     ↓
REST APIs
     ↓
React Frontend
     ↓
Progress Tracking
     ↓
Deployment
```

The frontend and backend are maintained separately in the repository, which also makes it easier to develop and deploy them independently.

The application is currently deployed and available online.

**Live Website:** https://dsa-book-frontend.onrender.com/
