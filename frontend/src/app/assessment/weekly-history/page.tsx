"use client";

import { useEffect, useState } from "react";
import { fetchWeeklyHistory, WeeklyAssessmentResponse } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { AreaChart, BarChart } from "lucide-react";

export default function WeeklyHistory() {
  const { user, token } = useAuth();
  const [history, setHistory] = useState<WeeklyAssessmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"cards" | "timeline">("cards");

  useEffect(() => {
    async function fetchHistory() {
      if (!user || !token) {
        // Wait for user authentication
        setLoading(true);
        return;
      }

      try {
        const response = await fetchWeeklyHistory(user.username, token);
        setHistory(response);
      } catch (error) {
        console.warn("Could not fetch history data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [user, token]);

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

  function getScoreColor(score: number) {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  }

  function getScoreBg(score: number) {
    if (score >= 80) return "bg-emerald-50 border-emerald-100";
    if (score >= 60) return "bg-amber-50 border-amber-100";
    return "bg-rose-50 border-rose-100";
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Your Assessment History</h1>
          <p className="text-gray-500 mt-2">Track your progress over time</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-700">
            {history.length} {history.length === 1 ? "Assessment" : "Assessments"} Available
          </p>
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-md">
            <button
              onClick={() => setView("cards")}
              className={`p-2 rounded-md flex items-center ${
                view === "cards" ? "bg-white shadow-sm" : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              <BarChart size={18} className="mr-1" />
              <span className="text-sm font-medium">Cards</span>
            </button>
            <button
              onClick={() => setView("timeline")}
              className={`p-2 rounded-md flex items-center ${
                view === "timeline" ? "bg-white shadow-sm" : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              <AreaChart size={18} className="mr-1" />
              <span className="text-sm font-medium">Timeline</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <AreaChart size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Assessment History</h3>
            <p className="text-gray-500 mb-4">
              You haven't completed any weekly assessments yet. Complete your first assessment to see your results here.
            </p>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors">
              Start Assessment
            </button>
          </div>
        ) : view === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {history.map((report, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Assessment #{history.length - index}</h3>
                      <p className="text-gray-500 text-sm">{formatDate(report.created_at)}</p>
                    </div>
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getScoreBg(report.overall_score)}`}>
                      <span className={`text-lg font-bold ${getScoreColor(report.overall_score)}`}>
                        {report.overall_score}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${report.overall_score}%`,
                          backgroundColor: report.overall_score >= 80 ? "#10B981" : report.overall_score >= 60 ? "#F59E0B" : "#EF4444",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Improvement Suggestions:</h4>
                    <p className="text-gray-600 text-sm">{report.improvement_suggestion}</p>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3 text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Updated timeline view with adjusted height scaling and container background
          <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Score Timeline</h3>
              <div className="h-64 flex items-end space-x-2">
                {history.map((report, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full rounded-t-sm transition-all duration-500"
                      style={{
                        // Scale height: convert score (0-100) to a pixel value relative to container height (e.g., 256px)
                        height: `${(report.overall_score / 100) * 256}px`,
                        backgroundColor:
                          report.overall_score >= 80 ? "#10B981" : report.overall_score >= 60 ? "#F59E0B" : "#EF4444",
                      }}
                    ></div>
                    <div className="text-xs font-medium text-gray-600 mt-2">{report.overall_score}</div>
                    <div className="text-xs text-gray-400 mt-1">{formatDate(report.created_at).split(",")[0]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
