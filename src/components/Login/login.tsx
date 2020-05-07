import React from 'react';
import { useState } from 'react';
import { styles } from './ultis/styles'
import { View,Text,TextInput,TouchableOpacity } from 'react-native';
import { compose } from 'recompose';
import { Formik, FormikProps } from 'formik';
import { handleTextInput,withNextInputAutoFocusInput,withNextInputAutoFocusForm } from 'react-native-formik';

import { LoginSchema } from './ultis/yupSchema'

const Input = compose(handleTextInput, withNextInputAutoFocusInput)(TextInput);
const Form = withNextInputAutoFocusForm(View);

interface FormValues {
    email: string;
    password: string;
}
const CxDevxLogin: React.FC<{}> = () => {
    const [formValues, setForm] = useState<FormValues | null>({
        email: '',
        password: '',
    });
    return (
        <View style={styles.body}>
            <View style={styles.brandField}>
                <Text style={styles.brandText}>Devx Learning</Text>
            </View>
            <Formik
                validationSchema={LoginSchema}
                initialValues={{email: '', password: ''}}
                onSubmit={(FormValues) => {
                    console.log(FormValues);
                    setForm({...FormValues});
                }}>
                {(FormikProps: any) => {
                    return (
                        <Form style={styles.contextField}>
                            <Input
                                placeholder="Email"
                                name="email"
                                type="email"
                                style={
                                    FormikProps.errors.email &&
                                    FormikProps.touched.email
                                        ? styles.inputFieldInvalid
                                        : styles.inputField
                                }
                            />
                            {FormikProps.touched.email &&
                            FormikProps.errors.email ? (
                                <Text style={styles.invalid}>
                                    {FormikProps.errors.email}
                                </Text>
                            ) : null}
                            <Input
                                placeholder="Password"
                                name="password"
                                type="password"
                                style={
                                    FormikProps.errors.password &&
                                    FormikProps.touched.password
                                        ? styles.inputFieldInvalid
                                        : styles.inputField
                                }
                            />
                            {FormikProps.touched.password &&
                            FormikProps.errors.password ? (
                                <Text style={styles.invalid}>
                                    {FormikProps.errors.password}
                                </Text>
                            ) : null}
                            <TouchableOpacity
                                onPress={FormikProps.handleSubmit}
                                style={styles.btn}>
                                <Text style={styles.btnText}>Login</Text>
                            </TouchableOpacity>
                        </Form>
                    );
                }}
            </Formik>
        </View>
    );
};


export default CxDevxLogin;
