import { Link } from "react-router-dom";
import { useQuizes } from "../shared/queries";

export const Quizes = () => {
  const { data } = useQuizes();

  return (
    <div>
      <div>Quizes</div>
      <div className="grid grid-cols-3 gap-3">
        {data?.quizes.map((quiz: any) => (
          <Link
            key={quiz._id}
            to={`/quizes/${quiz._id}`}
            className="shadow-md rounded-sm px-10 py-8"
          >
            <p className="font-semibold">{quiz.title}</p>
            <p>{quiz.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
