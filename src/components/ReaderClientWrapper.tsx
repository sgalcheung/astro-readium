"use client";

import CustomProviders from "./CustomProviders";
import { ManifestLoader } from "./ManifestLoader";

const ReaderClientWrapper = ({ bookUrl }: { bookUrl: string }) => {
  return (
    <CustomProviders>
      <ManifestLoader bookUrl={bookUrl} />
    </CustomProviders>
  );
};

export default ReaderClientWrapper;
