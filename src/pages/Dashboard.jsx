import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getTopics } from "../api/topicApi";

import ProgressBar from "../components/ProgressBar";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/authContext";

function Dashboard() {
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);

  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics();

        setTopics(data.topics);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // Dashboard Stats
  const totalTopics = topics.length;

  const totalSolved = topics.reduce(
    (acc, topic) => acc + topic.completedProblems,
    0,
  );

  const totalProblems = topics.reduce(
    (acc, topic) => acc + topic.totalProblems,
    0,
  );

  const overallProgress =
    totalProblems > 0 ? Math.floor((totalSolved / totalProblems) * 100) : 0;

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
        <p className="text-xl font-medium">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar showLogoutButton />

      {/* Main Content */}
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, <span className="text-black">{user?.name}</span>
            👋
          </h2>

          <p className="text-gray-600">
            Track your DSA preparation progress and stay consistent
          </p>
        </div>

        {/* Stats */}
        <div
          className="
            grid grid-cols-1
            md:grid-cols-3
            gap-5 mb-10
          "
        >
          {/* Total Topics */}
          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-sm
            "
          >
            <h3
              className="
                text-gray-500
                mb-2
              "
            >
              Total Topics
            </h3>

            <p className="text-4xl font-bold">{totalTopics}</p>
          </div>

          {/* Problems Solved */}
          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-sm
            "
          >
            <h3
              className="
                text-gray-500
                mb-2
              "
            >
              Problems Solved
            </h3>

            <p className="text-4xl font-bold">
              {" "}
              {totalSolved} / {totalProblems}
            </p>
          </div>

          {/* Overall Progress */}
          <div
            className="
              bg-white
              p-6
              rounded-2xl
              shadow-sm
            "
          >
            <h3
              className="
                text-gray-500
                mb-2
              "
            >
              Overall Progress
            </h3>

            <p className="text-4xl font-bold">{overallProgress}%</p>
          </div>
        </div>

        {/* Topic Cards */}
        <div
          className="
            grid grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {topics.map((topic) => {
            const progress = topic.progress || 0;

            return (
              <div
                key={topic._id}
                className="
                  bg-white
                  rounded-2xl
                  p-6
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >
                <div
                  className="
                    flex justify-between
                    items-center mb-4
                  "
                >
                  <h2
                    className="
                      text-xl
                      font-semibold
                    "
                  >
                    {topic.title}
                  </h2>

                  <span
                    className="
                      text-sm
                      bg-gray-100
                      px-3 py-1
                      rounded-full
                    "
                  >
                    {progress}%
                  </span>
                </div>

                <p
                  className="
                    text-gray-600
                    mb-4
                  "
                >
                  {topic.completedProblems}
                  {" / "}
                  {topic.totalProblems} Problems Solved
                </p>

                {/* Progress Bar */}
                <div className="mb-5">
                  <ProgressBar progress={progress} />
                </div>

                <button
                  onClick={() => navigate(`/topic/${topic._id}`)}
                  className="
                    w-full
                    bg-black
                    text-white
                    py-3
                    rounded-xl
                    hover:bg-gray-800
                    transition
                  "
                >
                  View Problems
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
