import React from 'react';
import { useState, useContext } from 'react';
import { styles } from './styles'
import { View, Text, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { compose } from 'recompose';
import { Formik } from 'formik';
import { handleTextInput, withNextInputAutoFocusInput, withNextInputAutoFocusForm } from 'react-native-formik';

import { AuthNavProps } from '../../common/ultis/ParamLists/AuthParamList';

import { LoginSchema } from '../../common/ultis/YupValidation'
import { AuthContext } from '../../Providers/AuthProvider';

const Input: any = compose(handleTextInput, withNextInputAutoFocusInput)(TextInput);
const Form = withNextInputAutoFocusForm(View);

interface FormValues {
    email: string;
    password: string;
}
function CxDevxLogin({
    // testFunc
}) {
    const { login, errors } = useContext(AuthContext);
    const [formValues, setForm] = useState<FormValues | null>({
        email: '',
        password: '',
    });

    return (
        <View style={styles.body}>
            <View style={styles.brandField}>
                {/* <Text style={styles.brandText} testID="loginPageBrand">DevX</Text> */}
                <Image source={require('../../asset/blackDevX.png')} />

            </View>
            <Formik
                validationSchema={LoginSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={(FormValues) => {
                    // console.log("In Login")
                    setForm({ ...FormValues });
                    // testFunc(FormValues.email,FormValues.password)                              //unit test function
                    login(FormValues.email, FormValues.password);
                }}>
                {(FormikProps: any) => {
                    return (
                        <Form testID="formId" style={styles.contextField}>
                            <Input
                                placeholder="Email"
                                name="email"
                                type="email"
                                testID="emailId"
                                style={
                                    FormikProps.errors.email &&
                                        FormikProps.touched.email
                                        ? styles.inputFieldInvalid
                                        : styles.inputField
                                }
                            />
                            {FormikProps.touched.email &&
                                FormikProps.errors.email ? (
                                    <Text testID="emailErr" style={styles.invalid}>
                                        {FormikProps.errors.email}
                                    </Text>
                                ) : null}
                            <Input
                                placeholder="Password"
                                name="password"
                                type="password"
                                testID="passwordId"
                                style={
                                    FormikProps.errors.password &&
                                        FormikProps.touched.password
                                        ? styles.inputFieldInvalid
                                        : styles.inputField
                                }
                            />
                            {FormikProps.touched.password &&
                                FormikProps.errors.password ? (
                                    <Text testID="passwordErr" style={styles.invalid}>
                                        {FormikProps.errors.password}
                                    </Text>
                                ) : null}
                            {!errors ? null :
                                <Text testID="authErrId" style={styles.invalid}>{errors}</Text>}
                            <TouchableOpacity
                                onPress={FormikProps.handleSubmit}
                                testID="loginBtn"
                                style={styles.btn}>
                                <Text testID="loginBtnTxt" style={styles.btnText}>Login</Text>
                            </TouchableOpacity>
                        </Form>
                    );
                }}
            </Formik>
        </View>
    );
};


export default CxDevxLogin;
