# 🧮 Matrix Calculator Web App

![Python](https://img.shields.io/badge/Python-3.x-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0.0-lightgrey.svg)
![NumPy](https://img.shields.io/badge/NumPy-1.26.0-lightblue.svg)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg)

## 📖 About The Project

Hi! Welcome to my **Matrix Calculator Web App**. As a B.Tech Computer Science student, I built this project to strengthen my understanding of linear algebra concepts and to get hands-on experience with backend web development using **Python Flask** and **Vanilla JavaScript**. 

Instead of relying on heavy frontend frameworks like React or CSS libraries like Bootstrap, I wanted to build everything from scratch. This helped me deeply understand DOM manipulation, AJAX (Fetch API) requests, and manual CSS styling. The backend uses Python's powerful `NumPy` library to handle the complex matrix computations accurately and efficiently.

This calculator handles dynamically sized matrices (up to 10x10) and prevents full page reloads for a seamless user experience.

---

## ✨ Features Supported

Currently, the calculator supports the following matrix operations:
- **Matrix Addition (A + B)**: Adds two matrices of the exact same dimensions.
- **Matrix Subtraction (A - B)**: Subtracts Matrix B from Matrix A.
- **Matrix Multiplication (A × B)**: Multiplies two matrices (validates that columns of A match rows of B).
- **Matrix Transpose (Aᵀ)**: Flips a matrix over its diagonal.
- **Determinant (|A|)**: Calculates the scalar determinant value of any square matrix.
- **Inverse (A⁻¹)**: Computes the inverse of a non-singular square matrix.
- **Trace (tr(A))**: Finds the sum of the elements on the main diagonal of a square matrix.

*Note: The app includes strict dimension validation and will return clear error messages if an operation is mathematically invalid.*

---

## 🛠️ Tech Stack & Why I Chose It

- **Frontend (HTML5, CSS3, Vanilla JavaScript)**: I used pure HTML/CSS to create a clean, responsive, card-based UI without any bloat. Vanilla JS is used to dynamically generate the grid inputs based on the user's size selection and to send asynchronous `fetch` requests to the server.
- **Backend (Python Flask)**: Flask is lightweight and perfect for this kind of API-driven application. It catches the JSON payloads from the frontend, processes them, and returns the results.
- **Computation (NumPy)**: Writing raw Python loops for matrix multiplication and inversion can be slow and error-prone. NumPy is the industry standard for numerical computing, making the calculations extremely fast and reliable.

---

## 📂 Project Structure

```text
matrix-calculator/
├── app.py                 # The main Flask server and API routing
├── requirements.txt       # List of Python dependencies
├── README.md              # You are reading this!
├── templates/
│   └── index.html         # The main user interface structure
└── static/
    ├── style.css          # Custom styling and responsive design
    └── script.js          # Dynamic DOM manipulation and Fetch API logic
```

---

## 🚀 Getting Started (Local Setup)

Want to run this project on your own machine? Follow these simple steps.

### Prerequisites
Make sure you have [Python 3.x](https://www.python.org/downloads/) installed on your computer. 

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/matrix-calculator.git
   cd matrix-calculator
   ```

2. **Create a Virtual Environment**
   It's always a good practice to use a virtual environment to manage dependencies.
   - **On Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **On macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install Dependencies**
   Install Flask and NumPy using pip:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application**
   Start the local Flask development server:
   ```bash
   python app.py
   ```

5. **Open in Browser**
   Open your favorite web browser and navigate to:  
   👉 `http://127.0.0.1:5000`

---

## 💡 How to Use

1. **Select an Operation**: Use the top dropdown to choose what you want to calculate (e.g., Multiplication).
2. **Set Dimensions**: Enter the number of rows and columns for Matrix A and Matrix B, then click "Set Size". *(Max size is 10x10)*
3. **Enter Values**: Type your numbers into the newly generated grid cells.
4. **Calculate**: Hit the "Calculate" button. The background JavaScript will send the data to the Flask server, compute it using NumPy, and instantly display the result below without reloading the page.
5. **Clear All**: Use the "Clear All" button to quickly reset the board.

---

## 🎯 Future Scope
As I continue to learn, I plan to add the following features:
- Step-by-step calculation breakdown (showing the actual math process).
- Eigenvalues and Eigenvectors computation.
- Solving systems of linear equations (e.g., Ax = B).
- Exporting the results to a `.csv` or `.txt` file.

---

## 🤝 Let's Connect
I'm a B.Tech CSE student actively learning and building cool projects. Feel free to reach out, share feedback, or check out my other work!
- **GitHub**: [@ArshUsSaba](https://github.com/ArshUsSaba)
- **LinkedIn**: [Arsh Us Saba](https://linkedin.com/in/arsh-us-saba)

*If you found this project helpful or interesting, please consider giving it a ⭐ on GitHub!*
