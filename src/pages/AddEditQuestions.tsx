import { useParams } from "react-router-dom";
import { useQuizQuestions } from "../shared/queries";

interface Props {}
export const AddEditQuestions: React.FC<Props> = () => {
  const { id } = useParams() as { id: string };
  const { isLoading, data } = useQuizQuestions(id);

  return (
    <div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};
