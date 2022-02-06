import * as Yup from 'yup';

export const AddEditQuizValidation = Yup.object().shape({
    title: Yup.string().required('Required.'),
    description: Yup.string().required('Required.'),
    tags: Yup.array().of(Yup.string()).min(1, 'At least one tag is required'),
});

export const AddEditQuestionValidation = Yup.object().shape({
    title: Yup.string().required('Required.'),
    correct: Yup.string().required('Required.'),
    options: Yup.array().of(
        Yup.object().shape({
            value: Yup.string().required('Required'),
        })
    ),
})