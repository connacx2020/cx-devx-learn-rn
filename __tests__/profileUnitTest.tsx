
import { UserProfile } from '../src/components/Profile/UserProfile';
import { InstructorProfile } from '../src/components/Profile/InstructorProfile';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

describe('User and Instructor Profiles Unit Test',()=>{
    let userProfileWrapper = render(<UserProfile/>);
    let InstructorProfileWrapper = render(<InstructorProfile/>);
    
    it('User Profile : Must be include BGImage, back arrow, name, email,btn,avatar',()=>{
        expect(userProfileWrapper.getByTestId('bgID')).toBeDefined();
        expect(userProfileWrapper.getByTestId('iconID')).toBeDefined();
        expect(userProfileWrapper.getByTestId('avatarID')).toBeDefined();
        expect(userProfileWrapper.getByTestId('nameID')).toBeDefined();
        expect(userProfileWrapper.getByTestId("emailID")).toBeDefined();
        expect(userProfileWrapper.getByTestId("btnID")).toBeDefined();

        expect(userProfileWrapper.getByTestId('nameID').props.children).toEqual('Dr.Osk Soe Kyaw');
        expect(userProfileWrapper.getByTestId('emailID').props.children).toEqual('dr.osksoekyaw@gmail.com');
    });

    it('Instructor Profile:  Must be include BGImage, back arrow, name, email, 2 btn,avatar and three social icons',()=>{
        expect(InstructorProfileWrapper.getByTestId('bgID')).toBeDefined();
        expect(InstructorProfileWrapper.getByTestId('iconID')).toBeDefined();
        expect(InstructorProfileWrapper.getByTestId('avatarID')).toBeDefined();
        expect(InstructorProfileWrapper.getByTestId('nameID')).toBeDefined();
        expect(InstructorProfileWrapper.getByTestId("emailID")).toBeDefined();
        expect(InstructorProfileWrapper.getByTestId('connectBtnID')).toBeDefined();
        expect(InstructorProfileWrapper.getByTestId('followBtnID')).toBeDefined();
        expect(InstructorProfileWrapper.getByTestId('githubImgBtnID')).toBeDefined();
        expect(InstructorProfileWrapper.getByTestId('fbImgBtnID')).toBeDefined();
        expect(InstructorProfileWrapper.getByTestId("linkedInImgBtnID")).toBeDefined();
        expect(InstructorProfileWrapper.getByTestId('aboutID')).toBeDefined();
        expect(InstructorProfileWrapper.getByTestId("aboutContentID")).toBeDefined();
        expect(InstructorProfileWrapper.getByTestId('flatListID')).toBeDefined();

        expect(InstructorProfileWrapper.getByTestId('nameID').props.children).toEqual('Dr.Osk Soe Kyaw');
        expect(InstructorProfileWrapper.getByTestId('emailID').props.children).toEqual('dr.osksoekyaw@gmail.com');
        expect(InstructorProfileWrapper.getByTestId('aboutID').props.children).toEqual('About');

    });


})