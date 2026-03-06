import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Resource {
    id: string;
    url: string;
    title: string;
    subject: T__2;
    description: string;
}
export interface GameAnalytics {
    title: string;
    gameId: string;
    clickCount: bigint;
    category: T;
}
export interface ChatMessage {
    content: string;
    role: T__1;
    timestamp: Time;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export enum Page {
    about = "about",
    resources = "resources",
    home = "home",
    games = "games"
}
export enum T {
    strategy = "strategy",
    puzzles = "puzzles",
    arcade = "arcade"
}
export enum T__1 {
    user = "user",
    assistant = "assistant"
}
export enum T__2 {
    wellbeing = "wellbeing",
    math = "math",
    generalKnowledge = "generalKnowledge",
    english = "english",
    science = "science"
}
export interface backendInterface {
    createSession(sessionId: string): Promise<void>;
    getAllResources(): Promise<Array<Resource>>;
    getGameAnalytics(): Promise<Array<GameAnalytics>>;
    getPageVisits(): Promise<Array<[string, bigint]>>;
    getResourcesBySubject(subject: T__2): Promise<Array<Resource>>;
    getSessionMessages(sessionId: string): Promise<Array<ChatMessage>>;
    getTopGames(limit: bigint): Promise<Array<GameAnalytics>>;
    getTotalGameClicks(): Promise<bigint>;
    getTotalSiteVisits(): Promise<bigint>;
    recordGameClick(gameId: string, title: string, category: T): Promise<void>;
    recordPageVisit(page: Page): Promise<void>;
    sendMessageToAI(sessionId: string, message: string): Promise<string>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
