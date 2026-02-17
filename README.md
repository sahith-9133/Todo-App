# 📝 Todo App — Spring Boot + React

A full-stack Todo application with a Spring Boot REST API backend and React frontend.

---

## 🗂️ Project Structure

```
todo-app/
├── backend/       ← Spring Boot (Port 8080)
└── frontend/      ← React (Port 3000)
```

---

## ✅ Prerequisites

Make sure you have these installed:

| Tool | Version | Download |
|------|---------|----------|
| Java JDK | 17+ | https://adoptium.net |
| Maven | 3.8+ | https://maven.apache.org |
| Node.js | 16+ | https://nodejs.org |
| VS Code | Latest | https://code.visualstudio.com |

### Recommended VS Code Extensions
- **Extension Pack for Java** (Microsoft)
- **Spring Boot Extension Pack** (VMware)
- **ES7+ React/Redux/React-Native snippets**

---

## 🚀 How to Run

### Step 1 — Start the Backend

Open a terminal in VS Code (`Ctrl + `` ` ``):

```bash
cd backend
mvn spring-boot:run
```

✅ Backend runs at: **http://localhost:8080**
🔍 H2 Database Console: **http://localhost:8080/h2-console**
   - JDBC URL: `jdbc:h2:mem:tododb`
   - Username: `sa`
   - Password: *(leave empty)*

---

### Step 2 — Start the Frontend

Open a **second terminal** in VS Code:

```bash
cd frontend
npm install
npm start
```

✅ Frontend opens at: **http://localhost:3000**

---

## 📡 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `POST` | `/api/todos` | Create a new todo |
| `GET` | `/api/todos` | Get all todos |
| `GET` | `/api/todos?completed=true` | Filter by status |
| `GET` | `/api/todos/{id}` | Get todo by ID |
| `PUT` | `/api/todos/{id}` | Update a todo |
| `DELETE` | `/api/todos/{id}` | Delete a todo |

### Example Request Body (POST/PUT)
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}
```

---

## 🗄️ Database

Uses **H2 in-memory database** — data resets on every restart.

To switch to **PostgreSQL**, update `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tododb
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```
And add to `pom.xml`:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

---

## 🎨 Features

- ✅ Create todos with title & description
- ✅ View all todos with live stats (Total / Done / Active)
- ✅ Mark todos as complete/incomplete
- ✅ Edit todos inline
- ✅ Delete todos with confirmation
- ✅ Filter by All / Active / Completed
- ✅ Error handling & loading states
- ✅ Clean, responsive UI

---

## 📁 Backend File Structure

```
backend/src/main/java/com/example/todo/
├── TodoBackendApplication.java     ← Entry point
├── model/
│   └── Todo.java                   ← Entity
├── dto/
│   └── TodoRequest.java            ← Request body DTO
├── repository/
│   └── TodoRepository.java         ← JPA Repository
├── service/
│   └── TodoService.java            ← Business logic
├── controller/
│   └── TodoController.java         ← REST API
└── exception/
    └── GlobalExceptionHandler.java ← Error handling
```

## 📁 Frontend File Structure

```
frontend/src/
├── App.js                ← Main component
├── index.js              ← Entry point
├── index.css             ← Global styles
├── api/
│   └── todoApi.js        ← Axios API calls
└── components/
    ├── TodoForm.js       ← Add todo form
    └── TodoItem.js       ← Individual todo card
```
