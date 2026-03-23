export interface IQuestionForm {
    title: string;
    correct: string;
    options: IOption[];
}
export interface IQuestion {
    _id: string;
    quiz: string; // unpopulated
    title: string;
    options: IOption[];
}

export interface IOption {
    value: string;
    _id?: string;
}

export interface IOptionWithFrequency extends IOption {
    frequency: number
}

export interface IResponse extends IQuestion {
    response: string;
}

export interface IResponseWithCorrect extends IResponse {
    correct: string;
}

export interface IQuizForm {
    title: string;
    description: string;
    tags: string[];
    status?: string;
}

export interface IQuiz extends IQuizForm {
    status: string;
    _id: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    id: string;
    attemptsCount: number;
    questionsCount: number;
}

export interface IAttempt {
    _id: string;
    userId: string;
    score: number;
    quiz: IQuiz
}

// Onboarding
export type PlayStyle = 'fast' | 'deep' | 'surprise' | 'challenge';

export interface IOnboardingPayload {
    topics: string[];
    playStyle: PlayStyle;
}

// Agent
export interface IPendingQuiz {
    _id: string;
    title: string;
    topic: string;
    difficulty: string;
    format: string;
    questions: IQuestion[];
    agentConfidence: number;
    trendSummary: string;
    inspiredBy: string[];
    similarityScore?: number;
    closestMatch?: string;
    targetUsers?: string;
    generatedAt: string;
    status: 'pending' | 'approved' | 'rejected';
}

export interface IAgentBriefingSnapshot {
    summary?: string;
    quizzesGenerated?: number;
    quizzesSkipped?: number;
    recommendationsSent?: number;
    topTrending?: string[];
    contentGaps?: string[];
    atRiskUsers?: number;
    running?: boolean;
}

export interface IAgentBriefing extends IAgentBriefingSnapshot {
    data?: IAgentBriefingSnapshot;
}

export interface IAgentRun {
    _id: string;
    ranAt: string;
    durationMs: number;
    quizzesGenerated: number;
    quizzesSkipped: number;
    recommendationsSent: number;
    costUSD: number;
    summary: string;
    errors: string[];
    trigger?: string;
    requestedBy?: string;
    status?: string;
}

export interface ISkippedQuiz {
    topic: string;
    difficulty: string;
    reason: string;
    similarityScore: number;
    closestMatch: string;
    skippedAt: string;
}

// Recommendations
export type RecommendationType = 'for_you' | 'trending' | 'new_drop' | 'comeback' | 'challenge' | 're_engage';

export interface IRecommendation {
    _id: string;
    quizId: string;
    quiz?: IQuiz;
    type: RecommendationType;
    message: string;
    generatedAt: string;
    expiresAt: string;
    clicked: boolean;
}

// Platform Health
export interface IPlatformHealthCheck {
    name: string;
    allowed: boolean;
    reason?: string;
}

export interface IPlatformHealthSnapshot {
    status?: string;
    running?: boolean;
    enabled?: boolean;
    database?: string;
    lastRunAt?: string | null;
    lastRunSummary?: string | null;
    preflight?: {
        allowed?: boolean;
        blockers?: string[];
        checks?: IPlatformHealthCheck[];
    };
    dau?: number | null;
    dauTrend?: number | null;
    completionRate?: number | null;
    topicVelocity?: { topic: string; velocity: number }[];
    contentDepth?: { topic: string; count: number }[];
}

export interface IPlatformHealth extends IPlatformHealthSnapshot {
    data?: IPlatformHealthSnapshot;
}

export interface IStatsByQuiz {
    attempt: {
        createdAt: Date,
        id: string,
        _id: string,
        score: number;
        quiz: {
            description: string;
            createdAt: string;
            author: string;
            id: string;
            status: string;
            tags: string[];
            title: string;
            updatedAt: Date;
        }
    };
    maxAttempts: {
        userId: string;
        val: number;
    };
    user: {
        email: string;
        firstName: string;
        lastName: string;
        photo: string;
        userId: string
    }
}
