import { useEffect } from "react";
import type { Page, T } from "../backend.d";
import { useActor } from "./useActor";

/**
 * Fire-and-forget page visit tracker.
 * Calls recordPageVisit once on mount when the actor is ready.
 */
export function useTrackPageVisit(page: Page) {
  const { actor, isFetching } = useActor();

  useEffect(() => {
    if (!actor || isFetching) return;
    actor.recordPageVisit(page);
  }, [actor, isFetching, page]);
}

/**
 * Returns a stable callback that records a game click (fire-and-forget).
 */
export function useTrackGameClick() {
  const { actor } = useActor();

  return (gameId: string, title: string, category: T) => {
    if (!actor) return;
    actor.recordGameClick(gameId, title, category);
  };
}
