"use client";
import React, { useState, useEffect } from "react";
import {
  Download,
  Users,
  Calendar,
  Mail,
  Search,
  RefreshCw,
  Lock,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // ADMIN PASSWORD - CHANGE THIS!
  // ==========================================
  const ADMIN_PASSWORD = "oinusidet2026"; // 🔐 Change to your own password

  // ==========================================
  // HANDLE LOGIN
  // ==========================================
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
      loadWaitlist();
    } else {
      setError("Incorrect password");
    }
  };

  // ==========================================
  // LOAD WAITLIST FROM API
  // ==========================================
  const loadWaitlist = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/waitlist");
      const data = await response.json();

      if (data.success) {
        setWaitlist(data.data || []);
      } else {
        setError("Failed to load waitlist");
      }
    } catch (err) {
      console.error("Load error:", err);
      setError("Failed to load waitlist");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EXPORT TO CSV
  // ==========================================
  const exportToCSV = () => {
    if (waitlist.length === 0) return;

    // Create CSV content
    const headers = ["Email", "Signup Date"];
    const rows = waitlist.map((item) => [
      item.email,
      new Date(item.created_at).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `oinusidet-waitlist-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================
  // FILTER WAITLIST BY SEARCH
  // ==========================================
  const filteredWaitlist = waitlist.filter((item) =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ==========================================
  // FORMAT DATE
  // ==========================================
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ==========================================
  // LOGIN SCREEN
  // ==========================================
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-center mb-6">
            Enter password to view waitlist
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white focus:border-emerald-400 focus:outline-none mb-4"
          />

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl font-semibold text-white hover:shadow-lg transition-all"
          >
            Login
          </button>

          <p className="text-gray-500 text-xs text-center mt-6">
            Default password: oinusidet2026
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD SCREEN
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* ========================================== */}
        {/* HEADER */}
        {/* ========================================== */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">OinUsideT Waitlist</h1>
            <p className="text-gray-400">Manage your email signups</p>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* ========================================== */}
        {/* STATS CARDS */}
        {/* ========================================== */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Signups */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span className="text-gray-400">Total Signups</span>
            </div>
            <div className="text-3xl font-bold">{waitlist.length}</div>
          </div>

          {/* Latest Signup */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">Latest Signup</span>
            </div>
            <div className="text-lg font-semibold">
              {waitlist.length > 0
                ? formatDate(waitlist[0].created_at).split(",")[0]
                : "No signups yet"}
            </div>
          </div>

          {/* This Week */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400">This Week</span>
            </div>
            <div className="text-3xl font-bold">
              {
                waitlist.filter((item) => {
                  const date = new Date(item.created_at);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return date > weekAgo;
                }).length
              }
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* ACTIONS BAR */}
        {/* ========================================== */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search emails..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-emerald-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={loadWaitlist}
                disabled={loading}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>

              <button
                onClick={exportToCSV}
                disabled={waitlist.length === 0}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* WAITLIST TABLE */}
        {/* ========================================== */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Signup Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : filteredWaitlist.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      {searchTerm ? "No results found" : "No signups yet"}
                    </td>
                  </tr>
                ) : (
                  filteredWaitlist.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-750 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                      <td className="px-6 py-4 font-medium">{item.email}</td>
                      <td className="px-6 py-4 text-gray-400">
                        {formatDate(item.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Counter */}
        {!loading && filteredWaitlist.length > 0 && (
          <div className="mt-4 text-center text-gray-400 text-sm">
            Showing {filteredWaitlist.length} of {waitlist.length} signups
          </div>
        )}
      </div>
    </div>
  );
}
