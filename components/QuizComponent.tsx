// @ts-nocheck here to disable TypeScript checking for this file

"use client";
import React, { useState } from "react";

export const QuizComponent = ({ quizData }) => {
  // State to manage the visibility of answers for each question
  const [showAnswers, setShowAnswers] = useState({});

  const toggleAnswer = (questionId: string) => {
    setShowAnswers((prevShowAnswers) => ({
      ...prevShowAnswers,
      [questionId]: !prevShowAnswers[questionId] as boolean,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 max-w-2xl w-full">
        {/* Quiz Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
          {quizData.quizTitle}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-2 text-center">
          Created by: <span className="font-semibold">{quizData.yourName}</span>
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
            Category: {quizData.category}
          </span>
          <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
            Difficulty: {quizData.difficultyFactType}
          </span>
        </div>

        {/* Questions Section */}
        <div className="space-y-6">
          {quizData.questionsFacts.map((questionFact) => (
            <div
              key={questionFact.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Q: {questionFact.question}
              </h3>
              {questionFact.answer && (
                <div>
                  <button
                    onClick={() => toggleAnswer(questionFact.id)}
                    className="mt-2 px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                  >
                    {showAnswers[questionFact.id]
                      ? "Hide Answer"
                      : "Show Answer"}
                  </button>
                  {showAnswers[questionFact.id] && (
                    <p className="mt-3 text-base text-gray-700 bg-indigo-50 p-3 rounded-md border border-indigo-200 animate-fade-in">
                      A: {questionFact.answer}
                    </p>
                  )}
                </div>
              )}
              {!questionFact.answer && (
                <p className="mt-2 text-sm text-gray-500 italic">
                  (No answer provided for this question)
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Additional Notes */}
        {quizData.additionalNotes && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Additional Notes:
            </h3>
            <p className="text-sm sm:text-base text-gray-600 italic">
              {quizData.additionalNotes}
            </p>
          </div>
        )}

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-400 text-center">
          Created At: {new Date(quizData.createdAt).toLocaleDateString()} | Last
          Updated: {new Date(quizData.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
