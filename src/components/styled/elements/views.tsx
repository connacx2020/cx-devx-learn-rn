import styled from 'styled-components/native';
import { ThemeStyle } from '../../../models';

export const CxStyMainView = styled.View`
    display: flex;
    flex-direction: column;
    background: ${({ theme }: { theme: ThemeStyle }) => theme.color.primary};
    flex:1;
`;

export const CxStyHView = styled(CxStyMainView)`
    display: flex;


`;
