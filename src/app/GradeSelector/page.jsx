'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";


const GradeSelector = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [unit, setUnit] = useState('');

  const grades = [
    { number: 1, title: "1st Standard", subjects: ["English", "Mathematics", "Environmental Science", "Hindi"] },
    { number: 2, title: "2nd Standard", subjects: ["English", "Mathematics", "Environmental Science", "Hindi", "Computer"] },
    { number: 3, title: "3rd Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer"] },
    { number: 4, title: "4th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer"] },
    { number: 5, title: "5th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer"] },
    { number: 6, title: "6th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] },
    { number: 7, title: "7th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] },
    { number: 8, title: "8th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] },
    { number: 9, title: "9th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] },
    { number: 10, title: "10th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] }
  ];
  const router = useRouter();
  const handleProceed = () => {
    if (!selectedGrade) {
      toast.error("Please select a standard!");
      return;
    }
    if (!date) {
      toast.error("Please select a date!");
      return;
    }
    if (!time) {
      toast.error("Please select a time!");
      return;
    }
    if (!unit) {
      toast.error("Please select a unit!");
      return;
    }

    toast.success("Proceeding to the next step...");
    console.log("Proceeding with:", { selectedGrade, date, time, unit });

    router.push("/QuestionPaper");
    // Add navigation logic here if needed
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">
        Please Select Input Details
      </h1>

      {/* Grade Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 max-w-4xl mx-auto">
        {grades.map((grade) => (
          <button
            key={grade.number}
            onClick={() => setSelectedGrade(grade)}
            className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 transform 
              ${selectedGrade?.number === grade.number ? 'bg-indigo-600 text-white scale-105 shadow-md' : 'bg-white text-gray-800 hover:bg-indigo-100'}`}
          >
            {grade.title}
          </button>
        ))}
      </div>

      {/* Selected Grade Details */}
      {selectedGrade && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">
              {selectedGrade.title}
            </h2>

            {/* Subjects List */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedGrade.subjects.map((subject, index) => (
                <div key={index} className="bg-indigo-50 p-3 rounded-lg text-indigo-800 font-medium shadow-sm">
                  {subject}
                </div>
              ))}
            </div>

            {/* Date, Time, and Dropdown */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date Input */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2">Select Date:</label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </div>

              {/* Time Input */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2">Select Time:</label>
                <input 
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </div>

              {/* Dropdown Selector */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2">Select Unit:</label>
                <select 
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                >
                  <option value="">Choose Unit</option>
                  <option value="1st Unit">1st Unit</option>
                  <option value="2nd Unit">2nd Unit</option>
                  <option value="3rd Unit">3rd Unit</option>
                </select>
              </div>
            </div>

            {/* Proceed Button */}
            <div className="mt-6 text-center">
              <button 
                onClick={handleProceed}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Proceed to Next Step
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default GradeSelector;
