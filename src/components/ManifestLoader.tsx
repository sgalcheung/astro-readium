import { useEffect, useState } from "react";
import { HttpFetcher, Link } from "@readium/shared";
import { CustomReader } from "./CustomReader";

export function ManifestLoader({ bookUrl }: { bookUrl: string }) {
  const [manifest, setManifest] = useState<object>();
  const [selfHref, setSelfHref] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loadManifest = async () => {
      try {
        const url = new URL(bookUrl);
        const pathParts = url.pathname.split("/").map((entry) =>
          entry === "manifest.json"
            ? entry
            : entry
                .replace(/\+|%2B/g, "-")
                .replace(/\/|%2F/g, "_")
                .replace(/=|%3D/g, "")
        );
        const sanitized = new URL(pathParts.join("/"), url.origin);
        let pubURL = sanitized.href;
        if (!pubURL.endsWith("manifest.json") && !pubURL.endsWith("/")) {
          pubURL += "/";
        }

        const fetcher = new HttpFetcher(undefined, pubURL);
        const manifestLink = new Link({ href: "manifest.json" });
        const fetched = fetcher.get(manifestLink);

        const href = await fetched.link().then((l) => l.toURL(pubURL));
        const manifestData = await fetched.readAsJSON();

        setSelfHref(href);
        setManifest(manifestData as object);
      } catch (err) {
        setError(`Manifest error: ${(err as Error).message}`);
      }
    };

    loadManifest();
  }, [bookUrl]);

  if (error) return <span>{error}</span>;
  if (!manifest || !selfHref) return <span>Loading…</span>;

  return <CustomReader rawManifest={manifest} selfHref={selfHref} />;
}
