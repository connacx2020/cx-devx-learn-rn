import React from 'react';
import { useState,useContext } from 'react';
import { styles } from './styles'
import { View,Text,TextInput,TouchableOpacity } from 'react-native';
import { compose } from 'recompose';
import { Formik, FormikProps } from 'formik';
import { handleTextInput,withNextInputAutoFocusInput,withNextInputAutoFocusForm } from 'react-native-formik';

import { AuthNavProps } from 'src/ultis/ParamLists/AuthParamList';

import { LoginSchema } from '../../ultis/YupValidation'
import { AuthContext } from '../../Providers/AuthProvider';

const Input = compose(handleTextInput, withNextInputAutoFocusInput)(TextInput);
const Form = withNextInputAutoFocusForm(View);

interface FormValues {
    email: string;
    password: string;
}
function CxDevxLogin({ navigation }: AuthNavProps<"Login">) {
    const { login,errors } = useContext(AuthContext);
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
                    console.log("In Login")
                    setForm({...FormValues});
                    login(FormValues.email,FormValues.password );
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
                            { !errors? null : <Text style={styles.invalid}>{errors}</Text> }
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
