export const errorMessages = {
    default: 'Something went wrong, please try again later.',
    notFound: (resource?: string) => `${resource || 'Resource'} not found.`,
    auth403: `You do not have the permission to do this action.`,
}

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
    dashboardQuizes: ['You have not created any quizes yet.'],
    quizQuestions: ['This quiz have no questions.'],
    mainQuizes: ['There are no active Quizes at the moment.', 'Go ahead make a Quiz.'],
}

export const allowedMarkingACorrectOption = '* Marking a correct option is only allowed after you have already written all options.'

export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    bgcolor: '#ffffff',
    overflow: 'auto',
    boxShadow: 24,
    padding: '1rem 2rem',
    border: 0,
    borderRadius: '6px',
};
