import { ThemeStyle } from 'src/models';
import styled from 'styled-components';

export const CxStyTouchableOpacity = styled.TouchableOpacity`
  /* background: ${({ theme }: { theme: ThemeStyle }) => theme.color.secondary}; */
   padding: 10px 20px;
   /* width: 95px; */
   border-radius: 5px;
`;
