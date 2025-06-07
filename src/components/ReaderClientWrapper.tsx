import CustomProviders from "./CustomProviders";
import { ManifestLoader } from "./ManifestLoader";
import ThemingInitializer from "./ThemingInitializer";

const ReaderClientWrapper = ({ bookUrl }: { bookUrl: string }) => {
  return (
    <CustomProviders>
      <ThemingInitializer />
      <ManifestLoader bookUrl={bookUrl} />
    </CustomProviders>
  );
};

export default ReaderClientWrapper;
