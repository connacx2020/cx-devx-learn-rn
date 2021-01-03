import styled from 'styled-components';
import { ThemeStyle } from '../../../models';

export const CxStyCard = styled.View`
        border-radius: 5;
        width: 320;
        elevation: 5;
        background: ${({ theme }: { theme: ThemeStyle }) => theme.color.primary};
        shadowOpacity: 0.5;
        shadowRadius: 5;
`; 