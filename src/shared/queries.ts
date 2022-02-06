import { useSession } from "@clerk/clerk-react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { MutationOptions, QueryKey, useMutation, useQuery, UseQueryOptions } from "react-query";
import { endpoints } from "./urls";

export const QueryFactory = (queryKey: QueryKey, url: string, options?: UseQueryOptions<any, AxiosError, any>) => {
    const { getToken } = useSession();
    return useQuery<any, AxiosError, any>(
        queryKey,
        async () => {
            const token = await getToken()
            console.log(token)
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
        ...options
    }
    )
}

const MutationFactory = (mutationKey: QueryKey, url: string, method: 'POST' | 'PUT' | 'PATCH', options?: MutationOptions) => {
    const { getToken } = useSession();
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
    const { getToken } = useSession();
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


export const useQuizes = (url: string, filter?: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(filter ? ['Quizes', filter] : 'Quizes', url, options);
export const useQuiz = (id: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Quiz', id], endpoints.quizById(id), options);
export const useQuizQuestions = (id: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Quiz Questions', id], endpoints.quizQuestions(id), options);
export const useQuizQuestion = (quizId: string, questionId: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Quiz Question', quizId, questionId], endpoints.quizQuestionById(quizId, questionId), options);
export const useQuizQuestionCorrectAns = (quizId: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Quiz Question Correct', quizId], endpoints.quizQuestionsCorrectAns(quizId), options);


export const useCreateQuiz = (options?: MutationOptions) => MutationFactory('Create Quiz', endpoints.quizes, 'POST', options)
export const useCreateQuestion = (id: string, options?: MutationOptions) => MutationFactory('Create Question', endpoints.quizQuestions(id), 'POST', options)

export const useUpdateQuiz = (id: string, options?: MutationOptions) => MutationFactory('Update Quiz', endpoints.quizes + id, 'PATCH', options)
export const useUpdateQuestion = (quizId: string, questionId: string, options?: MutationOptions) => MutationFactory('Update Question', endpoints.quizQuestionById(quizId, questionId), 'PATCH', options)

export const useDeleteQuestion = (quizId: string, questionId: string, options?: MutationOptions) => DeleteMutationFactory('Delete Question', endpoints.quizQuestionById(quizId, questionId), options)
export const useDeleteQuiz = (quizId: string, options?: MutationOptions) => DeleteMutationFactory('Delete Question', endpoints.quizById(quizId), options)
