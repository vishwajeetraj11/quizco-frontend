import * as Yup from 'yup';

export const AddEditQuizValidation = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    description: Yup.string().required('Description is required.'),
    tags: Yup.array().of(Yup.string()).min(1, 'At least one tag is required'),
});

export const AddEditQuestionValidation = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    correct: Yup.string().required('Correct Option is Required.'),
    options: Yup.array().of(
        Yup.object().shape({
            value: Yup.string().required('Required.'),
        })
    ),
})

export const FiltersValidation = Yup.object().shape({
    search: Yup.string().nullable(),
    tags: Yup.string().nullable(),
})