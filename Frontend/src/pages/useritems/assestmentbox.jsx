import React, { useState } from "react";

import PHQ9Assessment from "../../components/assestments/ph9-Q";
import GAD7Form from "../../components/assestments/GAD7";
import GHQForm from "../../components/assestments/GhQ";
import Modal from "../../components/Modal";

const AssessmentBox = () => {
  const [openAssessment, setOpenAssessment] = useState(null);

  return (
    <div className="flex justify-center items-center p-6 bg-[#FFFCEF]">
      {/* Box with 3 assessment buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Choose an Assessment
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Select an assessment to check your mental wellness.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => setOpenAssessment("phq9")}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
          >
            PHQ-9 (Depression)
          </button>

          <button
            onClick={() => setOpenAssessment("gad7")}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
          >
            GAD-7 (Anxiety)
          </button>

          <button
            onClick={() => setOpenAssessment("ghq")}
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
          >
            GHQ (General Health)
          </button>
        </div>
      </div>
      
      <Modal
        isOpen={!!openAssessment}
        onClose={() => setOpenAssessment(null)}
        title={
          openAssessment === "phq9"
            ? "PHQ-9 Assessment"
            : openAssessment === "gad7"
            ? "GAD-7 Assessment"
            : openAssessment === "ghq"
            ? "GHQ Assessment"
            : ""
        }
      >
        <div className="p-6 rounded-xl bg-[#FFFCEF] max-w-2xl mx-auto overflow-y-auto" style={{ maxHeight: "80vh" }}>
          {openAssessment === "phq9" && <PHQ9Assessment />}
          {openAssessment === "gad7" && <GAD7Form />}
          {openAssessment === "ghq" && <GHQForm />}
        </div>
      </Modal>
    </div>
  );
};

export default AssessmentBox;
