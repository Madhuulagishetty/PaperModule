'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePDF } from 'react-to-pdf';
import { Printer, Download } from 'lucide-react';

const FinalQuestionPaperPage = () => {
  const { toPDF, targetRef } = usePDF({
    filename: 'question-paper.pdf',
    method: 'save',
    resolution: 2,
    page: {
      margin: { top: 10, right: 10, bottom: 10, left: 10 }
    }
  });
  const router = useRouter();

  // State to store exam details and generated paper
  const [examDetails, setExamDetails] = useState({
   
  });
  const [questionPaper, setQuestionPaper] = useState(null);
  // console.log(StartTime,EndTime)
  // console.log(examDetails.)
  useEffect(() => {
    // Retrieve exam details from localStorage
    const storedExamDetails = localStorage.getItem('examDetails');
    const storedQuestionPaper = localStorage.getItem('generatedQuestionPaper');

    if (storedExamDetails) {
      const parsedDetails = JSON.parse(storedExamDetails);
      setExamDetails(prev => ({
        ...prev,
        ...parsedDetails
      }));
    }

    if (storedQuestionPaper) {
      setQuestionPaper(JSON.parse(storedQuestionPaper));
    } else {
      // Fallback questions if no questions are found
      setQuestionPaper([
        {
          id: 1,
          text: 'Let A = {2,4,6,8,10,12} and B = {6,8,10}. Find the value of A∩B and show that A∩B = B.',
          options: null
        },
        // Add more fallback questions as needed
      ]);
    }
  }, []);
 
    console.log(examDetails.SchoolName)

  // Advanced print and PDF handlers
  const handlePrint = () => {
    const printContents = document.getElementById('print-section').innerHTML;
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContents;
    window.print();
    
    // Restore the original page
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleDownloadPDF = () => {
    // Optional: Add loading state or toast notification
    toPDF();
  };

  // If no exam details or question paper, show a message
  if (!questionPaper) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">No Exam Details Found</h2>
          <p className="mb-4">Please go back and complete the exam configuration.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 py-4 max-w-3xl">
      <div 
        id="print-section"
        ref={targetRef} 
        className="border-2 border-gray-300 p-4 text-black"
      >
        {/* School Header */}
        <div className="text-center mb-3">
          <h1 className="text-xl font-bold uppercase tracking-wider">
            {examDetails.schoolName}
          </h1>
          <h2 className="text-base font-semibold mt-1">UNIT TEST - 1</h2>
        </div>

        {/* Exam Details Header */}
        <div className="flex justify-between text-xs mb-2">
          <div>
            <strong>SUBJECT :- </strong> {examDetails.subject}
          </div>
          <div>
            <strong>CLASS :- </strong> {examDetails.grade}
          </div>
        </div>

        {/* Date and Time Details */}
        <div className="flex justify-between text-xs mb-2">
          <div>
            <strong>DATE :- </strong> {examDetails.date}
          </div>
          
          
          <div>
             <strong>Time:- </strong>{examDetails.startTime} To {examDetails.endTime}
         </div>
         
          
         
        </div>

        {/* General Instructions */}
        <div className="mb-2 text-xs">
          <strong>General Instructions : </strong>All questions are compulsory.
          
        </div>
        <div className='border mt-2 mb-2'></div>
        {/* Questions */}
        {questionPaper.map((question, index) => (
          <div key={question.id} className="mb-2">
            <p className="text-xs font-medium">
              Q{index + 1}. {question.text} 
              <span className="float-right">[1 Mark]</span>
            </p>
            {question.options && (
              <div className="ml-4 mt-1 space-y-1">
                {question.options.map((option, optIndex) => (
                  <div 
                    key={optIndex} 
                    className="text-xs"
                  >
                    <span className="mr-2">
                      {String.fromCharCode(97 + optIndex)})
                    </span>
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Answer Space */}
        <div className="mt-4">
          <p className="text-center font-semibold text-xs">*** END OF THE QUESTION PAPER ***</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-6 print:hidden">
      <button 
        onClick={handlePrint}
        className="group relative flex items-center justify-center 
        px-6 py-2.5 text-sm font-medium 
        text-white bg-blue-600 rounded-lg 
        shadow-md hover:shadow-lg 
        transition-all duration-300 ease-in-out 
        transform hover:-translate-y-0.5 
        focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:ring-offset-2"
      >
        <Printer className="mr-2 w-5 h-5 transition-transform group-hover:rotate-12" />
        Print Question Paper
        <span className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></span>
      </button>
      
      <button 
        onClick={handleDownloadPDF}
        className="group relative flex items-center justify-center 
        px-6 py-2.5 text-sm font-medium 
        text-white bg-green-600 rounded-lg 
        shadow-md hover:shadow-lg 
        transition-all duration-300 ease-in-out 
        transform hover:-translate-y-0.5 
        focus:outline-none focus:ring-2 
        focus:ring-green-500 focus:ring-offset-2"
      >
        <Download className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
        Download PDF
        <span className="absolute inset-0 bg-green-700 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity"></span>
      </button>
    </div>
    </div>
  );
};

export default FinalQuestionPaperPage;