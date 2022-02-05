import { useSession } from "@clerk/clerk-react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";
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

export const useQuizes = (options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory('Quizes', endpoints.quizes, options);
export const useQuiz = (id: string, options?: UseQueryOptions<any, AxiosError, any>) => QueryFactory(['Quiz', id], endpoints.quizById(id), options);