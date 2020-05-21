/**
 * @format
 */

import CxDevxLogin from '../src/components/Login/login';
import React from 'react';
import { render, fireEvent, wait, act } from '@testing-library/react-native';

async function login(email: string, password: string) {
    return new Promise(( resolve, reject ) => {
        if (email === "bryyan.mk@gmail.com" && password === "minkhant") {
            resolve('success')
        } else {
            reject('Incorrect Email or Password');
        }
    })
}

describe('Login page UI test', () => {
    let mockLoginFunc = jest.fn(login);
    let wrapper = render(<CxDevxLogin testFunc={mockLoginFunc} />);

    // console.log(wrapper.debug())
    test('Must include header text,email,password and login button ', () => {
        expect(wrapper.getByTestId("loginPageBrand").props.children).toBe('Devx Learning');
        expect(wrapper.getByTestId('emailId')).not.toBeNull();
        expect(wrapper.getByTestId('passwordId')).not.toBeNull();
        expect(wrapper.getByTestId('loginBtn')).not.toBeNull();
    });
    test('Press submit button with empty email and password will show Required validation', async () => {
        let loginBtn = wrapper.getByTestId('loginBtn');
        act(() => {
            fireEvent.press(loginBtn);
        });
        await wait(() => expect(wrapper.queryByTestId('emailErr')?.children[0]).toBe('Required'))
        await wait(() => expect(wrapper.queryByTestId('passwordErr')?.children[0]).toBe('Required'))
    });

    test('Press submit button with wrong email and password will show invalid validation', async () => {
        let loginBtn = wrapper.getByTestId('loginBtn');
        act(() => {
            fireEvent.changeText(wrapper.getByTestId('emailId'), 'MKtk');
            fireEvent.changeText(wrapper.getByTestId('passwordId'), 'MKtk');
        });

        await wait(() => fireEvent.press(loginBtn))
        await wait(() => expect(wrapper.queryByTestId('emailErr')?.children[0]).toBe('Invalid email'))
        await wait(() => expect(wrapper.queryByTestId('passwordErr')?.children[0]).toBe('At least 5 characters'))
    });

    test('Check authentication error after submit', async () => {
        let loginBtn = wrapper.getByTestId('loginBtn');
        act(() => {
            fireEvent.changeText(wrapper.getByTestId('emailId'), 'bryyan.mk@gmail.co');
            fireEvent.changeText(wrapper.getByTestId('passwordId'), 'minkhan');
        });

        act(() => { fireEvent.press(loginBtn) });
        await wait(() => expect(wrapper.queryByTestId('emailErr')).toBeNull());
        await wait(() => expect(wrapper.queryByTestId('passwordErr')).toBeNull());
        await wait(async() => await expect( mockLoginFunc.mock.results[0].value).rejects.toEqual('Incorrect Email or Password'));
    });

    test('Press submit button with correct email and password will pass login', async () => {
        let loginBtn = wrapper.getByTestId('loginBtn');
        act(() => {
            fireEvent.changeText(wrapper.getByTestId('emailId'), 'bryyan.mk@gmail.com');
            fireEvent.changeText(wrapper.getByTestId('passwordId'), 'minkhant');
        });

        act(() => { fireEvent.press(loginBtn) });
        await wait(() => expect(wrapper.queryByTestId('emailErr')).toBeNull());
        await wait(() => expect(wrapper.queryByTestId('passwordErr')).toBeNull());
        await wait(async() =>  expect(await mockLoginFunc.mock.results[1].value).toEqual('success'));
    });
});





