
# 🧑‍💼 Employee Management System (OOAD Mini Project)

A full-stack Employee Management System developed as part of the Object Oriented Analysis and Design (OOAD) course project at PES University.

This system enables HR teams to manage employee records, payroll, leave requests, recruitment, and background verification through an intuitive web application.

---

## 🛠️ Tech Stack

| Layer        | Technology               |
|--------------|---------------------------|
| Frontend     | React.js, HTML, CSS       |
| Backend      | Java 17, Spring Boot 3    |
| Database     | MySQL 8                   |
| IDE Used     | Visual Studio Code        |
| Others       | REST APIs, Axios, GitHub  |

---

## 📁 Project Structure

```
employee-management-system/
├── frontend/                  # React-based admin panel
├── backend/                   # Spring Boot microservice
├── database/                  # SQL schema and seed data
└── README.md                  # You're reading it!
```

---

## ✨ Features

### ✅ Admin Features
- Dashboard with employee and payroll stats
- Add, update, delete employee records
- Leave management and approval system
- Payroll management with salary updates and hikes
- Real-time background verification tracking

### ✅ Recruitment Portal
- Candidate job application form
- Document upload: Degree, 10th & 12th marksheets
- Admin panel to verify or reject applications with remarks

---

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
```

### 2. Start the backend

```bash
cd backend
 mvn clean install
./mvnw spring-boot:run
```

> Make sure MySQL is running and update your database config in `application.properties`

### 3. Start the frontend

```bash
cd ../frontend
npm install
npm start/npm run dev
```

---

## 📸 UI Preview

You can find the UI preview in the OOAD_Report file
---

## 📦 Requirements

- Node.js v18+
- Java 17
- MySQL 8+
- Visual Studio Code

---

## 🤝 Contributors

- Vundela Vipul Kumar Reddy (PES1UG22CS709)  
- Veluru S L Dheeraj Chowdary (PES1UG22CS684)  
- Aditya KR (PES2UG22CS244)  
- Suhas PH (PES2UG22CS588)

---

## 📜 License

MIT License – feel free to fork and use with credits!
