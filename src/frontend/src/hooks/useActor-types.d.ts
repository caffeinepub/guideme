// Augments backendInterface and Backend class with authorization method.
// The authorization component injects this method at runtime via a Proxy.
import type {} from "../backend";

declare module "../backend" {
  interface backendInterface {
    _initializeAccessControlWithSecret(secret: string): Promise<void>;
  }
  // Merge into the Backend class interface so it satisfies backendInterface
  interface Backend {
    _initializeAccessControlWithSecret(secret: string): Promise<void>;
  }
}
