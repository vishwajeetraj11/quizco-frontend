import { useState } from "react";
import { Question } from "./components/Question";
import { Sidebar } from "./components/Sidebar";
import { JSQuiz } from "./shared/sampleQuizes";

function App() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [attempted, setAttempted] = useState<
    { id: number; response: string }[]
  >([]);
  const [score, setScore] = useState(0);

  return (
    <div className="h-screen w-full flex flex-col flex-1 overflow-y-hidden">
      {/* Header */}
      <div className="min-h-[8%] flex justify-between items-center px-4 border-b border-gray-50x">
        <div className="flex items-center">
          <p className="mr-4">
            {attempted.length} / {JSQuiz.length} Completed
          </p>
          <div className="bg-gray-200 rounded-full h-1" style={{ width: 150 }}>
            <div
              className="bg-indigo-600 rounded-full h-1"
              style={{ width: `${(attempted.length / JSQuiz.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div>00:10:21</div>
        <div>
          <button className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 px-10 py-3 rounded-md text-white">
            Submit
          </button>
        </div>
      </div>
      <div className="min-h-[95%] flex flex-row flex-1 overflow-y-auto">
        <Sidebar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        <div className="flex-1  overflow-y-auto">
          <div className="min-h-[8%] border-b border-gray-200 flex px-4 py-4 justify-between">
            <p className="mt-auto">Question {activeIndex + 1}</p>
            <p className="mt-auto">Your Score: {score}</p>
          </div>
          <Question
            setScore={setScore}
            attempted={attempted}
            setAttempted={setAttempted}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
