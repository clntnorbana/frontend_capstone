type NotFoundProps = {
  message: string;
};

const NotFound = ({ message }: NotFoundProps) => {
  return (
    <div className="flex justify-center items-center">
      <p className="text-2xl font-bold text-gray-400">{message}</p>
    </div>
  );
};

export default NotFound;
