import { useMutation, useQuery } from "@tanstack/react-query";
import type { ChatMessage, GameAnalytics, Resource } from "../backend.d";
import { T__1, T__2 } from "../backend.d";
import { useActor } from "./useActor";

export type { Resource, ChatMessage, GameAnalytics };
export { T__1, T__2 };

export function useAllResources() {
  const { actor, isFetching } = useActor();
  return useQuery<Resource[]>({
    queryKey: ["resources"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllResources();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useResourcesBySubject(subject: T__2) {
  const { actor, isFetching } = useActor();
  return useQuery<Resource[]>({
    queryKey: ["resources", subject],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getResourcesBySubject(subject);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSessionMessages(sessionId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<ChatMessage[]>({
    queryKey: ["messages", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return [];
      return actor.getSessionMessages(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
  });
}

export function useCreateSession() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (sessionId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createSession(sessionId);
    },
  });
}

export function useSendMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      sessionId,
      message,
    }: {
      sessionId: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.sendMessageToAI(sessionId, message);
    },
  });
}

export function useTotalSiteVisits() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["analytics", "totalSiteVisits"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getTotalSiteVisits();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTotalGameClicks() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["analytics", "totalGameClicks"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getTotalGameClicks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePageVisits() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[string, bigint]>>({
    queryKey: ["analytics", "pageVisits"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPageVisits();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTopGames(limit: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<GameAnalytics[]>({
    queryKey: ["analytics", "topGames", limit.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopGames(limit);
    },
    enabled: !!actor && !isFetching,
  });
}
