import React, { useState } from "react";

const AssessmentHub = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    "Depression","Anxiety","Bipolar","PTSD","OCD","Eating","ADHD","ASD","Substance","Personality","Psychosis","Self-harm","General"
  ];

  const assessments = [
    { id: "phq9", title: "PHQ-9", category: "Depression", desc: "Patient Health Questionnaire-9" },
    { id: "bdi", title: "BDI", category: "Depression", desc: "Beck Depression Inventory" },
    { id: "gad7", title: "GAD-7", category: "Anxiety", desc: "Generalized Anxiety Disorder-7" },
    { id: "bai", title: "BAI", category: "Anxiety", desc: "Beck Anxiety Inventory" },
    { id: "hama", title: "HAM-A", category: "Anxiety", desc: "Hamilton Anxiety Rating Scale" },
    { id: "mdq", title: "MDQ", category: "Bipolar", desc: "Mood Disorder Questionnaire" },
    { id: "pcl5", title: "PCL-5", category: "PTSD", desc: "PTSD Checklist for DSM-5" },
    { id: "ybocs", title: "Y-BOCS", category: "OCD", desc: "Yale-Brown Obsessive Compulsive Scale" },
    { id: "oci-r", title: "OCI-R", category: "OCD", desc: "Obsessive Compulsive Inventory - Revised" },
    { id: "scoff", title: "SCOFF", category: "Eating", desc: "SCOFF Questionnaire" },
    { id: "eat26", title: "EAT-26", category: "Eating", desc: "Eating Attitudes Test" },
    { id: "asrs", title: "ASRS v1.1", category: "ADHD", desc: "Adult ADHD Self-Report Scale" },
    { id: "vanderbilt", title: "Vanderbilt", category: "ADHD", desc: "Vanderbilt Assessment Scales (children)" },
    { id: "aq", title: "AQ", category: "ASD", desc: "Autism Spectrum Quotient" },
    { id: "mchat", title: "M-CHAT", category: "ASD", desc: "Modified Checklist for Autism in Toddlers" },
    { id: "audit", title: "AUDIT", category: "Substance", desc: "Alcohol Use Disorders Identification Test" },
    { id: "dast", title: "DAST", category: "Substance", desc: "Drug Abuse Screening Test" },
    { id: "cage", title: "CAGE", category: "Substance", desc: "CAGE Questionnaire" },
    { id: "sapas", title: "SAPAS", category: "Personality", desc: "Standardized Assessment of Personality - Abbreviated Scale" },
    { id: "ipde", title: "IPDE", category: "Personality", desc: "International Personality Disorder Examination" },
    { id: "pqb", title: "PQ-B", category: "Psychosis", desc: "Prodromal Questionnaire - Brief" },
    { id: "sips", title: "SIPS", category: "Psychosis", desc: "Structured Interview for Prodromal Syndromes" },
    { id: "cssrs", title: "C-SSRS", category: "Self-harm", desc: "Columbia Suicide Severity Rating Scale" },
    { id: "siq", title: "SIQ", category: "Self-harm", desc: "Suicidal Ideation Questionnaire" },
    { id: "ghq", title: "GHQ", category: "General", desc: "General Health Questionnaire" },
    { id: "k10", title: "K10/K6", category: "General", desc: "Kessler Psychological Distress Scale" },
  ];

  const filtered = assessments.filter((a) => {
    if (selectedCategory && a.category !== selectedCategory) return false;
    if (!query) return true;
    return (a.title + " " + a.desc + " " + a.category).toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 flex">
      {/* Sidebar categories */}
      <aside className="w-56 bg-white border-r shadow-sm h-screen sticky top-0 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-3">Categories</h3>
          <div className="flex flex-col gap-2">
            <button onClick={() => setSelectedCategory(null)} className={`text-sm text-left px-3 py-2 rounded-md ${selectedCategory===null?'bg-indigo-50 font-medium':'hover:bg-gray-50'}`}>All</button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`text-sm text-left px-3 py-2 rounded-md ${selectedCategory===c?'bg-indigo-50 font-medium':'hover:bg-gray-50'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Assessments */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assessments</h2>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="border rounded-md px-3 py-2 w-64 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((a) => (
            <div key={a.id} className="bg-white p-4 rounded-xl shadow-sm border flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-lg">{a.title}</h3>
                <p className="text-sm text-slate-500">{a.desc}</p>
                <span className="text-xs px-2 py-1 mt-2 inline-block rounded-full bg-slate-100">{a.category}</span>
              </div>
              <button className="mt-4 bg-indigo-600 text-white text-sm px-3 py-2 rounded-md hover:bg-indigo-700">Start</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AssessmentHub;
