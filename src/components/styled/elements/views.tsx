import styled from 'styled-components/native';
import { ThemeStyle } from '../../../models';

export const CxStyMainView = styled.View`
    display: flex;
    flex-direction: column;
    background: ${({ theme }: { theme: ThemeStyle }) => theme.color.primary};
    flex:1;
`;

const getAlignmentStyle = (alignmentType: string) => {
    let alignmentStyle = 'flex-start';
    switch (alignmentType) {
        case 'between':
            alignmentStyle = 'space-between';
            break;
        case 'center':
            alignmentStyle = 'center';
            break;
        case 'evenly':
            alignmentStyle = 'space-evenly';
            break;
        case 'end':
            alignmentStyle = 'flex-end';
            break;
        default:
            alignmentStyle = 'flex-start';
            break;
    }
    return alignmentStyle;
};

export const CxStyHView = styled(CxStyMainView)`
    display: flex;
    flex-direction: row;
    align-items: ${(props) => getAlignmentStyle(props.alignType)};
    justify-content: ${(props) => getAlignmentStyle(props.justifyType)};
    flex:1;
    marginVertical: 10;
    marginHorizontal: 10;
`;
export const CxStyVView = styled(CxStyMainView)`
    display: flex;
    flex-direction: column;
    align-items: ${(props) => getAlignmentStyle(props.alignType)};
    justify-content: ${(props) => getAlignmentStyle(props.justifyType)};
    height: 30;
`;
