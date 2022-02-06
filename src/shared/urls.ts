export const baseURL = 'https://quizco.herokuapp.com';
// export const baseURL = 'http://localhost:3001/api/v1';

export const endpoints = {
    quizes: `${baseURL}/quizes/`,
    quizById: (id: string) => `${baseURL}/quizes/${id}/`,
    quizQuestions: (id: string) => `${baseURL}/quizes/${id}/questions`,
    quizQuestionById: (quizId: string, questionId: string) => `${baseURL}/quizes/${quizId}/questions/${questionId}`,
    quizQuestionsCorrectAns: (quizId: string) => `${baseURL}/quizes/${quizId}/questions/correct`,
    saveScore: (quizId: string) => `${baseURL}/quizes/${quizId}/attempts/save-score`,
    attempts: `${baseURL}/quizes/attempts`
}