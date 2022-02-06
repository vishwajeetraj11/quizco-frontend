export const baseURL = 'http://localhost:3001/api/v1';

export const endpoints = {
    quizes: `${baseURL}/quizes/`,
    quizById: (id: string) => `${baseURL}/quizes/${id}/`,
    quizQuestions: (id: string) => `${baseURL}/quizes/${id}/questions`,
    quizQuestionById: (quizId: string, questionId: string) => `${baseURL}/quizes/${quizId}/questions/${questionId}`,
    quizQuestionsCorrectAns: (quizId: string) => `${baseURL}/quizes/${quizId}/questions/correct`
}