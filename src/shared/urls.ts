export const baseURL = 'http://localhost:3001/api/v1';

export const endpoints = {
    quizes: `${baseURL}/quizes/`,
    quizById: (id: string) => `${baseURL}/quizes/${id}/`,
}