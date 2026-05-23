import { useEffect, useMemo, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import ProblemCard from "../components/ProblemCard";

import ProgressBar from "../components/ProgressBar";

import { getProblemsByTopic } from "../api/topicApi";

import { getUserProgress, toggleProgress } from "../api/progressApi";

function TopicDetails() {
  const { id } = useParams();

  const [problems, setProblems] = useState([]);

  const [progressIds, setProgressIds] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch Problems + Progress
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [problemsData, progressData] = await Promise.all([
          getProblemsByTopic(id),

          getUserProgress(),
        ]);

        setProblems(problemsData.problems);

        const completedIds = progressData.progress.map((item) => item.problem);

        setProgressIds(completedIds);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Toggle Checkbox
  const handleToggleProgress = async (problemId) => {
    try {
      await toggleProgress(problemId);

      setProgressIds((prev) => {
        if (prev.includes(problemId)) {
          return prev.filter((id) => id !== problemId);
        }

        return [...prev, problemId];
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Merge UI State
  const transformedProblems = useMemo(() => {
    return problems.map((problem) => ({
      ...problem,

      completed: progressIds.includes(problem._id),
    }));
  }, [problems, progressIds]);

  // Stats
  const completedCount = transformedProblems.filter(
    (problem) => problem.completed,
  ).length;

  const progress =
    transformedProblems.length > 0
      ? Math.floor((completedCount / transformedProblems.length) * 100)
      : 0;

  const topicTitle = transformedProblems?.[0]?.topic?.title || "DSA Topic";

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex items-center
          justify-center
          bg-gray-100
        "
      >
        <p className="text-xl font-medium">Loading Problems...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar showBackButton showLogoutButton />

      {/* Main Content */}
      <div className="p-8">
        {/* Header */}
        <div
          className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
            mb-8
          "
        >
          <div
            className="
              flex justify-between
              items-center
              mb-4
            "
          >
            <div>
              <h2
                className="
                  text-3xl
                  font-bold
                "
              >
                {topicTitle}
              </h2>

              <p
                className="
                  text-gray-500
                  mt-1
                "
              >
                Topic ID: {id}
              </p>
            </div>

            <div className="text-right">
              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                {completedCount} / {transformedProblems.length}
              </h3>

              <p
                className="
                  text-gray-500
                  text-sm
                "
              >
                Problems Solved
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar progress={progress} height="h-4" />

          <p
            className="
              mt-2
              text-sm
              text-gray-600
            "
          >
            Overall Progress: {progress}%
          </p>
        </div>

        {/* Problem List */}
        <div className="space-y-5">
          {transformedProblems.map((problem) => (
            <ProblemCard
              key={problem._id}
              problem={problem}
              onToggleProgress={handleToggleProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopicDetails;
