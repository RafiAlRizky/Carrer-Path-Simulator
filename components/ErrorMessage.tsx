
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
      <p className="font-semibold">Terjadi Kesalahan</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
