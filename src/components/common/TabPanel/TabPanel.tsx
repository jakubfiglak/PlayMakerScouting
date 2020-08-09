import React from 'react';
import { Box } from '@material-ui/core';

export const TabPanel: React.FC<{ index: any; value: any; title: string }> = ({
  children,
  value,
  index,
  title,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${title}-${index}`}
      aria-labelledby={`${title}-${index}`}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
};
