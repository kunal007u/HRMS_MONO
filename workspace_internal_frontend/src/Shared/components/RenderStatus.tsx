import { Chip } from '@mui/material';

export const renderPaidSalary = (total, paid) => {
  let color, statusName: string;
  if (total == paid) {
    color = 'success';
    statusName = paid;
  } else if (total < paid) {
    color = 'error';
    statusName = paid;
  } else {
    color = 'warning';
    statusName = paid;
  }
  return <Chip size="small" variant="filled" color={color} sx={{fontSize: '14px', padding: '3px 8px'}} label={statusName} />;
};
