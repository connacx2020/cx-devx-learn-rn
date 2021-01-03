import styled from 'styled-components';
import { ThemeStyle } from '../../../models';


export const CxStyTitle = styled.Text`
    font-size: 30px;
    color: ${({ theme }: { theme: ThemeStyle }) => theme.color.reversePrimary};
`;

export const CxStyText = styled.Text`
    color: ${({ theme }: { theme: ThemeStyle }) => theme.color.reversePrimary};
`;

export const CxButtonText = styled.Text`
    color: #fff;
`;
