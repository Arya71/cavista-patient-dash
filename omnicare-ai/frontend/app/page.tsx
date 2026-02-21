// "use client";
// import React, { useEffect, useState } from 'react';
// import { 
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
// } from 'recharts';
// import { 
//   User, Calendar, ClipboardList, Activity, ChevronDown, 
//   ShieldAlert, Pill, Microscope, History, Phone, TrendingUp, HeartPulse
// } from 'lucide-react';

// // --- Clinical Trends Component ---
// const ClinicalTrends = ({ history }: { history: any[] }) => {
//   // Parse longitudinal data for charts
//   const chartData = [...history].reverse().map(v => ({
//     date: v.date,
//     systolic: parseInt(v.vitals.bp.split('/')[0]),
//     diastolic: parseInt(v.vitals.bp.split('/')[1]),
//     hba1c: parseFloat(v.lab_results[0]?.result.replace('%', '')) || 0
//   }));

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//       {/* BP Trend Chart */}
//       <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
//         <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
//           <HeartPulse size={16} className="text-red-500"/> Blood Pressure (mmHg)
//         </h3>
//         <div className="h-64 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//               <XAxis dataKey="date" fontSize={10} tickMargin={10} />
//               <YAxis domain={[60, 160]} fontSize={10} />
//               <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
//               <Legend verticalAlign="top" height={36}/>
//               <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} name="Systolic" />
//               <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="Diastolic" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Lab Results Trend Chart */}
//       <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
//         <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
//           <Microscope size={16} className="text-purple-500"/> Lab: HbA1c (%)
//         </h3>
//         <div className="h-64 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//               <XAxis dataKey="date" fontSize={10} tickMargin={10} />
//               <YAxis domain={[4, 8]} fontSize={10} />
//               <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
//               <Legend verticalAlign="top" height={36}/>
//               <Line type="monotone" dataKey="hba1c" stroke="#a855f7" strokeWidth={3} dot={{ r: 6 }} name="HbA1c Value" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function PatientDashboard() {
//   const [patients, setPatients] = useState([]);
//   const [selectedId, setSelectedId] = useState("");
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   // Load patient directory
//   useEffect(() => {
//     fetch('http://localhost:8000/api/patients')
//       .then(res => res.json())
//       .then(setPatients)
//       .catch(err => console.error("Directory fetch failed:", err));
//   }, []);

//   // Load individual EMR
//   useEffect(() => {
//     if (selectedId) {
//       setLoading(true);
//       fetch(`http://localhost:8000/api/emr/${selectedId}`)
//         .then(res => res.json())
//         .then(d => {
//           setData(d);
//           setLoading(false);
//         })
//         .catch(err => setLoading(false));
//     }
//   }, [selectedId]);

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-900">
//       <div className="max-w-7xl mx-auto">
        
//         {/* EMR Header */}
//         <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight text-slate-800">OmniCare EMR Portal</h1>
//             <p className="text-slate-500 text-sm">Patient Health Record • Standardized FHIR View</p>
//           </div>
//           <div className="relative inline-block w-full md:w-96">
//             <select 
//               className="block appearance-none w-full bg-slate-50 border border-slate-200 px-4 py-3 pr-8 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer text-sm font-semibold"
//               value={selectedId}
//               onChange={(e) => setSelectedId(e.target.value)}
//             >
//               <option value="">Select Patient Record...</option>
//               {patients.map((p: any) => (
//                 <option key={p.id} value={p.id}>{p.name} (EMR-{p.id})</option>
//               ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
//               <ChevronDown size={18} />
//             </div>
//           </div>
//         </header>

//         {loading ? (
//           <div className="flex flex-col items-center justify-center p-40">
//             <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//             <p className="text-slate-400 font-medium">Retrieving Longitudinal Data...</p>
//           </div>
//         ) : data ? (
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
            
//             {/* Sidebar: Patient Profile & Demographics */}
//             <div className="lg:col-span-4 space-y-6">
//               <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm border-t-8 border-t-blue-600">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><User size={28}/></div>
//                   <div>
//                     <h2 className="text-xl font-bold">{data.profile.name}</h2>
//                     <p className="text-xs text-slate-400 font-mono">ID: {selectedId}-EMR-2026</p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 text-sm">
//                   {[
//                     { label: "DOB", val: data.profile.dob, icon: <Calendar size={14}/> },
//                     { label: "Gender", val: data.profile.gender },
//                     { label: "Contact", val: data.profile.contact },
//                     { label: "Blood", val: data.profile.blood_type, color: "text-red-600" }
//                   ].map((item, idx) => (
//                     <div key={idx} className="flex justify-between border-b pb-2">
//                       <span className="text-slate-500 flex items-center gap-2">{item.icon} {item.label}</span>
//                       <span className={`font-semibold ${item.color || ""}`}>{item.val}</span>
//                     </div>
//                   ))}
//                   <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
//                     <p className="text-orange-800 font-bold text-[10px] uppercase flex items-center gap-2 mb-1">
//                       <ShieldAlert size={14}/> Clinical Allergies
//                     </p>
//                     <p className="text-orange-900 font-semibold">{data.profile.allergies}</p>
//                   </div>
//                 </div>
//               </section>

//               <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
//                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
//                   <History size={16}/> Medical History
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-xs font-bold text-slate-800 mb-2">Chronic Conditions</p>
//                     <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border">{data.profile.chronic_conditions}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-slate-800 mb-2">Past Surgeries</p>
//                     {data.profile.past_surgeries.map((s: any, idx: number) => (
//                       <div key={idx} className="flex justify-between text-sm bg-slate-50 p-2 rounded-lg mb-2 border">
//                         <span>{s.name}</span>
//                         <span className="text-slate-400 font-mono">{s.year}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </section>
//             </div>

//             {/* Main Content: Trends & Encounters */}
//             <div className="lg:col-span-8 space-y-6">
//               <h2 className="text-xl font-bold flex items-center gap-2 px-2 text-slate-700">
//                 <TrendingUp className="text-blue-600" /> Clinical Trends
//               </h2>
              
//               <ClinicalTrends history={data.history} />

//               <h2 className="text-xl font-bold flex items-center gap-2 px-2 text-slate-700 pt-4">
//                 <ClipboardList className="text-blue-600" /> Encounter History
//               </h2>

//               <div className="space-y-6">
//                 {data.history.map((visit: any, i: number) => (
//                   <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
//                     <div className="bg-slate-800 px-6 py-4 flex justify-between items-center text-white">
//                       <div className="flex items-center gap-3">
//                         <Calendar size={18} className="text-blue-400"/>
//                         <span className="font-bold">{visit.date}</span>
//                       </div>
//                       <span className="text-[10px] bg-white/20 px-2 py-1 rounded font-mono tracking-wider">ICD-10: {visit.icd_code}</span>
//                     </div>

//                     <div className="p-6">
//                       <h3 className="text-2xl font-bold text-slate-800 mb-4">Dx: {visit.diagnosis}</h3>
                      
//                       {/* Jargon-Free Section */}
//                       <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-6">
//                         <p className="text-[10px] font-black text-blue-700 uppercase mb-1 flex items-center gap-2">
//                           <Activity size={12}/> Ambient AI Summary
//                         </p>
//                         <p className="text-blue-900 italic font-medium">"{visit.jargon_summary}"</p>
//                       </div>

//                       <div className="grid md:grid-cols-2 gap-8 text-sm">
//                         {/* SOAP Documentation */}
//                         <div className="grid grid-cols-2 gap-4">
//                           {[
//                             { k: "Subjective", v: visit.soap_notes.S },
//                             { k: "Objective", v: visit.soap_notes.O },
//                             { k: "Assessment", v: visit.soap_notes.A },
//                             { k: "Plan", v: visit.soap_notes.P }
//                           ].map((soap, idx) => (
//                             <div key={idx}>
//                               <label className="text-[10px] font-black text-slate-400 uppercase">{soap.k}</label>
//                               <p className="text-slate-600 mt-1">{soap.v}</p>
//                             </div>
//                           ))}
//                         </div>

//                         {/* Prescriptions & Labs */}
//                         <div className="space-y-4">
//                           <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
//                             <h4 className="text-[10px] font-black text-green-700 uppercase mb-3 flex items-center gap-2"><Pill size={14}/> Prescriptions</h4>
//                             {visit.prescriptions.map((m: any, idx: number) => (
//                               <div key={idx} className="flex justify-between py-1 border-b border-green-100 last:border-0 font-medium text-green-900">
//                                 <span>{m.med}</span>
//                                 <span>{m.dose}</span>
//                               </div>
//                             ))}
//                           </div>
//                           <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
//                             <h4 className="text-[10px] font-black text-purple-700 uppercase mb-3 flex items-center gap-2"><Microscope size={14}/> Lab Tests</h4>
//                             {visit.lab_results.map((l: any, idx: number) => (
//                               <div key={idx} className="flex justify-between py-1 font-medium text-purple-900">
//                                 <span>{l.test}</span>
//                                 <span className="font-mono">{l.result}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-[40px] p-32 border-2 border-dashed border-slate-200 text-center">
//             <ClipboardList className="mx-auto text-slate-200 mb-4" size={64} />
//             <h3 className="text-slate-800 font-bold text-xl">Clinical Dashboard Inactive</h3>
//             <p className="text-slate-500 mt-2">Select a patient profile to initialize the longitudinal EMR chart.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// NEW V1  
////////////////////////
"use client";
import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  User, Calendar, ClipboardList, Activity, ChevronDown, 
  ShieldAlert, Pill, Microscope, History, Phone, TrendingUp, HeartPulse,
  X, Printer, FileText, MapPin, Briefcase, Heart, Info, Landmark
} from 'lucide-react';

// --- Clinical Trends Component ---
const ClinicalTrends = ({ history }: { history: any[] }) => {
  const chartData = [...history].reverse().map(v => ({
    date: v.date,
    systolic: parseInt(v.vitals.bp.split('/')[0]),
    diastolic: parseInt(v.vitals.bp.split('/')[1]),
    hba1c: parseFloat(v.lab_results[0]?.result.replace('%', '')) || 0
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
          <HeartPulse size={16} className="text-red-500"/> Blood Pressure Trend (mmHg)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" fontSize={10} tickMargin={10} />
              <YAxis domain={[60, 160]} fontSize={10} />
              <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="top" height={36}/>
              <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} name="Systolic" />
              <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="Diastolic" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
          <Microscope size={16} className="text-purple-500"/> Metabolic Stability (HbA1c %)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" fontSize={10} tickMargin={10} />
              <YAxis domain={[4, 9]} fontSize={10} />
              <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="top" height={36}/>
              <Line type="monotone" dataKey="hba1c" stroke="#a855f7" strokeWidth={3} dot={{ r: 6 }} name="HbA1c Value" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- Full EMR Modal Component ---
const FullEMRModal = ({ isOpen, onClose, data, visitIndex }: any) => {
  if (!isOpen || !data) return null;
  const visit = data.history[visitIndex];
  const profile = data.profile;

  const SubHeader = ({ title, icon: Icon }: any) => (
    <h3 className="text-blue-700 font-black border-b border-blue-100 pb-2 mb-4 uppercase text-[11px] tracking-widest flex items-center gap-2">
      <Icon size={14} /> {title}
    </h3>
  );

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="bg-white w-full max-w-6xl h-full max-h-[95vh] rounded-[40px] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="px-8 py-6 border-b flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg"><FileText size={24}/></div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Patient Clinical Record</h2>
              <p className="text-slate-400 text-[10px] font-bold tracking-[0.3em]">OMNICARE AI AMBIENT INTELLIGENCE</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => window.print()} className="p-3 hover:bg-white rounded-2xl transition border border-transparent hover:border-slate-200"><Printer size={20}/></button>
            <button onClick={onClose} className="p-3 bg-slate-100 hover:bg-red-500 hover:text-white rounded-2xl transition-all"><X size={20}/></button>
          </div>
        </div>

        {/* Scrollable Clinical Content */}
        <div className="flex-1 overflow-y-auto p-10 space-y-12">
          
          {/* 1. Demographics */}
          <section>
            <SubHeader title="1. Patient Demographics" icon={User} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
               <div><p className="text-slate-400 font-bold text-[10px] uppercase">Full Name</p><p className="font-bold">{profile.name}</p></div>
               <div><p className="text-slate-400 font-bold text-[10px] uppercase">DOB / Age</p><p className="font-bold">{profile.dob}</p></div>
               <div><p className="text-slate-400 font-bold text-[10px] uppercase">Gender</p><p className="font-bold">{profile.gender}</p></div>
               <div><p className="text-slate-400 font-bold text-[10px] uppercase">Phone</p><p className="font-bold">{profile.phone}</p></div>
               <div><p className="text-slate-400 font-bold text-[10px] uppercase">Email</p><p className="font-bold text-blue-600 underline">{profile.email}</p></div>
               <div><p className="text-slate-400 font-bold text-[10px] uppercase">Insurance Provider</p><p className="font-bold">{profile.insurance_provider}</p></div>
               <div><p className="text-slate-400 font-bold text-[10px] uppercase">Policy Number</p><p className="font-bold">{profile.insurance_policy}</p></div>
               <div><p className="text-slate-400 font-bold text-[10px] uppercase">Occupation</p><p className="font-bold">{profile.occupation}</p></div>
            </div>
          </section>

          {/* 2 & 3. Encounter & Chief Complaint */}
          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
               <SubHeader title="2. Encounter Information" icon={Info} />
               <div className="grid grid-cols-2 gap-4 text-xs">
                 <p><span className="text-slate-400 font-bold">Type:</span> {visit.encounter_type}</p>
                 <p><span className="text-slate-400 font-bold">Location:</span> {visit.location}</p>
                 <p><span className="text-slate-400 font-bold">Clinician:</span> {visit.clinician_name}</p>
                 <p><span className="text-slate-400 font-bold">Date:</span> {visit.date} @ {visit.time}</p>
               </div>
            </section>
            <section className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
               <SubHeader title="3. Chief Complaint (CC)" icon={Activity} />
               <p className="text-sm font-bold text-indigo-900 italic">"{visit.chief_complaint.text}"</p>
               <p className="text-[10px] mt-2 text-indigo-600 font-black uppercase">Severity: {visit.chief_complaint.severity} • Duration: {visit.chief_complaint.duration}</p>
            </section>
          </div>

          {/* 4. HPI Narrative */}
          <section>
            <SubHeader title="4. History of Present Illness (HPI)" icon={ClipboardList} />
            <p className="text-sm leading-relaxed text-slate-700 bg-white p-6 rounded-3xl border shadow-inner italic">{visit.hpi}</p>
          </section>

          {/* 5, 6, 7. PMH, Medications, Allergies */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-3xl border">
               <SubHeader title="5. Medical History" icon={History} />
               <p className="text-xs font-bold text-slate-800 mb-2">Chronic: {profile.chronic_conditions}</p>
               <p className="text-xs text-slate-500">Family: {profile.family_history}</p>
            </div>
            <div className="p-6 bg-green-50 rounded-3xl border border-green-100">
               <SubHeader title="6. Medications" icon={Pill} />
               {visit.prescriptions.map((m: any, idx: number) => (
                 <p key={idx} className="text-xs font-bold text-green-900 mb-1">• {m.med} ({m.dose} - {m.freq})</p>
               ))}
            </div>
            <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
               <SubHeader title="7. Allergies" icon={ShieldAlert} />
               <p className="text-xs font-bold text-red-900">DRUG: {profile.allergies.drug?.join(', ')}</p>
               <p className="text-xs font-bold text-red-900">FOOD: {profile.allergies.food?.join(', ')}</p>
            </div>
          </div>

          {/* 10, 11, 13, 14. ROS, Vitals, Assessment, Plan */}
          <div className="grid md:grid-cols-2 gap-10">
            <section>
              <SubHeader title="10. Review of Systems (ROS)" icon={Activity} />
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase">
                {Object.entries(visit.ros).map(([sys, status]: any) => (
                  <div key={sys} className="flex justify-between p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-400">{sys}</span><span>{status}</span>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <SubHeader title="11. Vital Signs" icon={HeartPulse} />
              <div className="grid grid-cols-2 gap-4 text-xs">
                 <div className="p-3 border rounded-2xl"><p className="text-slate-400 uppercase font-black text-[9px]">Blood Pressure</p><p className="text-lg font-black">{visit.vitals.bp}</p></div>
                 <div className="p-3 border rounded-2xl"><p className="text-slate-400 uppercase font-black text-[9px]">SPO2</p><p className="text-lg font-black">{visit.vitals.spo2}</p></div>
                 <div className="p-3 border rounded-2xl"><p className="text-slate-400 uppercase font-black text-[9px]">BMI</p><p className="text-lg font-black">{visit.vitals.bmi}</p></div>
                 <div className="p-3 border rounded-2xl"><p className="text-slate-400 uppercase font-black text-[9px]">Heart Rate</p><p className="text-lg font-black">{visit.vitals.hr} bpm</p></div>
              </div>
            </section>
          </div>

          {/* FINAL ASSESSMENT & PLAN */}
          <section className="bg-blue-600 p-10 rounded-[40px] text-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <h3 className="text-blue-200 font-black uppercase text-[10px] mb-4 tracking-widest">13. Assessment / Diagnosis</h3>
                  <p className="text-3xl font-black italic mb-2">{visit.diagnosis}</p>
                  <p className="text-blue-100 font-mono text-xs font-bold">ICD-10 CODE: {visit.icd_code}</p>
               </div>
               <div>
                  <h3 className="text-blue-200 font-black uppercase text-[10px] mb-4 tracking-widest">14. Treatment Plan</h3>
                  <div className="space-y-3 text-sm font-medium">
                    <p><span className="text-blue-300 font-black">LIFESTYLE:</span> {visit.plan_details.lifestyle}</p>
                    <p><span className="text-blue-300 font-black">EDUCATION:</span> {visit.plan_details.education}</p>
                    <p><span className="text-blue-300 font-black">REFERRALS:</span> {visit.plan_details.referrals}</p>
                  </div>
               </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD ---
export default function PatientDashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVisitIdx, setActiveVisitIdx] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/patients')
      .then(res => res.json())
      .then(setPatients)
      .catch(err => console.error("Fetch failed:", err));
  }, []);

  useEffect(() => {
    if (selectedId) {
      setLoading(true);
      fetch(`http://127.0.0.1:8000/api/emr/${selectedId}`)
        .then(res => res.json())
        .then(d => {
          console.log("EMR Payload:", d);
          setData(d);
          setLoading(false);
        })
        .catch(err => setLoading(false));
    }
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-6 rounded-[32px] shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl shadow-slate-200"><Heart size={24}/></div>
            <div>
               <h1 className="text-2xl font-black italic tracking-tighter">OmniCare AI</h1>
               <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Clinical Decision Support System</p>
            </div>
          </div>
          <div className="relative inline-block w-full md:w-96">
            <select 
              className="block appearance-none w-full bg-slate-50 border border-slate-200 px-5 py-4 pr-10 rounded-2xl shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer text-sm font-black italic"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">MASTER PATIENT INDEX (100 SEEDED)...</option>
              {patients.map((p: any) => (
                <option key={p.id} value={p.id}>{p.name} (MRN-{p.id})</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <ChevronDown size={20} />
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-40">
            <div className="w-12 h-12 border-[6px] border-blue-600 border-t-transparent rounded-full animate-spin mb-6 shadow-2xl shadow-blue-100"></div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] animate-pulse">Decrypting Clinical Vault...</p>
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            
            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <section className="bg-white rounded-[40px] p-8 border shadow-sm border-t-[12px] border-t-blue-600">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-5 bg-blue-50 text-blue-600 rounded-[28px] shadow-inner"><User size={36}/></div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">{data.profile.name}</h2>
                    <span className="text-[9px] font-black uppercase bg-slate-100 text-slate-400 px-2 py-0.5 rounded">Verified Profile</span>
                  </div>
                </div>
                <div className="space-y-4 text-[13px] font-bold">
                   <div className="flex justify-between border-b pb-2"><span className="text-slate-400 font-black text-[10px] uppercase">DOB</span><span>{data.profile.dob}</span></div>
                   <div className="flex justify-between border-b pb-2"><span className="text-slate-400 font-black text-[10px] uppercase">Gender</span><span>{data.profile.gender}</span></div>
                   <div className="flex justify-between border-b pb-2"><span className="text-slate-400 font-black text-[10px] uppercase">Blood</span><span className="text-red-600">{data.profile.blood_type}</span></div>
                   <div className="bg-orange-50/50 p-5 rounded-[28px] border border-orange-100 mt-6">
                      <p className="text-orange-800 font-black text-[9px] uppercase tracking-widest mb-2">Critical Alerts</p>
                      <p className="text-xs font-black text-orange-900 italic underline">Drug: {data.profile.allergies.drug?.join(', ')}</p>
                   </div>
                </div>
              </section>

              <section className="bg-white rounded-[40px] p-8 border shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2"><History size={16}/> Medical Log</h3>
                <div className="space-y-6">
                   <div>
                     <p className="text-xs font-black mb-2 uppercase text-slate-800">Chronic Registry</p>
                     <p className="text-xs text-slate-500 font-medium bg-slate-50 p-4 rounded-2xl border leading-relaxed">{data.profile.chronic_conditions}</p>
                   </div>
                   <div>
                     <p className="text-xs font-black mb-2 uppercase text-slate-800">Surgical History</p>
                     {data.profile.past_surgeries.map((s:any, i:number) => (
                       <div key={i} className="flex justify-between p-3 bg-slate-50 rounded-2xl border mb-2 text-xs font-bold"><span>{s.name}</span><span className="text-slate-400">{s.year}</span></div>
                     ))}
                   </div>
                </div>
              </section>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              <h2 className="text-2xl font-black flex items-center gap-3 px-2"><TrendingUp className="text-blue-600" /> Clinical Trends</h2>
              <ClinicalTrends history={data.history} />

              <h2 className="text-2xl font-black flex items-center gap-3 px-2 pt-4"><ClipboardList className="text-blue-600" /> Longitudinal Encounters</h2>
              <div className="space-y-8">
                {data.history.map((visit: any, i: number) => (
                  <div key={i} className="bg-white rounded-[40px] border overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-50 transition-all group">
                    <div className="bg-slate-900 px-8 py-6 flex justify-between items-center text-white">
                       <div className="flex items-center gap-4"><Calendar size={20} className="text-blue-400"/><span className="font-black italic">{visit.date}</span></div>
                       <button 
                         onClick={() => { setActiveVisitIdx(i); setIsModalOpen(true); }}
                         className="bg-blue-600 hover:bg-white hover:text-blue-600 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all"
                       >
                         View Complete EMR
                       </button>
                    </div>
                    <div className="p-8">
                       <h3 className="text-3xl font-black italic tracking-tighter mb-4 text-slate-800 group-hover:text-blue-600 transition-colors">Dx: {visit.diagnosis}</h3>
                       <div className="bg-blue-50/50 p-6 rounded-[30px] border border-blue-100 italic font-bold text-blue-900 text-lg">
                         "{visit.jargon_summary}"
                       </div>
                       {/* Brief Summary Footer */}
                       <div className="mt-6 flex gap-6 text-[10px] font-black uppercase text-slate-400">
                          <span>ICD-10: {visit.icd_code}</span>
                          <span>|</span>
                          <span>BP: {visit.vitals.bp}</span>
                          <span>|</span>
                          <span>SPO2: {visit.vitals.spo2}</span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[60px] p-40 border-2 border-dashed border-slate-200 text-center flex flex-col items-center">
            <ClipboardList className="text-slate-100 mb-8" size={100} />
            <h3 className="text-3xl font-black italic tracking-tighter text-slate-800 uppercase">Vault Offline</h3>
            <p className="text-slate-400 mt-4 max-w-sm font-bold text-xs uppercase tracking-widest">Select an MRN to initialize the decryption protocol.</p>
          </div>
        )}
      </div>

      <FullEMRModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={data} 
        visitIndex={activeVisitIdx} 
      />
    </div>
  );
}