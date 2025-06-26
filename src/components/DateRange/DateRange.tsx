import React from 'react';

// DateRange component to display a start and optional end date for a role
// Usage: <DateRange startDate="January 2020" endDate="December 2021" />
// The component formats the date range with a separator and screen reader text for accessibility

type DateRangeProps = {
  startDate: string; // Start date of the role
  endDate?: string;  // Optional end date of the role
  className?: string; // Optional className for custom styling on the wrapper
};

const DateRange: React.FC<DateRangeProps> = ({ startDate, endDate, className }) => (
  <span className={className}>
    {startDate}
    {endDate && (
      <>
        <span aria-hidden="true">{' — '}</span>
        <span className="sr-only">{' to '}</span>
        {endDate}
      </>
    )}
  </span>
);

export default DateRange;
