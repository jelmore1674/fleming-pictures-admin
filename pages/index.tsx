import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import SignIn from '../components/signin/signin';

const Home: NextPage = () => {
	return (
		<div className='center'>
			<SignIn />
			<style jsx>
				{`
					.center {
						height: 100vh;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				`}
			</style>
		</div>
	);
};

export default Home;
