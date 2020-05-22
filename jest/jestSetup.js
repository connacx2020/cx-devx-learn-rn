import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => 'TouchableOpacity');
jest.mock('react-native-star-rating/StarRating',()=>'StarRating');
jest.mock('react-native-snap-carousel/src/carousel/Carousel',()=>'Carousel');

