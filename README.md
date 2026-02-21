## 📄 OmniCare AI: Ambient Clinical Intelligence Dashboard

This project is a high-fidelity **Electronic Medical Record (EMR)** ecosystem designed to bridge the gap between patient experience and clinical documentation. It features an **Ambient Clinical Intelligence (ACI)** platform that converts unstructured dialogue into structured SOAP notes and provides longitudinal health insights through interactive data visualization.

---

### 🛠️ Tech Stack

* **Frontend:** Next.js 15 (App Router), Tailwind CSS, Lucide React (Icons), Recharts (Analytics).
* **Backend:** FastAPI (Python 3.12).
* **Database:** SQLite with SQLAlchemy ORM (FHIR-aligned schema).

---

### 📂 Directory Structure

```text
omnicare-ai/
├── backend/
│   ├── main.py          # FastAPI Server & API Endpoints
│   ├── database.py      # SQLAlchemy Models (EMR Schema)
│   ├── seed.py          # Seeding script for 100 patient records
│   └── omnicare.db      # SQLite Database (Auto-generated)
└── frontend/
    ├── app/
    │   └── page.tsx      # Unified Patient Dashboard & EMR Modal
    └── ...               # Standard Next.js files

```

---

### 🚀 Installation & Setup

#### 1. Prerequisites

Ensure you have **Python 3.10+** and **Node.js 18+** installed on your Mac.

#### 2. Backend Setup

1. **Navigate to the backend folder:**
```bash
cd backend

```


2. **Create and activate a virtual environment:**
```bash
python3 -m venv venv
source venv/bin/activate

```


3. **Install dependencies:**
```bash
pip install fastapi uvicorn sqlalchemy

```


4. **Initialize and Seed the Database:**
*Note: This generates 100 unique patient profiles with 3 years of clinical history.*
```bash
python3 seed.py

```



#### 3. Frontend Setup

1. **Navigate to the frontend folder:**
```bash
cd ../frontend

```


2. **Install dependencies:**
```bash
npm install
npm install lucide-react recharts

```



---

### 🏃 Running the Application

You will need **two terminal windows** open simultaneously.

**Terminal 1: Start the Backend**

```bash
cd backend
source venv/bin/activate
python3 main.py

```

*The API will be available at `http://127.0.0.1:8000`.*

**Terminal 2: Start the Frontend**

```bash
cd frontend
npm run dev

```

*The Dashboard will be available at `http://localhost:3000`.*

---

### 🌟 Key Features to Explore

* **Patient Master Index:** A dropdown to toggle between 100 seeded patient profiles.
* **Clinical Trends:** Interactive line charts showing longitudinal Blood Pressure and HbA1c stability.
* **Ambient AI Summary:** Patient-friendly "jargon-free" summaries of complex medical encounters.
* **Complete EMR:** Click the "View Complete EMR" button on any encounter to see the full FHIR-aligned record, including Social History, HPI, and Treatment Plans.
