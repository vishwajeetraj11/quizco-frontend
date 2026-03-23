export const errorMessages = {
    default: 'Something went wrong, please try again later.',
    notFound: (resource?: string) => `${resource || 'Resource'} not found.`,
    auth403: `You do not have the permission to do this action.`,
}

export const globalColors = {
    brand: '#0f766e',
    red: '#e11d48'
}

export const agentAdminEmail = 'vishwajeetraj11@gmail.com';

type TactionSuccess =
    | 'Updated'
    | 'Deleted'
    | 'Created';

type TactionLoading =
    | 'Updating'
    | 'Deleting'
    | 'Creating';

type TResource = 'Question' | 'Quiz'

export const successMessages = {
    actionSuccess: (action: TactionSuccess, resource?: TResource) =>
        `Successfully ${action} ${resource || 'resource'}`,
}

export const loadingMessages = {
    actionLoading: (action: TactionLoading, resource?: TResource) =>
        `${action} ${resource || 'resource'}`,
}

export const emptyResponseMessages = {
    attempt: ['You have not attempted any quizes yet.'],
    responses: ["You can only see responses to first attempt at any quiz."],
    dashboardQuizes: ['You have not created any quizes yet.'],
    quizQuestions: ['This quiz have no questions.'],
    mainQuizes: ['There are no active Quizes at the moment.', 'Go ahead make a Quiz.'],
    filteredQuizes: ['No active Quizes found with the given filters.'],
}

export const uiMessages = {
    allowedMarkingACorrectOption: ['* Marking a correct option is only allowed after you have already written all options.'],
    warnQuestionCreate: ['Note: Please be careful before creating a question because if you have to later edit it you will lose all responses to the question.', ' This is done so that we can provide you better and correct statistics.']
}

export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(720px, calc(100vw - 2rem))',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    overflow: 'auto',
    boxShadow: '0 28px 80px rgba(15, 23, 42, 0.16)',
    padding: '1.5rem 1.75rem',
    border: '1px solid rgba(255, 255, 255, 0.78)',
    borderRadius: '28px',
};
