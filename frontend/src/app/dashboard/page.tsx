'use client';

import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Team", href: "/team", current: false },
  { name: "Projects", href: "/projects", current: false },
  { name: "Calendar", href: "/calendar", current: false },
  { name: "Reports", href: "/reports", current: false },
];

export default function DashboardTemplate() {
  const { user, token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Navigation */}
      <Disclosure
        as="nav"
        className="bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-lg"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo and Navigation Links */}
                <div className="flex items-center">
                  <div className="shrink-0">
                    <div className="h-8 w-8 rounded-md bg-gradient-to-r from-blue-400 to-indigo-700 flex items-center justify-center text-white font-bold mr-3">
                      AI
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            item.current
                              ? "bg-indigo-500 text-white shadow-sm"
                              : "text-indigo-100 hover:bg-indigo-500/80 hover:text-white hover:shadow-md",
                            "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notifications and Profile Menu */}
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6 space-x-4">
                    <button
                      type="button"
                      className="relative rounded-full bg-indigo-500/20 p-2 text-indigo-100 hover:text-white hover:bg-indigo-500/30 transition-all duration-200 hover:animate-pulse"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white p-1 ring-2 ring-indigo-600 text-sm focus:outline-none transition-all duration-200 hover:bg-indigo-100">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={
                              user.image ||
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            }
                            alt={`${user.username}'s avatar`}
                          />
                        </Menu.Button>
                      </div>
                      <Menu.Items className="absolute z-50 right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={classNames(
                                active ? "bg-indigo-50" : "",
                                "flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                              )}
                            >
                              <UserIcon className="w-5 h-5 mr-2 text-indigo-600" />
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/settings"
                              className={classNames(
                                active ? "bg-indigo-50" : "",
                                "flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                              )}
                            >
                              <CogIcon className="w-5 h-5 mr-2 text-indigo-600" />
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={classNames(
                                active ? "bg-white" : "",
                                "flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-150"
                              )}
                            >
                              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2 text-indigo-600" />
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-200">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-indigo-500 text-white shadow-sm"
                        : "text-white hover:bg-indigo-500/80 hover:text-white",
                      "block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-indigo-500/30 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.username}
                    </div>
                    <div className="text-sm font-medium text-indigo-200">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto rounded-full bg-indigo-500/20 p-2 text-indigo-200 hover:text-white hover:bg-indigo-500/30 transition-colors duration-200"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as={Link}
                    href="/profile"
                    className="flex items-center rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-indigo-500/80 hover:text-white transition-colors duration-200"
                  >
                    <UserIcon className="w-5 h-5 mr-2" />
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    href="/settings"
                    className="flex items-center rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-indigo-500/80 hover:text-white transition-colors duration-200"
                  >
                    <CogIcon className="w-5 h-5 mr-2" />
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={logout}
                    className="flex items-center w-full rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-indigo-500/80 hover:text-white transition-colors duration-200"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center space-x-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Welcome back, {user.username}! 👋
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Weekly Mood Assessment */}
            <Link
              href="/assessment/weekly-assessment"
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 block"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Weekly Mood Assessment
                </h3>
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <ChartBarIcon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                Take a quick assessment each week to track your mood and receive personalized tips.
              </p>
            </Link>

            {/* Assessment History */}
            <Link
              href="/assessment/weekly-history"
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 block"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Assessment History
                </h3>
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <ClockIcon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                Review your past assessments and monitor your progress over time.
              </p>
            </Link>

            {/* AI Chatbot */}
            <Link
              href="/chat"
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 block"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  AI Chatbot
                </h3>
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                Chat with our AI mental health therapist for on-demand support and guidance.
              </p>
            </Link>

            {/* Resources */}
            <Link
              href="/resources"
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 block"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Resources
                </h3>
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BookOpenIcon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                Access helpful articles, guides, and tools to support your mental wellness journey.
              </p>
            </Link>

            {/* Personalized Insights */}
            <Link
              href="/assessment/insights"
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 block"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Personalized Insights
                </h3>
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <DocumentTextIcon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                Review trends and data-driven insights from your assessments to better understand your progress.
              </p>
            </Link>

            {/* Mindfulness Exercises */}
            <Link
              href="/exercises"
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 block"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Mindfulness Exercises
                </h3>
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <CogIcon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                Explore guided exercises and meditations designed to reduce stress and boost mindfulness.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
