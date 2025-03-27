'use client'
import React, { useState,useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const generateQuestions = () => {
  const fillInTheBlankQuestions = [
    { id: 1, text: 'The sum of angles in a triangle is always _____.' },
    { id: 2, text: 'The formula for the area of a circle is π * _____.' },
    { id: 3, text: 'The number of sides in a hexagon is _____.' },
    { id: 4, text: 'The value of π is approximately _____.' },
    { id: 5, text: 'A square has _____ equal sides.' },
    { id: 6, text: 'The sum of interior angles in a quadrilateral is _____ degrees.' },
    { id: 7, text: 'The Pythagorean theorem relates the sides of a right-angled triangle with the equation a² + b² = _____.' },
    { id: 8, text: 'The circumference of a circle is calculated as 2π * _____.' },
    { id: 9, text: 'A regular pentagon has _____ equal sides.' },
    { id: 10, text: 'The value of the golden ratio is approximately _____.' }
  ];

  const multipleChoiceQuestions = [
    {
      id: 11,
      text: 'What is the fundamental theorem of algebra?',
      options: [
        'Every non-zero complex number has a multiplicative inverse',
        'Every non-constant polynomial has at least one complex root',
        'The sum of interior angles of a triangle is 180 degrees'
      ]
    },
    {
      id: 12,
      text: 'What is a prime number?',
      options: [
        'A number divisible by 2',
        'A number greater than 10',
        'A number only divisible by 1 and itself'
      ]
    },
    {
      id: 13,
      text: 'What is the Fibonacci sequence?',
      options: [
        'A sequence where each number is the sum of the two preceding ones',
        'A sequence of prime numbers',
        'A sequence of exponential growth'
      ]
    },
    {
      id: 14,
      text: 'What is a rational number?',
      options: [
        'A number that can be expressed as a fraction of two integers',
        'A number greater than zero',
        'A number with decimal places'
      ]
    },
    {
      id: 15,
      text: 'What is the quadratic formula used for?',
      options: [
        'Finding the roots of a quadratic equation',
        'Calculating the area of a circle',
        'Determining the slope of a line'
      ]
    },
    {
      id: 16,
      text: 'What is the Pythagorean theorem?',
      options: [
        'A theorem about similar triangles',
        'A relationship between the sides of a right-angled triangle',
        'A method for calculating circumference'
      ]
    },
    {
      id: 17,
      text: 'What is a geometric progression?',
      options: [
        'A sequence where each term is multiplied by a constant',
        'A sequence of increasing geometric shapes',
        'A method of measuring angles'
      ]
    },
    {
      id: 18,
      text: 'What is the difference between median and mean?',
      options: [
        'Median is the middle value, mean is the average',
        'Median is the largest value, mean is the smallest',
        'They are the same mathematical concept'
      ]
    },
    {
      id: 19,
      text: 'What is an irrational number?',
      options: [
        'A number that cannot be expressed as a simple fraction',
        'A number that is always positive',
        'A number divisible by itself'
      ]
    },
    {
      id: 20,
      text: 'What is the definition of a derivative?',
      options: [
        'The rate of change of a function at a specific point',
        'A method of multiplying numbers',
        'A way to calculate area'
      ]
    }
  ];

  return { fillInTheBlankQuestions, multipleChoiceQuestions };
};

const QuestionPaperPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subject = searchParams.get('subject');

  const { fillInTheBlankQuestions, multipleChoiceQuestions } = generateQuestions();
  const [selectedFillInBlank, setSelectedFillInBlank] = useState([]);
  const [selectedMultipleChoice, setSelectedMultipleChoice] = useState([]);
  const [generatedPaper, setGeneratedPaper] = useState(null);
  const [toast, setToast] = useState(null);

  // Retrieve exam details from localStorage
  const [examDetails, setExamDetails] = useState(null);

  useEffect(() => {
    const storedExamDetails = localStorage.getItem('examDetails');
    if (storedExamDetails) {
      setExamDetails(JSON.parse(storedExamDetails));
    }
  }, []);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleFillInBlank = (id) => {
    setSelectedFillInBlank(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      }
      
      if (prev.length >= 5) {
        showToast('You can only select 5 Fill in the Blank questions');
        return prev;
      }
      
      return [...prev, id];
    });
  };

  const toggleMultipleChoice = (id) => {
    setSelectedMultipleChoice(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      }
      
      if (prev.length >= 5) {
        showToast('You can only select 5 Multiple Choice questions');
        return prev;
      }
      
      return [...prev, id];
    });
  };

  const generateQuestionPaper = () => {
    // Validate selections exactly 5 questions
    if (selectedFillInBlank.length !== 5 || selectedMultipleChoice.length !== 5) {
      showToast('Please select exactly 5 questions from each section');
      return;
    }

    // Select questions
    const selectedFillInBlankQuestions = fillInTheBlankQuestions
      .filter(q => selectedFillInBlank.includes(q.id));

    const selectedMultipleChoiceQuestions = multipleChoiceQuestions
      .filter(q => selectedMultipleChoice.includes(q.id));

    const finalQuestionPaper = [...selectedFillInBlankQuestions, ...selectedMultipleChoiceQuestions];
    
    // Store generated paper in localStorage
    localStorage.setItem('generatedQuestionPaper', JSON.stringify(finalQuestionPaper));
    
    // Navigate to Final Question Paper Page
    router.push('/FinalQuestionPaperPage');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded shadow-lg ${
          toast.type === 'error' 
            ? 'bg-red-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          {toast.message}
        </div>
      )}
      
      <h1 className="text-2xl font-bold mb-4 text-center">Mathematics Question Paper Generator</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Fill in the Blanks (Select 5)</h2>
        {fillInTheBlankQuestions.map((question) => (
          <div key={question.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`fillblank-${question.id}`}
              checked={selectedFillInBlank.includes(question.id)}
              onChange={() => toggleFillInBlank(question.id)}
              className="mr-2"
            />
            <label htmlFor={`fillblank-${question.id}`} className="flex-grow">
              {question.text}
            </label>
          </div>
        ))}
        <p className="text-sm text-gray-600 mt-2">
          Selected: {selectedFillInBlank.length}/5
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Multiple Choice Questions (Select 5)</h2>
        {multipleChoiceQuestions.map((question) => (
          <div key={question.id} className="mb-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`multiple-${question.id}`}
                checked={selectedMultipleChoice.includes(question.id)}
                onChange={() => toggleMultipleChoice(question.id)}
                className="mr-2"
              />
              <label htmlFor={`multiple-${question.id}`} className="font-medium">
                {question.text}
              </label>
            </div>
          </div>
        ))}
        <p className="text-sm text-gray-600 mt-2">
          Selected: {selectedMultipleChoice.length}/5
        </p>
      </div>

      <div className="text-center">
        <button 
          onClick={generateQuestionPaper}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Generate Question Paper
        </button>
      </div>

      {generatedPaper && (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Question Paper</h2>
          {generatedPaper.map((question, index) => (
            <div key={question.id} className="mb-4">
              <p className="font-medium">{index + 1}. {question.text}</p>
              {question.options && (
                <div className="ml-4 mt-1">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="text-sm text-gray-600">
                      • {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionPaperPage;