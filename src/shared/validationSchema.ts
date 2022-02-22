import * as Yup from 'yup';

export const AddEditQuizValidation = Yup.object().shape({
    title: Yup.string().required('Title is required.').matches(/[^\s*].*[^\s*]/g, '* This field cannot contain only blankspaces'),
    description: Yup.string().required('Description is required.').matches(/[^\s*].*[^\s*]/g, '* This field cannot contain only blankspaces'),
    tags: Yup.array().of(Yup.string()).min(1, 'At least one tag is required'),
});

export const AddEditQuestionValidation = Yup.object().shape({
    title: Yup.string().required('Title is required.').matches(/[^\s*].*[^\s*]/g, '* This field cannot contain only blankspaces'),
    correct: Yup.string().required('Correct Option is Required.'),
    options: Yup.array().of(
        Yup.object().shape({
            value: Yup.string().required('Required.').matches(/[^\s*].*[^\s*]/g, '* This field cannot contain only blankspaces'),
        })
    ),
})

export const FiltersValidation = Yup.object().shape({
    search: Yup.string().nullable().matches(/[^\s*].*[^\s*]/g, '* This field cannot contain only blankspaces'),
    tags: Yup.string().nullable().matches(/[^\s*].*[^\s*]/g, '* This field cannot contain only blankspaces'),
})