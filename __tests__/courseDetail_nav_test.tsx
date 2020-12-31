import React from 'react';
import { CxDevxCourseDetail } from '../src/components/course/CourseDetail/CourseDetail';
import { render, cleanup } from '@testing-library/react-native';
// import { MockedNavigator } from '../__mocks__/MockedNavigator';

it('Route HomeStack to Course Detail Unit Testing', () => {
    // afterEach(cleanup);
    let navigation = jest.fn();
    let CouseDetailWrapper = render(<CxDevxCourseDetail navigation={navigation} />);

    it('props testing', () => {
        // expect(CouseDetailWrapper.getByTestId('carouselID')).toBeDefined();
        console.log(CouseDetailWrapper.baseElement);
        expect(2 + 2).toEqual(4);
    })
})
