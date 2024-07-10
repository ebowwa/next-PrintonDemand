// ErrorComponent.tsx
import React from 'react';

type ErrorProps = {
  error: any;
};

const Error: React.FC<ErrorProps> = ({ error }) => {
  if (!error) {
    return null;
  }
  return (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span className="font-medium">Error</span> {error.message}
    </div>
  );
};

export default Error;