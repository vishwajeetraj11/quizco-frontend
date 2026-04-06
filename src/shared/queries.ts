import { useAuth } from "@clerk/clerk-react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { MutationOptions, QueryKey, UseQueryOptions, useMutation, useQuery } from "react-query";
import { endpoints } from "./urls";

export const PublicQueryFactory = (queryKey: QueryKey, url: string, options?: UseQueryOptions<any, AxiosError, any>) => {

    return useQuery<any, AxiosError, any>(
        queryKey,
        async () => {
            return axios({
                url,
                method: 'GET',
            }).then(
                (result: AxiosResponse) => result.data
            )
        }, {
        refetchOnWindowFocus: false,
        retry: false,
        ...options
    }
    )
}

export const QueryFactory = (queryKey: QueryKey, url: string, options?: UseQueryOptions<any, AxiosError, any>) => {
    const { getToken } = useAuth();
    return useQuery<any, AxiosError, any>(
        queryKey,
        async () => {
            const token = await getToken();
            return axios({
                url,
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }).then(
                (result: AxiosResponse) => result.data
            )
        }, {
        refetchOnWindowFocus: false,
        retry: false,
        ...options
    }
    )
}

const MutationFactory = (mutationKey: QueryKey, url: string, method: 'POST' | 'PUT' | 'PATCH', options?: MutationOptions) => {
    const { getToken } = useAuth();
    return useMutation<any, AxiosError, any>({
        mutationKey,
        mutationFn: async (variables: { body: any }) => {
            const token = await getToken()
            return axios({
                url,
                method,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: variables.body
            }).then(
                (response: AxiosResponse) => response.data
            )
        },
        ...options
    })

}

const DeleteMutationFactory = (mutationKey: QueryKey, url: string, options?: MutationOptions) => {
    const { getToken } = useAuth();
    return useMutation<any, AxiosError, any>({
        mutationKey,
        mutationFn: async () => {
            const token = await getToken()
            return axios({
                url,
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }).then(
                (response: AxiosResponse) => response.data
            )
        },
        ...options
    })

}


export const useQuizes = (url: string, queryKey: QueryKey, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(queryKey, url, options);
export const useQuiz = (id: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Quiz', id], endpoints.quizById(id), options);
export const useQuizQuestions = (id: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Quiz Questions', id], endpoints.quizQuestions(id), options);
export const useQuizQuestion = (quizId: string, questionId: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Quiz Question', quizId, questionId], endpoints.quizQuestionById(quizId, questionId), options);
export const useQuizQuestionCorrectAns = (quizId: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Quiz Question Correct', quizId], endpoints.quizQuestionsCorrectAns(quizId), options);
export const useMyAttempts = (url: string, queryKey: QueryKey, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(queryKey, url, options);
export const useMyAttemptById = (id: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Attempts', id], endpoints.attemptsById(id), options);
export const useStatsByQuizId = (id: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Statistics', id], endpoints.statsByQuizId(id), options);
export const useStatsByQuizIdByQuestionId = (quizId: string, questionId: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Statistics', quizId, questionId], endpoints.statsByQuizIdbyQuestionId(quizId, questionId), options);
export const useStats = (options?: UseQueryOptions<any, AxiosError, any>) => PublicQueryFactory(['Statistics'], endpoints.stats, options);

export const useCreateQuiz = (options?: MutationOptions) => MutationFactory('Create Quiz', endpoints.quizes, 'POST', options)
export const useCreateAIQuestion = (quizId: string, options?: MutationOptions) => MutationFactory('Create AI Question', endpoints.quizAIQuestions(quizId), 'POST', options)
export const useCreateQuestion = (id: string, options?: MutationOptions) => MutationFactory('Create Question', endpoints.quizQuestions(id), 'POST', options)
export const useSaveScore = (id: string, options?: MutationOptions) => MutationFactory(['Save Score', id], endpoints.saveScore(id), 'POST', options)

export const useUpdateQuiz = (id: string, options?: MutationOptions) => MutationFactory('Update Quiz', endpoints.quizes + id, 'PATCH', options)
export const useUpdateQuestion = (quizId: string, questionId: string, options?: MutationOptions) => MutationFactory('Update Question', endpoints.quizQuestionById(quizId, questionId), 'PATCH', options)

export const useDeleteQuestion = (quizId: string, questionId: string, options?: MutationOptions) => DeleteMutationFactory('Delete Question', endpoints.quizQuestionById(quizId, questionId), options)
export const useDeleteQuiz = (quizId: string, options?: MutationOptions) => DeleteMutationFactory('Delete Question', endpoints.quizById(quizId), options)

// Onboarding
export const useSaveOnboarding = (options?: MutationOptions) => MutationFactory('Save Onboarding', endpoints.onboarding, 'POST', options)
export const useStarterQuiz = (topics: string[], playStyle: string, options?: UseQueryOptions<any, AxiosError, any>) =>
    QueryFactory(['Starter Quiz', topics, playStyle], `${endpoints.onboardingStarterQuiz}?topics=${topics.join(',')}&playStyle=${playStyle}`, { enabled: topics.length > 0, ...options })

// Agent Dashboard
export const useAgentBriefing = (options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Agent Briefing'], endpoints.agentBriefing, options)
export const useAgentPending = (options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Agent Pending'], endpoints.agentPending, options)
export const useAgentSkipped = (options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Agent Skipped'], endpoints.agentSkipped, options)
export const useAgentRuns = (options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Agent Runs'], endpoints.agentRuns, options)
export const useAgentTraceRuns = (params?: { page?: number, limit?: number }, options?: UseQueryOptions<any, AxiosError, any>) => {
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    return QueryFactory(['Agent Traces', page, limit], `${endpoints.agentTraces}?page=${page}&limit=${limit}`, options)
}
export const useAgentTraceRun = (runId: string, options?: UseQueryOptions<any, AxiosError, any>) =>
    QueryFactory(['Agent Trace', runId], endpoints.agentTraceById(runId), { enabled: Boolean(runId), ...options })
export const useAgentHealth = (options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Agent Health'], endpoints.agentHealth, options)
export const useTriggerAgentRun = (options?: MutationOptions) => MutationFactory(['Trigger Agent Run'], endpoints.agentRuns, 'POST', options)
export const useApproveQuiz = (id: string, options?: MutationOptions) => MutationFactory(['Approve Quiz', id], endpoints.agentApprove(id), 'POST', options)
export const useRejectQuiz = (id: string, options?: MutationOptions) => MutationFactory(['Reject Quiz', id], endpoints.agentReject(id), 'POST', options)

// Recommendations
export const useRecommendations = (options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Recommendations'], endpoints.recommendations, { refetchInterval: 120000, ...options })
export const useClickRecommendation = (id: string, options?: MutationOptions) => MutationFactory(['Click Recommendation', id], endpoints.recommendationClick(id), 'POST', options)
export const useDismissRecommendation = (id: string, options?: MutationOptions) => MutationFactory(['Dismiss Recommendation', id], endpoints.recommendationDismiss(id), 'POST', options)

// Tracking
export const useTrackEvent = (options?: MutationOptions) => MutationFactory('Track Event', endpoints.trackEvent, 'POST', options)
