import React, { createContext, useContext } from 'react';

// Add new flags here as needed — nothing else to change
export interface SiteConfig {
  isJobSeeking: boolean;
  // future: isOpenToFreelance: boolean;
  // future: showCaseStudies: boolean;
}

const defaultConfig: SiteConfig = {
  isJobSeeking: false,
};

const SiteConfigContext = createContext<SiteConfig>(defaultConfig);

interface SiteConfigProviderProps {
  config?: Partial<SiteConfig>;
  children: React.ReactNode;
}

export const SiteConfigProvider: React.FC<SiteConfigProviderProps> = ({
  config = {},
  children,
}) => {
  const value: SiteConfig = { ...defaultConfig, ...config };

  return (
    <SiteConfigContext.Provider value={value}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = (): SiteConfig => useContext(SiteConfigContext);
