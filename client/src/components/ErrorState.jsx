const ErrorState = ({ message = "Something went wrong.", onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
    <p className="text-espresso-600">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="btn-secondary !py-2 text-sm">
        Retry
      </button>
    )}
  </div>
);

export default ErrorState;
