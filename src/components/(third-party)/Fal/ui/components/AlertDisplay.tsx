import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertType } from '../types';

interface AlertDisplayProps {
  alert: AlertType | null;
}

export const AlertDisplay: React.FC<AlertDisplayProps> = ({ alert }) => (
  alert && (
    <Alert variant={alert.type === 'error' ? 'destructive' : 'default'}>
      <AlertDescription>{alert.message}</AlertDescription>
    </Alert>
  )
);