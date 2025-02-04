# SIP & Lumpsum Calculator

This project is a **SIP & Lumpsum Investment Calculator** built using Flask for the backend and HTML, CSS, and JavaScript for the frontend. It calculates investment returns and displays a **donut-style pie chart** for visualization.

---

## 📌 Features

- **SIP (Systematic Investment Plan) & Lumpsum Calculation**
- **Beautiful Pie Chart** visualization with a **progress indicator**
- **San Francisco Font & Apple-like UI**
- **Responsive Design** for mobile compatibility
- **Flask Backend** with **CORS enabled** for frontend communication

---

## 📂 Project Structure

```
The-Ai-Genrated-Projects/
│-- static/
│   │-- index.html  # Frontend UI
│-- app.py         # Flask Backend
│-- README.md      # Documentation
```

---

## 🚀 Setup & Installation

### 1️⃣ Install Python (If not installed)

Ensure **Python 3.7+** is installed on your system.

```sh
python --version
```

### 2️⃣ Clone the Repository

```sh
git clone https://github.com/PriyankPambhar/The-Ai-Genrated-Projects.git
cd The-Ai-Genrated-Projects
```

### 3️⃣ Install Required Libraries

Use the following command to install dependencies:

```sh
pip install flask matplotlib numpy flask-cors
```

### 4️⃣ Run the Flask Backend

Start the Flask server:

```sh
python app.py
```

- The backend will be running at **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

### 5️⃣ Open the Frontend

1. Open **index.html** in your browser.
2. Enter investment details and click **Calculate**.
3. View the results and pie chart.

---

## 🎨 Frontend (index.html)

This file contains:

- A **beautiful UI** for input fields and buttons
- A **fetch request** to communicate with the Flask API
- **JavaScript** to update the results dynamically

#### 🎯 Key Features:

- **Fully Responsive** for mobile devices
- **Apple-style Colors & Fonts**
- **Donut-style Pie Chart** visualization

---

## 🔧 Backend (app.py)

The Flask API performs:

- **SIP Calculation** (monthly investment growth)
- **Lumpsum Calculation** (one-time investment growth)
- **Pie Chart Generation** using **Matplotlib**
- **CORS Handling** to allow frontend requests

#### 📊 Pie Chart Improvements:

✅ **Perfect Round Shape**\
✅ **San Francisco Font Applied**\
✅ **Light Grey & Green Colors**\
✅ **Progress Percentage in Center**

---

## 💡 API Endpoint

### **POST /calculate**

#### 📌 Request Body (JSON)

```json
{
  "type": "sip", // or "lumpsum"
  "investment": 5000,
  "rate": 12,
  "years": 10
}
```

#### 📌 Response (JSON)

```json
{
  "invested": 600000,
  "total_returns": 1160331.35,
  "chart": "data:image/png;base64,..." // Base64 Encoded Pie Chart
}
```

---

## ❓ Troubleshooting

- **Server not running?** Run `python app.py` in the correct directory.
- **Graph not loading?** Ensure `matplotlib` is installed properly (`pip install matplotlib`).
- **CORS Error?** Make sure Flask CORS is enabled (`pip install flask-cors`).

---

## 📜 License

This project is **open-source** under the **MIT License**.

---

## 📬 Contact

For any queries, reach out at **[pambharpriyank1@gmail.com](mailto:your-email@example.com)**.

---

Happy Coding! 🚀

