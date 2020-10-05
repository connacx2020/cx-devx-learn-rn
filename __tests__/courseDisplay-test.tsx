import React from 'react';
import { render, fireEvent, wait, act } from '@testing-library/react-native';
import { CxDevxCourseItem } from '../src/components/course/CourseItem/CourseItem';
import CxDevxFeed from '../src/components/Feed/Feed';
import { string } from 'yup';


describe("Course's Item UI test", () => {
    let routeToCourseDetail = jest.fn();
    let courseItemWrapper = render(<CxDevxCourseItem img="image" title="Apollo Server Express Tutorial" likes={1500} rate={4} routeToCourseDetail={routeToCourseDetail} />);
    it('Must include Title, Image ,StarRating, Rate and Likes , routeFunction props', () => {

        expect(courseItemWrapper.getByTestId('titleID').props.children).toBe('Apollo Server Express Tutorial');
        expect(courseItemWrapper.getByTestId('likeID').props.children[0]).toEqual(1500);
        expect(courseItemWrapper.getByTestId('rateID').props.children).toEqual(4);
        expect(courseItemWrapper.getByTestId('imgID').props.source.uri).toEqual("image");
        expect(courseItemWrapper.getByTestId("star").props.rating).toEqual(4);
    });

});

describe("Course Display Page UI Testing", () => {
    const courseData = [
        {
            img: "https://miro.medium.com/max/1400/1*uvd7Z4npUG8qulaQLjHcZw.jpeg",
            title: "GraphQL Advanced Course",
            rate: 4.5,
            likes: 1000
        },
        {
            img: "https://miro.medium.com/max/2880/1*xcDT-neKHP7E3quS9n30gw.png",
            title: "React Hooks Course",
            rate: 5,
            likes: 1500
        },
        {
            img: "https://railsware.com/blog/wp-content/uploads/2018/09/2400%D1%851260-rw-blog-node-js.png",
            title: "Nodejs Advanced Course",
            rate: 4,
            likes: 784
        },
        {
            img: "https://i.ytimg.com/vi/OdU9H-_d14Y/maxresdefault.jpg",
            title: "React Native With Typescript",
            rate: 4,
            likes: 1000
        },
        {
            img: "https://dist.neo4j.com/wp-content/uploads/20170524234854/graph-ql-graph-database-neo4j-integration.png",
            title: "GraphQL with Neo4j  Course",
            rate: 5,
            likes: 1000
        }

    ];
    let navigation = jest.fn();
    let FeedWrapper = render(<CxDevxFeed navigation={navigation} />);
    // console.log(FeedWrapper.debug());
    expect(FeedWrapper.getByTestId('carouselID')).toBeDefined();
    expect(FeedWrapper.getByTestId('carouselID').props.data).toMatchSnapshot(courseData);
})
