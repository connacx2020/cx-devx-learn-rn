import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Required').email('Invalid email'),
    password: Yup.string()
        .min(3, 'At least 5 characters')
        .max(16, 'At most 16 characters')
        .required('Required'),
});
