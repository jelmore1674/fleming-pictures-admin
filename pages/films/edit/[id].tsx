import { useRouter } from 'next/router';
import { getFilmById } from '../../../helpers/filterFilms';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { NextPage } from 'next';
import { styled } from '@mui/material/styles';
import ReactPlayer from 'react-player';
import React from 'react';
import { Film } from '../../dashboard/films';

const Input = styled('input')({
	display: 'none',
});

const EditPage: NextPage = () => {
	const router = useRouter();
	const id = router.query.id;
	const film: Film = getFilmById(id);
	const [video, setVideo] = React.useState('film.trailer');

	React.useEffect(() => {
		film ? setVideo(film.trailer) : setVideo('film.trailer');
	}, [film]);

	if (!film) {
		return <h1>...loading</h1>;
	}

	return (
		<>
			<Typography
				id='modal-modal-title'
				mb={2}
				variant='h3'
				component='h2'>
				Edit Film
			</Typography>
			<TextField
				fullWidth
				id='title'
				label='Title'
				style={{ marginBottom: '2rem' }}
				variant='outlined'
				defaultValue={film.title}
			/>
			<TextField
				fullWidth
				id='outlined-multiline-static'
				label='Synopsis'
				multiline
				style={{ marginBottom: '2rem' }}
				maxRows={6}
				defaultValue={film.sypnosis}
			/>
			<div>
				<Typography mt={2} mb={2} variant='h5' component='h3'>
					Featured Image
				</Typography>
				<div style={{ marginBottom: '1rem', maxWidth: '600px' }}>
					<Image
						src={film.featuredImg}
						alt={film.title}
						width='960'
						height='540'
						layout='responsive'
					/>
				</div>
				<label
					htmlFor='contained-button-file'
					style={{ marginTop: '1rem', marginBottom: '1rem' }}>
					<Input
						accept='image/*'
						id='contained-button-file'
						multiple
						type='file'
					/>
					<Button variant='contained' component='span'>
						Upload Featured Image (Must Be 1920x1080)
					</Button>
				</label>
			</div>
			<div>
				<Typography mt={2} mb={2} variant='h5' component='h3'>
					Featured Image
				</Typography>
				<div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
					<Image
						src={film.posterImg}
						alt={film.title}
						width='225'
						height='350'
					/>
				</div>
				<label htmlFor='contained-button-file'>
					<Input
						accept='image/*'
						id='contained-button-file'
						multiple
						type='file'
					/>
					<Button variant='contained' component='span'>
						Upload Featured Image (Must Be 223x333)
					</Button>
				</label>
			</div>
			<div
				style={{
					marginTop: '2rem',
					display: 'flex',
				}}>
				<ReactPlayer url={video} controls />
				<div style={{ maxWidth: '75ch' }}>
					<TextField
						fullWidth
						id='trailer'
						label='Trailer'
						style={{
							marginTop: '2rem',
							marginBottom: '2rem',
							margin: '3rem',
						}}
						variant='outlined'
						defaultValue={film.trailer}
						onChange={(e) => setVideo(e.target.value)}
					/>
				</div>
			</div>
		</>
	);
};

export default EditPage;
