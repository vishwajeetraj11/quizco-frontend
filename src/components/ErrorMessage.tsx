import { errorMessages } from "../shared/constants";

interface IProps {
  statusCode: number;
}

export const ErrorMessage: React.FC<IProps> = ({ statusCode }) => {
  const notFound = statusCode === 404;
  const auth403 = statusCode === 403;

  return (
    <div className="flex flex-col items-center justify-center min-h-1/2">
      {notFound ? (
        <>
          <div className="mb-4"></div>
          <p>{errorMessages.notFound()}</p>
        </>
      ) : auth403 ? (
        <p>{errorMessages.auth403}</p>
      ) : (
        <>
          <div className="mb-4"></div>
          <p>{errorMessages.default}</p>
        </>
      )}
    </div>
  );
};
