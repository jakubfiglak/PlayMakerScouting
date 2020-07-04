import { useState } from 'react';

const useTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    newTab: number,
  ) => {
    setActiveTab(newTab);
  };

  return [activeTab, handleTabChange] as const;
};

export default useTabs;
