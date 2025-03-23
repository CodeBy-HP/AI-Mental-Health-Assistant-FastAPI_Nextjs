'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Mail,
  Calendar,
  MapPin,
  Award,
  LogOut,
  Shield,
  Settings,
} from "lucide-react";

const Profile = () => {
  const { user, logout, token } = useAuth();
  const router = useRouter();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push("/auth/login"); // Redirect to login if not authenticated
    }
  }, [token, router]);

  // Updated stats for mental health profile
  const stats = {
    joined: "March 2024",
    location: "San Francisco, CA",
    achievements: ["Mindful Achiever", "Resilient", "Wellness Warrior"],
    points: 1250,
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-white to-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute top-0 w-full h-full rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div
              className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-transparent border-r-transparent border-b-blue-300 border-l-transparent animate-spin"
              style={{ animationDirection: "reverse" }}
            ></div>
          </div>
          <p className="mt-4 text-gray-500 font-medium">Connecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6">
      {/* Header */}
      <header className="w-full bg-white shadow-md py-4 mb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">My Mental Health Profile</h1>
          <button
            onClick={() => router.push('/settings')}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
          >
            <Settings size={20} className="text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-4xl px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 relative">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('/pattern.svg')" }}></div>
            </div>

            <div className="px-6 py-8 relative">
              {/* Avatar */}
              <div className="absolute -top-16 left-6 ring-4 ring-gray-300 rounded-full p-1 bg-white">
                <img
                  className="h-24 w-24 rounded-full object-cover"
                  src={user.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                  alt={`${user.username}'s avatar`}
                />
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-900">{user.username}</h2>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <Mail size={16} />
                  <p>{user.email}</p>
                </div>

                {/* User Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-gray-500 text-sm">Member Since</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={16} className="text-blue-500" />
                      <p className="text-gray-800 font-medium">{stats.joined}</p>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-gray-500 text-sm">Location</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={16} className="text-red-400" />
                      <p className="text-gray-800 font-medium">{stats.location}</p>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mt-6">
                  <button
                    onClick={() => setShowStats(!showStats)}
                    className="w-full flex items-center justify-between bg-gray-200 hover:bg-gray-300 rounded-lg p-3 transition-all text-gray-800"
                  >
                    <span className="font-medium flex items-center gap-2">
                      <Award size={18} className="text-yellow-500" />
                      Achievements
                    </span>
                    <ChevronDown size={18} className={`transition-transform ${showStats ? 'rotate-180' : ''}`} />
                  </button>

                  {showStats && (
                    <div className="mt-3 bg-gray-50 rounded-lg p-4 border border-gray-200 animate-fadeIn">
                      <div className="flex flex-wrap gap-2">
                        {stats.achievements.map((achievement, i) => (
                          <div key={i} className="bg-gray-200 py-1 px-3 rounded-full text-gray-700 text-sm flex items-center gap-1">
                            <Shield size={12} className="text-gray-500" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Therapy Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Therapy Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="border-b border-gray-200 pb-3 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">
                          {i === 0
                            ? "Updated therapy session details"
                            : i === 1
                            ? "Completed weekly mood assessment"
                            : "Joined our mental wellness community"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {i === 0 ? "1 day ago" : i === 1 ? "3 days ago" : "1 week ago"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Health Apps */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Connected Health Apps</h3>
              <div className="space-y-3">
                {["HealthSync", "CalmApp", "MoodTracker"].map((platform, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer">
                    <span className="text-gray-800">{platform}</span>
                    <span className={`text-sm px-2 py-1 rounded ${i === 0 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}>
                      {i === 0 ? "Connected" : "Connect"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
