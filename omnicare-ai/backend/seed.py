import random
import json
from database import SessionLocal, Patient, Visit

def seed_data():
    db = SessionLocal()
    db.query(Visit).delete()
    db.query(Patient).delete()

    first_names = ["Arjun", "Zara", "Leo", "Maya", "Siddharth", "Elena", "Kofi", "Yuki", "Chloe", "Omar"]
    last_names = ["Sawant", "Chen", "Gomez", "Smith", "Patel", "Muller", "Tanaka", "Ivanov", "Kim", "Okonkwo"]
    
    conditions = [
        ("Type 2 Diabetes", "E11.9", "Metformin 500mg", "HbA1c"),
        ("Hypertension", "I10", "Lisinopril 10mg", "Lipid Panel"),
        ("Asthma", "J45.90", "Albuterol Inhaler", "Peak Flow")
    ]

    for i in range(1, 101):
        full_name = f"{random.choice(first_names)} {random.choice(last_names)}"
        
        # 1. Expanded Demographics
        p = Patient(
            name=full_name,
            dob=f"{random.randint(1960, 2005)}-{random.randint(1,12):02d}-{random.randint(1,28):02d}",
            gender=random.choice(["Male", "Female", "Non-binary"]),
            phone=f"+1-555-{random.randint(100,999)}-{random.randint(1000,9999)}",
            address=f"{random.randint(1,999)} Healthcare Ave, Silicon Valley, CA",
            email=f"{full_name.lower().replace(' ', '.')}@provider.com",
            emergency_contact=f"Relative - {random.randint(5550000, 5559999)}",
            insurance_provider=random.choice(["Aetna", "BlueCross", "UnitedHealth", "Kaiser"]),
            insurance_policy=f"POL-{random.randint(100000, 999999)}",
            marital_status=random.choice(["Single", "Married", "Divorced"]),
            occupation=random.choice(["Engineer", "Teacher", "Manager", "Artist"]),
            language=random.choice(["English", "Spanish", "Hindi", "Mandarin"]),
            blood_type=random.choice(["A+", "O+", "B-", "AB+", "O-"]),
            allergies={
                "drug": [random.choice(["Penicillin", "None", "Sulfa"])],
                "food": [random.choice(["Peanuts", "None", "Shellfish"])],
                "env": ["Pollen", "Dust"]
            },
            past_surgeries=[{"name": random.choice(["Appendectomy", "Tonsillectomy", "None"]), "year": "2018"}],
            chronic_conditions="Hypertension, Seasonal Allergies",
            family_history="Father: Cardiac issues; Mother: Healthy",
            social_history={
                "smoking": random.choice(["Never", "Former", "Active"]),
                "alcohol": random.choice(["None", "Social", "Occasional"]),
                "exercise": "3 times per week",
                "diet": "Balanced, low sodium"
            },
            medical_seed=f"Longitudinal history for {full_name} established 2024."
        )
        db.add(p)
        db.flush()

        # Seed 3 Historical Encounters for Trend Graphics
        for year in [2024, 2025, 2026]:
            cond, icd, med, lab_name = random.choice(conditions)
            
            # Fluctuating Vitals for Graphing
            sys = random.randint(118, 145)
            dia = random.randint(70, 92)
            hba1c = round(random.uniform(5.5, 7.8), 1)

            v = Visit(
                patient_id=p.id,
                date=f"{year}-02-21",
                time=f"{random.randint(9,17)}:30 AM",
                encounter_type=random.choice(["Teleconsultation", "In-person", "Follow-up"]),
                clinician_name="Dr. Cavista",
                location="Main Clinic Facility",
                chief_complaint={
                    "text": f"Routine follow up for {cond}",
                    "duration": "Ongoing",
                    "severity": "Mild"
                },
                hpi=f"Patient presents for evaluation of {cond}. Denies acute pain or distress.",
                ros={
                    "General": "No fatigue",
                    "Cardiovascular": "No palpitations",
                    "Respiratory": "Normal breathing"
                },
                diagnosis=cond,
                icd_code=icd,
                jargon_summary=f"Everything looks stable. We'll stick to the {med} and keep monitoring.",
                vitals={
                    "bp": f"{sys}/{dia}", "hr": random.randint(60, 90), 
                    "temp": "98.6F", "spo2": "99%", "bmi": "24.5"
                },
                soap_notes={
                    "S": "Adherent to medication plan.",
                    "O": f"BP {sys}/{dia}. Heart rate regular.",
                    "A": f"Stable {cond}.",
                    "P": f"Continue {med} daily."
                },
                prescriptions=[{"med": med, "dose": "Standard", "freq": "Daily", "route": "Oral"}],
                lab_results=[{"test": lab_name, "result": f"{hba1c}%", "range": "4.0-5.6%"}],
                plan_details={
                    "referrals": "None",
                    "lifestyle": "Maintain hydration and 30min daily walk.",
                    "education": "Distributed flyer on blood sugar management."
                }
            )
            db.add(v)
    
    db.commit()
    db.close()
    print("Full Standard EMR Database (100 Patients) Seeded Successfully.")

if __name__ == "__main__":
    seed_data()