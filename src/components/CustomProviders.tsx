// src/components/CustomProviders.tsx

import {
  ThStoreProvider,
  ThPreferencesProvider
} from "@edrlab/thorium-web/epub";

import { playgroundPreferences } from "../preferences/preferences";

export const CustomProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThStoreProvider storageKey="readium-playground-state">
      <ThPreferencesProvider value={playgroundPreferences}>
        {children}
      </ThPreferencesProvider>
    </ThStoreProvider>
  );
};

export default CustomProviders;
