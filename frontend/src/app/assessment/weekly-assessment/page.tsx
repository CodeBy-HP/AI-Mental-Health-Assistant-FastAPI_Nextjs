"use client";

import { useState } from "react";
import { submitWeeklyAssessment, WeeklyAssessmentResponse } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Send, Award, ArrowRight } from "lucide-react";

export default function WeeklyAssessment() {
  const { user, token } = useAuth();
  const [answers, setAnswers] = useState({
    coping_strategies: 50,
    appetite: 50,
    relationships: 50,
    energy: 50,
    sleep: 50,
    mood_description: "",
  });

  const [report, setReport] = useState<WeeklyAssessmentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const questions = [
    {
      key: "coping_strategies",
      label: "How effectively are you coping with daily stress and challenges?",
      lowLabel: "Struggling to cope",
      highLabel: "Managing very well"
    },
    {
      key: "appetite",
      label: "How would you rate your appetite over the past week?",
      lowLabel: "Poor appetite",
      highLabel: "Excellent appetite"
    },
    {
      key: "relationships",
      label: "How supported do you feel by your family and friends?",
      lowLabel: "Not supported",
      highLabel: "Very supported"
    },
    {
      key: "energy",
      label: "How would you rate your overall energy levels during the week?",
      lowLabel: "Very low energy",
      highLabel: "Very high energy"
    },
    {
      key: "sleep",
      label: "How would you rate the quality of your sleep over the past week?",
      lowLabel: "Poor sleep quality",
      highLabel: "Excellent sleep quality"
    },
    {
      key: "mood_description",
      label: "In your own words, please describe how you have been feeling emotionally this week:",
      isTextArea: true
    }
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const value = key === "mood_description" ? e.target.value : Number(e.target.value);
    setAnswers({ ...answers, [key]: value });
  };

  const handleSubmit = async () => {
    if (!user || !token) {
      alert("You need to log in first!");
      return;
    }

    setLoading(true);
    try {
      const response = await submitWeeklyAssessment(user.username, token, answers);
      setReport(response);
      setCurrentStep(questions.length);
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
    setLoading(false);
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  function getScoreColor(score: number) {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  }

  function getScoreBackground(score: number) {
    if (score >= 80) return "bg-emerald-50 border-emerald-100";
    if (score >= 60) return "bg-amber-50 border-amber-100";
    return "bg-rose-50 border-rose-100";
  }

  // if (!user) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen bg-white">
  //       <div className="flex flex-col items-center">
  //         <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  //         <p className="mt-4 text-indigo-600 font-medium">Authenticating...</p>
  //       </div>
  //     </div>
  //   );
  // }


  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-white to-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute top-0 w-full h-full rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-transparent border-r-transparent border-b-blue-300 border-l-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="mt-4 text-gray-500 font-medium">Connecting...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;
  const progress = ((currentStep) / (questions.length)) * 100;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Weekly Mental Health Assessment</h1>
          <p className="text-gray-500 mt-2">Track your wellbeing and get personalized insights</p>
        </div>

        {report ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className={`flex items-center justify-center w-24 h-24 rounded-full ${getScoreBackground(report.overall_score)}`}>
                  <span className={`text-3xl font-bold ${getScoreColor(report.overall_score)}`}>
                    {report.overall_score}
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-center mb-6">Your Assessment Results</h2>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{
                      width: `${report.overall_score}%`,
                      backgroundColor: report.overall_score >= 80 ? '#10B981' : report.overall_score >= 60 ? '#F59E0B' : '#EF4444'
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <Sparkles size={18} className="text-indigo-500" />
                  Improvement Suggestion
                </h3>
                <p className="text-gray-700">{report.improvement_suggestion}</p>
              </div>

              <div className="text-sm text-gray-500 text-center">
                Submitted on {new Date(report.created_at).toLocaleString()}
              </div>

              <div className="mt-8 flex justify-center">
                <button 
                  onClick={() => setReport(null)} 
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 mr-3"
                >
                  Start New Assessment
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                  <Award size={18} className="mr-2" />
                  View History
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="h-2 bg-gray-100 w-full">
              <div
                className="h-full bg-indigo-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.label}</h2>

              {currentQuestion.isTextArea ? (
                <div className="mb-6">
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-40 resize-none"
                    value={answers.mood_description}
                    onChange={(e) => handleChange(e, "mood_description")}
                    placeholder="Describe your emotional state..."
                  />
                </div>
              ) : (
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{currentQuestion.lowLabel}</span>
                    <span>{currentQuestion.highLabel}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={answers[currentQuestion.key as keyof typeof answers]}
                    onChange={(e) => handleChange(e, currentQuestion.key)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-center mt-4">
                    <div className="bg-indigo-100 text-indigo-800 rounded-full px-4 py-1 font-medium text-lg">
                      {answers[currentQuestion.key as keyof typeof answers]}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-4 py-2 border border-gray-300 rounded-md ${
                    currentStep === 0 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                  disabled={currentStep === 0}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    "Processing..."
                  ) : isLastQuestion ? (
                    <>
                      <Send size={18} className="mr-2" />
                      Submit Assessment
                    </>
                  ) : (
                    <>
                      Next Question
                      <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}