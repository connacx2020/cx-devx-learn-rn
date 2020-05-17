/**
 * @format
 */

import App from '../App';
import Enzyme, { shallow } from 'enzyme';
import Adapater from 'enzyme-adapter-react-16';
import React from 'react';

import CxDevxLogin from '../src/components/Login/login';
import CT from '../src/components/CT';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

Enzyme.configure({ adapter: new Adapater() });

// describe('test 1', () => {
//     let wrapper = shallow(<CT />);
//     it('red btn pressed', () => {
//         wrapper.find('#red').simulate('press');
//         expect(wrapper.state().name).toBe('tkyi');
//     });
//     it('green btn pressed', () => {
//         wrapper.find('#green').simulate('press');
//         expect(wrapper.state().name).toBe('gg');
//     });

// })

describe.only('Login page UI test', () => {
    let wrapper = shallow(<CxDevxLogin />);
    test('Is contain Email and Password inputs and one submit button', () => {
        // console.log(wrapper.find('Formik').length, wrapper.find('Formik').props().validationSchema);
        console.log(wrapper.find('Formik').dive().find('input').html());
        expect(wrapper.find('Formik').dive().find('#email')).toHaveLength(1)
        expect(wrapper.find('Formik').dive().find('#password')).toHaveLength(1)
        expect(wrapper.find('Formik').dive().find('#loginBtn')).toHaveLength(1)
    })
});



