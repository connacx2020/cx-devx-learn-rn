import DevxSearch from '../src/components/Search/DevxSearch';
import { SearchItemCoverLeft } from '../src/components/SearchResultItem/CoverLeftItem';

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

describe('Search Page UI test',()=>{
    let wrapper = render(<DevxSearch/>);
    it('Must be inclue SearchInput and Array of FlatList',()=>{
        expect(wrapper.getByTestId('searchInput')).not.toBeNull();
        expect(wrapper.getByTestId('searchArrayList')).not.toBeNull();
    });
    it('Testing Search inputed value and search filter array for flatlist',()=>{
        const SearchInput = wrapper.getByTestId('searchInput')
        fireEvent.changeText(SearchInput, 'React Native');
        expect(SearchInput.props.value).toEqual('React Native');

        const listItems = ['GraphQL', 'RxJS', 'Nestjs', 'Nextjs', 'Reactjs', 'React Native', 'Neo4j', 'Microservices',"Angular","Typescript","React-Navigation-v5"];
        const filterResult =  [ 'Reactjs', 'React Native', 'React-Navigation-v5' ];

        fireEvent.changeText(SearchInput, 'React');
        const searchValue = SearchInput.props.value;
        const filtedArray = listItems.filter(function(item){
            return item.includes(searchValue);
        }).map((item)=>{
            return item
        });
        expect(filtedArray).toEqual(filterResult);
    });
    it('SearchItem unit test : Must inclue Title,Image,StarRating,Likes and enrolled',()=>{
        let wrapper = render(<SearchItemCoverLeft img="react native's img" title="react-native" rate={4.5} likes={520} enrolled={130}/>);
        expect(wrapper.getByTestId('titleID')).toBeDefined();
        expect(wrapper.getByTestId('likeID')).toBeDefined();
        expect(wrapper.getByTestId('enrolledID')).toBeDefined();
        expect(wrapper.getByTestId('imgID')).toBeDefined();
        expect(wrapper.getByTestId("star")).toBeDefined();

        expect(wrapper.getByTestId('titleID').props.children).toBe('react-native');
        expect(wrapper.getByTestId('likeID').props.children[0]).toEqual(520);
        expect(wrapper.getByTestId('enrolledID').props.children[0]).toEqual(130);
        expect(wrapper.getByTestId('imgID').props.source.uri).toEqual("react native's img");
        expect(wrapper.getByTestId("star").props.rating).toEqual(4.5);
    })
})