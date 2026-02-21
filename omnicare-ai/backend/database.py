from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

SQLALCHEMY_DATABASE_URL = "sqlite:///./omnicare.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    # 1. Detailed Demographics
    name = Column(String)
    dob = Column(String)
    gender = Column(String)
    phone = Column(String)
    address = Column(String)
    email = Column(String)
    emergency_contact = Column(String)
    insurance_provider = Column(String)
    insurance_policy = Column(String)
    marital_status = Column(String)
    occupation = Column(String)
    language = Column(String)
    
    # 5. Past Medical & 8. Family History
    blood_type = Column(String)
    allergies = Column(JSON)      # Structure: {"drug": [], "food": [], "env": []}
    past_surgeries = Column(JSON) # List of {"name": "", "year": ""}
    chronic_conditions = Column(Text)
    family_history = Column(Text)
    
    # 9. Social History
    social_history = Column(JSON) # {"smoking": "", "alcohol": "", "diet": "", "exercise": ""}
    medical_seed = Column(Text)
    
    visits = relationship("Visit", back_populates="patient")

class Visit(Base):
    __tablename__ = "visits"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    
    # 2. Encounter Information
    date = Column(String)
    time = Column(String)
    encounter_type = Column(String) # Teleconsultation / In-person
    clinician_name = Column(String)
    location = Column(String)
    
    # 3. & 4. Chief Complaint & HPI
    chief_complaint = Column(JSON)  # {"text": "", "duration": "", "severity": ""}
    hpi = Column(Text)              # History of Present Illness narrative
    
    # 10. Review of Systems (ROS)
    ros = Column(JSON)              # System-wise symptoms checklist
    
    # 11. & 13. Vitals & Assessment
    diagnosis = Column(String)
    icd_code = Column(String)
    jargon_summary = Column(Text)
    vitals = Column(JSON)           # {bp, hr, temp, spo2, height, weight, bmi}
    soap_notes = Column(JSON)       # {S, O, A, P}
    
    # 14. Plan / Treatment
    prescriptions = Column(JSON)    # List of {med, dose, freq, route}
    lab_results = Column(JSON)      # List of {test, result, range}
    plan_details = Column(JSON)     # {referrals, lifestyle, education}
    
    patient = relationship("Patient", back_populates="visits")

Base.metadata.create_all(bind=engine)