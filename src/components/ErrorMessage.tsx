import SadFace from "../assets/illustations/500.png";
import { errorMessages } from "../shared/constants";
import HandStop from "./../assets/illustations/403.png";
import Response404 from "./../assets/illustations/404.png";
interface IProps {
  statusCode: number;
  message?: string | undefined;
  resource?: "Quiz" | "Question" | "Attempt" | "Questions";
}

export const ErrorMessage: React.FC<IProps> = ({
  statusCode,
  message,
  resource,
}) => {
  const notFound = statusCode === 404;
  const auth403 = statusCode === 403;

  // const serviceUnavailable = statusCode === 503; // Heroku

  return (
    <div className="flex flex-col items-center justify-center min-h-1/2">
      {notFound ? (
        <>
          <div className="mb-4"></div>
          <p></p>
          <div className="max-w-md mx-auto">
            <img
              src={Response404}
              className="w-full h-full overflow-hidden"
              alt="Hand Stop Illustration"
            />
          </div>
          <p className="text-xl font-semibold text-slate-600 mt-10">
            {message || errorMessages.notFound(resource)}
          </p>
        </>
      ) : auth403 ? (
        <>
          <div className="max-w-md mx-auto">
            <img
              src={HandStop}
              className="w-full h-full overflow-hidden"
              alt="Hand Stop Illustration"
            />
          </div>
          <p className="text-xl font-semibold text-slate-600">
            {message || errorMessages.auth403}
          </p>
        </>
      ) : (
        <>
          <div className="max-w-md mx-auto">
            <img
              src={SadFace}
              className="w-full h-full overflow-hidden"
              alt="Something Went Wrong Illustration"
            />
          </div>
          <p className="text-xl mt-4 font-semibold text-slate-600">
            {errorMessages.default}
          </p>
        </>
      )}
    </div>
  );
};
