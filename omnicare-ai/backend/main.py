from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, Patient, Visit

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/patients")
def get_patients(db: Session = Depends(get_db)):
    patients = db.query(Patient).all()
    return [{"id": p.id, "name": p.name} for p in patients]

@app.get("/api/emr/{patient_id}")
def get_emr(patient_id: int, db: Session = Depends(get_db)):
    p = db.query(Patient).filter(Patient.id == patient_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    visits = db.query(Visit).filter(Visit.patient_id == patient_id).all()
    
    # Manually build the response to match frontend expectations exactly
    return {
        "profile": {
            "id": p.id,
            "name": p.name,
            "dob": p.dob,
            "gender": p.gender,
            "phone": p.phone,
            "address": p.address,
            "email": p.email,
            "emergency_contact": p.emergency_contact,
            "insurance_provider": p.insurance_provider,
            "insurance_policy": p.insurance_policy,
            "marital_status": p.marital_status,
            "occupation": p.occupation,
            "language": p.language,
            "blood_type": p.blood_type,
            "allergies": p.allergies,
            "past_surgeries": p.past_surgeries,
            "chronic_conditions": p.chronic_conditions,
            "family_history": p.family_history,
            "social_history": p.social_history
        },
        "history": [
            {
                "date": v.date,
                "time": v.time,
                "encounter_type": v.encounter_type,
                "clinician_name": v.clinician_name,
                "location": v.location,
                "chief_complaint": v.chief_complaint,
                "hpi": v.hpi,
                "ros": v.ros,
                "diagnosis": v.diagnosis,
                "icd_code": v.icd_code,
                "jargon_summary": v.jargon_summary,
                "vitals": v.vitals,
                "soap_notes": v.soap_notes,
                "prescriptions": v.prescriptions,
                "lab_results": v.lab_results,
                "plan_details": v.plan_details
            } for v in visits
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)   