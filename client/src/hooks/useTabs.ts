import { useState } from 'react';

export const useTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    newTab: number,
  ) => {
    setActiveTab(newTab);
  };

  return [activeTab, handleTabChange, setActiveTab] as const;
};
