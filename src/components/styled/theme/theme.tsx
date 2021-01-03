import { ThemeStyle } from '../../../models';

export const themeModes = ['light', 'dark'];

const themes: any = {
    light: {
        primary: '#FFF',
        reversePrimary: '#212121',
        secondary: '#1C86EE',
        tertiary: '#878585',
    },
    dark: {
        primary: '#212121',
        reversePrimary: '#FFF',
        secondary: '#1C86EE',
        tertiary: '#878585', // todo: choose proper color
    },
};

const theme = (mode: string = themeModes[0]): ThemeStyle => ({
    color: {
        primary: themes[mode].primary,
        reversePrimary: themes[mode].reversePrimary,
        secondary: themes[mode].secondary,
        tertiary: themes[mode].tertiary,
    },
});

export default theme;
