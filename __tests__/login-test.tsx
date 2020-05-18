/**
 * @format
 */

import Enzyme, { shallow } from 'enzyme';
import Adapater from 'enzyme-adapter-react-16';
import CxDevxLogin from '../src/components/Login/login';
import React from 'react';

Enzyme.configure({ adapter: new Adapater() });

describe('Login page UI test', () => {
    let wrapper = shallow(<CxDevxLogin />);
    test('Contain header text', () => {
        expect(wrapper.find('[testID="loginPageBrand"]').props().children).toBe('Devx Learning');
    });
    test('Contain email text input', () => {
        expect(wrapper.find('Formik').dive().find('#email')).toHaveLength(1);
    });
    test('Contain password text input', () => {
        expect(wrapper.find('Formik').dive().find('#password')).toHaveLength(1);
    });
    test('Contain submit button', () => {
        expect(wrapper.find('Formik').dive().find('[testID="loginBtn"]')).toHaveLength(1);
    });
    test('Submit button text is Login', () => {
        expect(wrapper.find('Formik').dive().find('[testID="loginBtnTxt"]').props().children).toBe('Login');
    });
});





