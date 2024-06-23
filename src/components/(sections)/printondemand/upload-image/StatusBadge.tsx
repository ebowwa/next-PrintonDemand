import React from 'react';
import { ImageFileWithStatus } from "./types";

const StatusBadge: React.FC<{ status: ImageFileWithStatus['status'], errorMessage?: string }> = ({ status, errorMessage }) => {
  const statusColors = {
    converted: "bg-green-500",
    verifying: "bg-blue-500",
    error: "bg-red-500",
    pending: "bg-yellow-500",
  };

  return (
    <span className={`${statusColors[status]} text-white px-2 py-1 rounded-full`}>
      {status === 'error' ? errorMessage : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
