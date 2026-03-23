import { FiZap, FiBook, FiShuffle, FiTrendingUp } from "react-icons/fi";
import { PlayStyle } from "../../shared/interfaces";

const STYLES: {
  id: PlayStyle;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "fast",
    label: "Fast",
    description: "Quick rounds, beat the clock",
    icon: <FiZap size={28} />,
  },
  {
    id: "deep",
    label: "Deep",
    description: "Long, hard quizzes to learn from",
    icon: <FiBook size={28} />,
  },
  {
    id: "surprise",
    label: "Surprise",
    description: "Mix it up, play anything",
    icon: <FiShuffle size={28} />,
  },
  {
    id: "challenge",
    label: "Challenge",
    description: "Start easy, get harder over time",
    icon: <FiTrendingUp size={28} />,
  },
];

interface Props {
  selected: PlayStyle | null;
  onSelect: (style: PlayStyle) => void;
}

export const StylePicker: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-teal-600">
        Step 2 of 2
      </p>
      <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
        How do you play?
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Pick your style. This helps us recommend the right quizzes.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STYLES.map((style) => {
          const isSelected = selected === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelect(style.id)}
              className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all ${
                isSelected
                  ? "border-teal-500 bg-teal-50 text-teal-700 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                  isSelected ? "bg-teal-100 text-teal-600" : "bg-slate-100 text-slate-500"
                }`}
              >
                {style.icon}
              </div>
              <p className="text-sm font-bold">{style.label}</p>
              <p className="text-xs text-slate-500">{style.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
