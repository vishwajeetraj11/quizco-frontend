// export const baseURL = 'https://quizco.herokuapp.com/api/v1';
export const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/v1' : 'https://quizco-backend.onrender.com/api/v1';


export const endpoints = {
    quizes: `${baseURL}/quizes/`,
    quizById: (id: string) => `${baseURL}/quizes/${id}/`,
    quizQuestions: (id: string) => `${baseURL}/quizes/${id}/questions`,
    quizAIQuestions: (id: string) => `${baseURL}/quizes/${id}/questions/ai`,
    quizQuestionById: (quizId: string, questionId: string) => `${baseURL}/quizes/${quizId}/questions/${questionId}`,
    quizQuestionsCorrectAns: (quizId: string) => `${baseURL}/quizes/${quizId}/questions/correct`,
    saveScore: (quizId: string) => `${baseURL}/quizes/${quizId}/attempts/save-score`,
    attempts: `${baseURL}/quizes/attempts`,
    attemptsById: (attemptId: string) => `${baseURL}/quizes/attempts/${attemptId}`,
    statsByQuizId: (quizId: string) => `${baseURL}/quizes/statistics/${quizId}`,
    statsByQuizIdbyQuestionId: (quizId: string, questionId: string) => `${baseURL}/quizes/statistics/${quizId}/questions/${questionId}`,
    stats: `${baseURL}/stats/`,

    // Onboarding
    onboarding: `${baseURL}/onboarding`,
    onboardingStarterQuiz: `${baseURL}/onboarding/starter-quiz`,

    // Agent
    agentBriefing: `${baseURL}/agent/briefing`,
    agentPending: `${baseURL}/agent/pending`,
    agentApprove: (id: string) => `${baseURL}/agent/pending/${id}/approve`,
    agentReject: (id: string) => `${baseURL}/agent/pending/${id}/reject`,
    agentSkipped: `${baseURL}/agent/skipped`,
    agentRuns: `${baseURL}/agent/runs`,
    agentTraces: `${baseURL}/agent/traces`,
    agentTraceById: (runId: string) => `${baseURL}/agent/traces/${runId}`,
    agentTraceIngest: `${baseURL}/agent/traces/ingest`,
    agentHealth: `${baseURL}/agent/health`,

    // Recommendations
    recommendations: `${baseURL}/recommendations`,
    recommendationClick: (id: string) => `${baseURL}/recommendations/${id}/click`,
    recommendationDismiss: (id: string) => `${baseURL}/recommendations/${id}/dismiss`,

    // Events / Tracking
    trackEvent: `${baseURL}/events`,
}
