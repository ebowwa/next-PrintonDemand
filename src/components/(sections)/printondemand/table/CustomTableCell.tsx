// components/CustomTableCell.tsx
import React from 'react';
import { TableCell } from "@/components/ui/table";

interface CustomTableCellProps {
  className?: string;
  children: React.ReactNode;
}

export const CustomTableCell: React.FC<CustomTableCellProps> = ({ className, children }) => (
  <TableCell className={className}>{children}</TableCell>
);

// Props Interface (CustomTableCellProps):
// An interface named CustomTableCellProps is defined, which specifies the types of props that the CustomTableCell component can receive.
// It includes two properties:
//   - className: Optional string property to specify CSS classes for styling.
//   - children: Mandatory property of type React.ReactNode representing the content of the table cell.

// Component Definition (CustomTableCell):
// The CustomTableCell component is defined as a functional component using the React.FC (Function Component) type.
// It accepts props of type CustomTableCellProps.
// Inside the component, the props className and children are destructured from the props object passed as an argument to the component function.

// Usage of Props:
// The className prop is passed down to the underlying TableCell component, which presumably is a custom table cell component from a UI library.
// The children prop is rendered within the TableCell component. This is where the actual content of the table cell will be displayed.
