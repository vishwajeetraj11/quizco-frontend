import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopicPicker } from "../components/onboarding/TopicPicker";
import { StylePicker } from "../components/onboarding/StylePicker";
import { StarterQuiz } from "../components/onboarding/StarterQuiz";
import { PlayStyle } from "../shared/interfaces";
import { useSaveOnboarding, useStarterQuiz } from "../shared/queries";
import { useSnackbar } from "../ui/snackbar";
import { Button } from "../ui";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export const Onboarding: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [topics, setTopics] = useState<string[]>([]);
  const [playStyle, setPlayStyle] = useState<PlayStyle | null>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: saveOnboarding, isLoading: isSaving } =
    useSaveOnboarding();

  const { data: starterQuizData, isLoading: isStarterLoading } =
    useStarterQuiz(topics, playStyle || "", {
      enabled: step === 3 && topics.length > 0 && !!playStyle,
    });

  const handleContinueToStyle = () => {
    if (topics.length === 0) return;
    setStep(2);
  };

  const handleSelectStyle = async (style: PlayStyle) => {
    setPlayStyle(style);
  };

  const handleContinueToStarter = async () => {
    if (!playStyle) return;
    try {
      await saveOnboarding({ body: { topics, playStyle } });
      setStep(3);
    } catch {
      enqueueSnackbar("Could not save preferences. Please try again.", {
        variant: "error",
      });
    }
  };

  const handleFinish = () => {
    navigate("/quizes");
  };

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-12">
      {step === 1 && (
        <>
          <TopicPicker selected={topics} onSelect={setTopics} />
          <div className="mt-8">
            <Button
              variant="contained"
              color="primary"
              disabled={topics.length === 0}
              onClick={handleContinueToStyle}
              endIcon={<FiArrowRight size={16} />}
            >
              Continue
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <StylePicker selected={playStyle} onSelect={handleSelectStyle} />
          <div className="mt-8 flex items-center gap-3">
            <Button
              variant="outlined"
              onClick={() => setStep(1)}
              endIcon={<FiArrowLeft size={16} />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!playStyle || isSaving}
              onClick={handleContinueToStarter}
              endIcon={<FiArrowRight size={16} />}
            >
              {isSaving ? "Saving..." : "Continue"}
            </Button>
          </div>
        </>
      )}

      {step === 3 && (
        <StarterQuiz
          quiz={starterQuizData?.quiz || null}
          isLoading={isStarterLoading}
          onSkip={handleFinish}
        />
      )}
    </div>
  );
};
