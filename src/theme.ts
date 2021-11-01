import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
	palette: {
		mode: 'dark',
	},
	typography: {
		fontFamily: ['Poppins', 'sans-serif'].join(','),
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
        @font-face {
          font-family: 'Poppins';

        `,
		},
	},
});

export default theme;
