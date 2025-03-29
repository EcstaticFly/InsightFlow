# 🚀 InsightFlow – AI-Powered Data Query Dashboard  

InsightFlow is a **React-based data query dashboard** that enables users to **ask complex business questions, get AI-powered suggestions, and visualize results interactively**. Built with **Redux, Tailwind CSS, and Recharts/Chart.js**, it simulates **AI-driven query interaction** and helps non-technical teams make data-driven decisions efficiently.  

## 🔗 Live Demo  
[InsightFlow](https://insightflow-analytics.vercel.app/)  

## 📂 Source Code  
[GitHub Repository](https://github.com/EcstaticFly/InsightFlow.git)  

---

## ✨ Features  
- **📝 Natural Language Query Input** – Enables users to ask data-related questions intuitively.  
- **💡 AI-Powered Suggestions** – Provides smart query recommendations.  
- **📜 Query History** – Stores previously executed queries for reference.  
- **📊 Interactive Data Visualization** – Displays query results using charts (Recharts/Chart.js).  
- **⏳ Loading & Error States** – Simulates AI query processing with appropriate UI feedback.  

---

## 🛠 Tech Stack  
- **Frontend:** React.js  
- **State Management:** Redux  
- **Styling:** Tailwind CSS
- **Data Visualization:** Recharts

---

## 🚀 Installation & Setup  

1️⃣ **Clone the repository:**  
   ```bash
   git clone https://github.com/EcstaticFly/InsightFlow.git
   cd Insightflow
   ```  

2️⃣ **Install dependencies:**  
   ```bash
   npm install
   ```  

3️⃣ **Configure environment variables:**  
   ```bash
   # Create a .env file in the client directory
   cd client
   touch .env
   ```  
   Add the following in `client/.env`:  
   ```bash
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```  

4️⃣ **Start the development server:**  
   ```bash
   npm run dev
   ```  

5️⃣ **The app will be live at** `http://localhost:5173`

---

## 📌 Approach & Implementation  
The development of **InsightFlow** focused on creating an intuitive, AI-powered dashboard prototype that simulates real-world data querying. Here's how the implementation was structured:  

### **1️⃣ UI Components Development**  
- Designed a clean, responsive UI using **Tailwind CSS**.  
- Built modular components for **query input, history, and result visualization**.  
- Implemented AI-powered query suggestions.  

### **2️⃣ State Management with Redux**  
- Managed **query submission, processing states, and history** using Redux.  
- Created **actions & reducers** for handling query interactions.  

### **3️⃣ Query Processing Simulation**  
- Implemented **mock AI response handling** to simulate query execution.  
- Added **loading and error states** to enhance user experience.  

### **4️⃣ Data Visualization**  
- Integrated **Recharts/Chart.js** to display results in a visually appealing format.  

This structured approach ensures **scalability, maintainability, and a smooth user experience** while demonstrating core frontend engineering principles.

---

## 🤝 Contributing  
Contributions, issues, and feature requests are welcome!  
Feel free to **fork** the repo and submit a **pull request**.  

---

## 📜 License  
This project is licensed under the **GNU GENERAL PUBLIC LICENSE v3**. 

---

## 📬 Contact  
For inquiries, reach out to me at [Suyash Pandey](mailto:suyash.2023ug1100@iiitranchi.ac.in).  

---

