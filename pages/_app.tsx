import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { EditFilmContext } from '../context/edit-film.context';
import DashboardLayout from '../layouts/dashboard';
import createEmotionCache from '../src/createEmotionCache';
import theme from '../src/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
	const [openEditModal, setOpenEditModal] = React.useState(false);

	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;
	return (
		<EditFilmContext.Provider value={{ openEditModal, setOpenEditModal }}>
			<CacheProvider value={emotionCache}>
				<Head>
					<title>My page</title>
					<meta
						name='viewport'
						content='initial-scale=1, width=device-width'
					/>
				</Head>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<DashboardLayout>
						<Component {...pageProps} />
					</DashboardLayout>
				</ThemeProvider>
			</CacheProvider>
		</EditFilmContext.Provider>
	);
}
