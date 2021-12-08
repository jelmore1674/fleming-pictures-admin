import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';
import ReactPlayer from 'react-player';
import { getAllFilmIds, getFilmById } from '../../../helpers/filterFilms';
import { supabase } from '../../../utils/supabaseClient';

const Input = styled('input')({
	display: 'none',
});

const EditPage = ({ film }: any) => {
	const [video, setVideo] = React.useState('film.trailer');
	const [featuredUpload, setFeaturedUpload] = React.useState<any>('');
	const [featuredImg, setFeaturedImg] = React.useState<any>(film.featuredImg);

	React.useEffect(() => {
		film ? setVideo(film.trailer) : setVideo('film.trailer');
	}, [film]);

	if (!film) {
		return <h1>...loading</h1>;
	}

	const handleImageChange = (e: any) => {
		if (e.target.id === 'featuredImg') {
			if (e.target.files) {
				const file = e.target.files[0];
				setFeaturedUpload(file);
				if (file) {
					const reader = new FileReader();
					reader.onload = (e) => {
						if (e.target) {
							setFeaturedImg(e.target.result);
						}
					};
					reader.readAsDataURL(file);
				} else {
					return null;
				}
			}
		}
	};

	const onUpload = (path: any) => {
		console.log('Uploading ' + path);
	};

	const handleSubmit = async () => {
		const file = featuredUpload;
		const fileExt = file.name.split('.').pop();
		const fileName = `${Date.now()}.${fileExt}`;
		const filePath = `featuredImage/${fileName}`;

		const shortenURL = film.featuredImg.split('/');

		const supabaseFilePath = `${shortenURL[shortenURL.length - 2]}/${
			shortenURL[shortenURL.length - 1]
		}`;
		console.log(supabaseFilePath);
		const { data, error: deleteError } = await supabase.storage
			.from('test')
			.remove([supabaseFilePath]);
		if (data) {
			console.log('File deleted');
		}
		if (deleteError) {
			console.log('Error deleting file');
		}

		let { error: uploadError } = await supabase.storage
			.from('test')
			.upload(filePath, file);
		if (uploadError) {
			throw uploadError;
		}

		const { publicURL } = supabase.storage
			.from('test')
			.getPublicUrl(filePath);
		console.log(publicURL);

		await supabase
			.from('films')
			.update({
				featuredImg: publicURL,
			})
			.eq('id', film.id);

		Router.reload();

		onUpload(filePath);
	};

	return (
		<>
			{film && (
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
					<TextField
						fullWidth
						id='outlined-multiline-static'
						label='Cast'
						multiline
						style={{ marginBottom: '2rem' }}
						maxRows={6}
						defaultValue={film.cast}
					/>
					<TextField
						fullWidth
						id='outlined-multiline-static'
						label='Release Year'
						multiline
						style={{ marginBottom: '2rem' }}
						maxRows={6}
						defaultValue={`${film.releaseYear}`}
					/>
					<div>
						<Typography mt={2} mb={2} variant='h5' component='h3'>
							Featured Image
						</Typography>
						<div
							style={{ marginBottom: '1rem', maxWidth: '600px' }}>
							<Image
								src={featuredImg}
								alt={film.title}
								width='960'
								height='540'
								layout='responsive'
							/>
						</div>
						<label
							htmlFor='featuredImg'
							style={{ marginTop: '1rem', marginBottom: '1rem' }}>
							<Input
								accept='image/*'
								id='featuredImg'
								multiple
								type='file'
								onChange={(e) => {
									handleImageChange(e);
								}}
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
						<div
							style={{ marginBottom: '1rem', marginTop: '1rem' }}>
							<Image
								src={`/assets/images/${film.posterImg}`}
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
					<TextField
						fullWidth
						id='trailer'
						label='Trailer'
						style={{
							marginTop: '3rem',
							marginBottom: '3rem',
						}}
						variant='outlined'
						defaultValue={film.trailer}
						onChange={(e) => setVideo(e.target.value)}
					/>
					<ReactPlayer url={video} controls />
					<Button
						variant='contained'
						color='primary'
						onClick={handleSubmit}>
						Submit
					</Button>
				</>
			)}
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
	const film = await getFilmById(parseInt(params.id));

	return {
		props: {
			film,
		},
	};
};

export async function getStaticPaths() {
	const data = await getAllFilmIds();
	const paths = data.map((film: any) => ({
		params: {
			id: `${film.id}`,
		},
	}));

	return {
		paths,
		fallback: false,
	};
}

export default EditPage;
