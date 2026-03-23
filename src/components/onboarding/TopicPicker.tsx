import { useState } from "react";
import { FiCheck } from "react-icons/fi";

const TOPICS = [
  { id: "javascript", label: "JavaScript", emoji: "🟨" },
  { id: "python", label: "Python", emoji: "🐍" },
  { id: "react", label: "React", emoji: "⚛️" },
  { id: "css", label: "CSS & Design", emoji: "🎨" },
  { id: "algorithms", label: "Algorithms", emoji: "🧮" },
  { id: "databases", label: "Databases", emoji: "🗄️" },
  { id: "devops", label: "DevOps", emoji: "🚀" },
  { id: "security", label: "Security", emoji: "🔒" },
  { id: "ai-ml", label: "AI & ML", emoji: "🤖" },
  { id: "web", label: "Web Fundamentals", emoji: "🌐" },
  { id: "mobile", label: "Mobile Dev", emoji: "📱" },
  { id: "system-design", label: "System Design", emoji: "🏗️" },
  { id: "typescript", label: "TypeScript", emoji: "🔷" },
  { id: "nodejs", label: "Node.js", emoji: "💚" },
  { id: "general", label: "General Knowledge", emoji: "📚" },
  { id: "history", label: "History", emoji: "🏛️" },
  { id: "science", label: "Science", emoji: "🔬" },
  { id: "trivia", label: "Fun Trivia", emoji: "🎲" },
];

interface Props {
  selected: string[];
  onSelect: (topics: string[]) => void;
}

export const TopicPicker: React.FC<Props> = ({ selected, onSelect }) => {
  const toggle = (topicId: string) => {
    if (selected.includes(topicId)) {
      onSelect(selected.filter((t) => t !== topicId));
    } else {
      onSelect([...selected, topicId]);
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-teal-600">
        Step 1 of 2
      </p>
      <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
        What do you love?
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Pick as many as you want. We'll use this to find quizzes you'll enjoy.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {TOPICS.map((topic) => {
          const isSelected = selected.includes(topic.id);
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => toggle(topic.id)}
              className={`inline-flex items-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                isSelected
                  ? "border-teal-500 bg-teal-50 text-teal-700 shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="text-lg">{topic.emoji}</span>
              {topic.label}
              {isSelected && <FiCheck size={16} className="text-teal-600" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
