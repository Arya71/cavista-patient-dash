DESCRIPTION DOC
This is the Master Specification Document for OmniCare AI. It integrates the original requirements—now including a deep dive into EMR interoperability—with the "winner-tier" features we brainstormed.

🏥 OmniCare AI: Comprehensive Product Specification
Theme: Category B - CAVISTA Smart EMR & Diagnostic Assistant
Role: Professional Software Developer / Hackathon Winning Strategy

1. Project Overview
OmniCare AI is an Ambient Clinical Intelligence (ACI) platform that bridges the gap between patient experience and clinical documentation. It serves as an "Invisible Assistant" that listens, sees, and remembers, providing specialized dashboards for Doctors, Patients, and Medical Assistants.

2. Core Requirements (Enhanced & Expanded)
🎙️ Ambient Speech-to-Text Engine
Description: A voice-first system that captures natural clinician-patient dialogue without requiring the doctor to speak into a microphone.
Key Specs: Diarization (distinguishing speakers), medical-grade vocabulary processing, and background noise suppression.
Outcome: Converts unstructured audio into a formatted SOAP Note (Subjective, Objective, Assessment, Plan).
🧠 AI-Powered Summarization & Vital Extraction
Description: An NLP layer that sifts through transcripts to find clinical gold.
Key Specs: Automatically extracts vitals (Heart Rate, BP, Temp) and maps symptoms to severity levels.
Outcome: Reduces "Note Bloat" by providing a 150-word executive summary of a 15-minute conversation.
🏷️ ICD-10 Code Mapping & Suggested Treatments
Description: Intelligent billing and clinical decision support.
Key Specs: Real-time mapping of diagnoses to the latest ICD-10/CPT codes and cross-referencing treatments with the latest medical guidelines.
Outcome: Accurate reimbursement and reduced medical errors.
🌍 Patient-Friendly Summaries & Multilingual Support
Description: Translation of "Doctor Speak" into "Patient Action."
Key Specs: Uses LLMs to simplify jargon (e.g., "Pulmonary Edema" becomes "Fluid in the lungs") and supports 50+ languages for diverse populations.
Outcome: Higher patient compliance and health literacy.
🔌 Interoperability: Lightweight EMR Plugin & API (NEW)
Description: A "Glue Layer" that allows OmniCare to sit on top of legacy systems like Epic, Cerner, or local EMRs without a total system overhaul.
Key Specs: * HL7/FHIR Integration: Uses modern healthcare standards to "push" and "pull" data securely.
Sidecar Plugin: A lightweight Chrome Extension or Desktop Overlay that auto-fills EMR fields directly from the AI summary with one click.
Headless API: Provides a robust set of endpoints for hospital IT teams to fetch transcripts, summaries, and codes into their existing databases.
Outcome: Zero-friction adoption; doctors don't have to leave their familiar software.

3. Advanced Innovation Features (The "Winner" Layer)
🔄 1. Longitudinal Patient Memory (The "Seeded" Context)
Concept: The AI is "pre-briefed" with the patient's entire history (the Seed).
Utility: It identifies trends across years of data, alerting the doctor to subtle health declines that might be missed in a single 15-minute visit.
👁️ 2. Multi-Modal Diagnostic Input (Vision + Voice)
Concept: Integrating visual evidence into the clinical record.
Utility: Allows the Assistant to snap photos of skin conditions or upload X-ray/Lab PDFs. The VLM (Vision-Language Model) analyzes the image and integrates the findings into the EMR text.
⚠️ 3. Real-time Drug-Drug Interaction (DDI) & Safety Alerts
Concept: An automated safety net that never sleeps.
Utility: As a doctor prescribes a drug verbally, the AI cross-references the "Seeded" history for allergies or existing meds and flashes a "Red Alert" if a dangerous interaction is detected.
🔍 4. Semantic Search for Doctors
Concept: "Control + F" for a patient's entire medical life.
Utility: Doctors can ask natural language questions like "What was the patient's reaction to Penicillin in 2019?" and the AI retrieves the exact transcript.
🎭 5. Patient "Vibe Check" (Sentiment Analysis)
Concept: Capturing the emotional state of the patient.
Utility: Analyzes vocal tremors or word choice to detect high anxiety or cognitive confusion, flagging these for "High-Priority Follow-up" on the Assistant Dashboard.
🤖 6. Interactive Patient "Voice-Bot" Follow-up
Concept: A 24/7 post-visit companion.
Utility: A bot on the Patient Dashboard that knows exactly what was discussed. If the patient forgets their diet plan at 10 PM, the bot can remind them based on the transcript.
📉 7. Digital Twin Health Projections
Concept: Predictive health visualization.
Utility: Shows the patient a graph of their "Projected Health" based on compliance. "If you take this medication, your 5-year cardiac risk drops from 12% to 4%."
🚦 8. Smart Triage & Scheduling (Assistant Dashboard)
Concept: Re-inventing the waiting room.
Utility: The AI ranks the day's appointments by "Clinical Urgency" (based on pre-visit voice notes) rather than just the time of arrival.

4. User Dashboard Matrix
Feature
Doctor Dashboard
Patient Dashboard
Assistant Dashboard
Primary Tool
SOAP Note Automator
Interactive Recovery Bot
Smart Triage Queue
Key Insight
DDI & Trend Alerts
Digital Twin Projections
Audit-Ready Billing Codes
Data Access
Semantic Search
Jargon-free Summaries
Sentiment/Urgency Tags


5. Technical Stack Strategy
Frontend: React/Next.js for real-time dashboard responsiveness.
Backend: FastAPI (Python) to leverage the Gemini 1.5 Pro model (perfect for the "Seeded" history's large context window).
Interoperability: Integration via FHIR (Fast Healthcare Interoperability Resources) APIs.
Storage: Vector Database (like Pinecone or pgvector) for the Semantic Search functionality.

































This Technical Design Document (TDD) is engineered to be "LLM-Optimized." You can copy-paste sections of this into any AI (like Gemini, Claude, or GPT) to generate specific components, and it will have enough context to produce production-grade (or hackathon-winning) code.

📑 Technical Design Document: OmniCare AI
Project Goal: A voice-first EMR ecosystem with specialized dashboards for Doctor, Patient, and Assistant, powered by Ambient Clinical Intelligence.

1. System Architecture
We will use a decoupled architecture to ensure the frontend dashboards remain snappy while the backend handles heavy AI processing.
Tech Stack
Frontend: Next.js 15 (App Router) with TypeScript.
Styling: Tailwind CSS + Shadcn/UI (for professional medical components).
State Management: Zustand (lightweight for cross-dashboard state).
Animations: Framer Motion (for "winning" UI polish).
Backend: FastAPI (Python 3.12).
Asynchronous: High-concurrency support for streaming audio/AI responses.
AI Engine: Gemini 1.5 Pro (Note: Model 2.5 is not yet public; 1.5 Pro is current state-of-the-art for long medical context).
Database: SQLite with SQLAlchemy/SQLModel.
Why: Zero configuration, single-file storage, easy to "seed" for demos.
Vector Search: ChromaDB (Lightweight, runs locally) for the Semantic Doctor Search.

2. Database Schema (The "Seeded" Foundation)
To satisfy the "Longitudinal Memory" requirement, the database must store historical visits.
Python
# Tables:
# 1. Patients: id, name, dob, gender, medical_history_seed (Text)
# 2. Visits: id, patient_id, date, transcript, soap_summary (JSON), icd_codes (JSON)
# 3. Medications: id, patient_id, drug_name, dosage, status (active/past)
# 4. Triage: id, patient_id, urgency_score, reason_vocal_summary



3. API Design & AI Integration
A. POST /api/process-consultation
Input: Audio Blob + patient_id.
Logic:
STT (Speech-to-Text) using Whisper or Gemini's native audio sensing.
Context Injection: Fetch medical_history_seed from SQLite.
Prompt Engineering: > "Act as a CMIO (Chief Medical Information Officer). Using this transcript [T] and historical seed [S], generate a SOAP note, extract vitals, and check for drug-drug interactions with [Active_Meds]."
Output: Structured JSON containing Summary, Vitals, ICD Codes, and Safety Alerts.
B. POST /api/analyze-vision
Input: Image (X-ray/Rash) + patient_id.
Logic: Gemini 1.5 Flash analyzes the image and returns a text-based clinical observation to be appended to the current visit.

4. Dashboard-Specific Logic
1. Doctor Dashboard (The "Command Center")
Key Component: LiveTranscriptionMonitor.tsx
Feature: Semantic Search Bar.
Implementation: Backend uses ChromaDB to query old soap_summary fields via Natural Language.
Safety Layer: Real-time toast notifications for DDI (Drug-Drug Interaction) alerts.
2. Patient Dashboard (The "Care Companion")
Key Component: RecoveryBot.tsx
Feature: Digital Twin Graph.
Implementation: Simple Chart.js line graph showing a "Health Score" trending upward based on visit completion.
Language Toggle: One-click jargon-to-simple translation.
3. Assistant Dashboard (The "Operational Hub")
Key Component: SmartTriageQueue.tsx
Feature: A table sorted by urgency_score (1-10) generated by AI sentiment analysis of the patient's pre-visit voice note.

5. Implementation Roadmap (The "Hackathon Sprint")
Phase 1 (The Seed): Create a seed.py script that populates SQLite with 5 fake patients, each with 3-4 past visits (Transcripts/Meds) to demo the "Memory" feature.
Phase 2 (The Core): Set up the FastAPI /process endpoint. Hardcode the Gemini prompt for SOAP generation.
Phase 3 (The UI): Build the Next.js layouts. Use a "Dashboard Switcher" at the top of the screen to easily jump between Doctor, Patient, and Assistant views for judges.
Phase 4 (The Interop): Build a small "EMR Export" button that shows a JSON/HL7 payload to demonstrate integration readiness.

6. Prompt for your "Dumb AI" Coder
Copy and paste this to start building:
"I am building OmniCare AI, a medical EMR. I need a FastAPI backend and a Next.js 15 frontend.
Setup a FastAPI server with a SQLite database using SQLModel for 'Patients' and 'Visits'.
Create an endpoint /process-visit that takes a text transcript and uses Gemini 1.5 Pro to return a JSON object with: {summary, vitals: {bp, hr}, icd10_codes: [], and safety_alerts: []}.
For the frontend, create a Next.js dashboard with a sidebar for 'Doctor', 'Patient', and 'Assistant'.
Focus on a clean, professional 'Medical Blue' aesthetic using Tailwind."
Would you like me to generate the seed.py data script or the specific Gemini System Prompt for the SOAP note generation?

