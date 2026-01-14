"use client";
import React, { useState } from "react";
import {
  Heart,
  Brain,
  Zap,
  Users,
  Moon,
  Sun,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleSubmit = () => {
    if (email && email.includes("@")) {
      console.log("Email submitted:", email);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  const bgClass = darkMode ? "bg-gray-900" : "bg-gray-50";
  const textClass = darkMode ? "text-white" : "text-gray-900";
  const subtextClass = darkMode ? "text-gray-300" : "text-gray-600";
  const cardClass = darkMode ? "bg-gray-800" : "bg-white";

  return (
    <div
      className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-opacity-80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">OinUsideT</span>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 bg-opacity-20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">
              Coming Soon
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Transform From
            <br />
            Inside Out
          </h1>

          <p
            className={`text-xl md:text-2xl ${subtextClass} mb-12 max-w-3xl mx-auto`}
          >
            A holistic health and wellness ecosystem designed to improve the
            quality of your life—from within.
          </p>

          {/* Email Capture */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Enter your email"
                className={`flex-1 px-6 py-4 rounded-xl ${cardClass} border-2 ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } focus:border-emerald-400 focus:outline-none transition-colors`}
              />
              <button
                onClick={handleSubmit}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                Join <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {submitted && (
              <p className="mt-3 text-emerald-400 flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                You're on the list!
              </p>
            )}
          </div>

          <p className={`text-sm ${subtextClass}`}>
            Join the waitlist and be the first to experience wellness
            reimagined.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Your Complete Wellness Ecosystem
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="AI-Powered Guidance"
              description="Personalized wellness plans that adapt to your unique journey and goals."
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Holistic Tracking"
              description="Monitor sleep, nutrition, fitness, and mental wellness all in one place."
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Actionable Insights"
              description="Data-driven recommendations that help you make lasting, positive changes."
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Community Support"
              description="Connect with others on their wellness journey, share wins, and stay motivated."
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8" />}
              title="Habit Formation"
              description="Build sustainable routines with gamification, streaks, and achievement tracking."
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Evidence-Based"
              description="Every recommendation backed by scientific research and expert guidance."
              darkMode={darkMode}
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className={`text-xl ${subtextClass} leading-relaxed`}>
            At OinUsideT, we believe true wellness starts from within. We're
            building a comprehensive platform that doesn't just track metrics—it
            understands you, guides you, and grows with you. From personalized
            health plans to AI-powered coaching, we're creating tools that make
            lasting wellness accessible to everyone.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div
          className={`max-w-4xl mx-auto ${cardClass} rounded-3xl p-12 text-center shadow-2xl`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform?
          </h2>
          <p className={`text-lg ${subtextClass} mb-8`}>
            Be among the first to access the future of wellness.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Your email address"
                className={`flex-1 px-6 py-4 rounded-xl ${
                  darkMode ? "bg-gray-900" : "bg-gray-100"
                } border-2 ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } focus:border-emerald-400 focus:outline-none transition-colors`}
              />
              <button
                onClick={handleSubmit}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">OinUsideT</span>
          </div>
          <p className={`${subtextClass} mb-4`}>
            Improving quality of life, from the inside out.
          </p>
          <p className={`text-sm ${subtextClass}`}>
            © 2026 OinUsideT. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, darkMode }) {
  const cardClass = darkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";
  const subtextClass = darkMode ? "text-gray-300" : "text-gray-600";

  return (
    <div
      className={`${cardClass} border-2 rounded-2xl p-8 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:scale-105`}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className={subtextClass}>{description}</p>
    </div>
  );
}
