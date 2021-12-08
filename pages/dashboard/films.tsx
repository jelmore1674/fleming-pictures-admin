import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Checkbox } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import * as React from 'react';
import Title from '../../components/title';
import { supabase } from '../../utils/supabaseClient';

export interface Film {
	id: number;
	title: string;
	featuredImg: string;
	cast: string;
	posterImg: string;
	trailer: string;
	sypnosis: string;
	releaseYear: number;
	isFeatured: boolean;
}

interface FilmsProps {
	films: Film[];
}

const initialFilms: Film[] = [];

// Prevent event default behavior

export default function FilmTable({ films }: FilmsProps) {
	const [featuredFilms, setFeaturedFilms] = React.useState(initialFilms);

	React.useEffect(() => {
		setFeaturedFilms(films);
	}, [films]);

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		'&:nth-of-type(even)': {
			backgroundColor: theme.palette.action.hover,
		},
		// hide last border
		'&:last-child td, &:last-child th': {
			border: 0,
		},
	}));

	async function handleChangeFeatured(film: Film) {
		await supabase
			.from<Film>('films')
			.update({ isFeatured: !film.isFeatured })
			.eq('id', film.id);
	}

	const handleDeleteFilm = async (film: Film) => {
		await supabase.from<Film>('films').delete().eq('id', film.id);
	};

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
			fontSize: 20,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 18,
		},
	}));

	function truncateString(str: string, num: number): string {
		if (str.length > num) {
			return str.slice(0, num) + '...';
		} else {
			return str;
		}
	}
	return (
		<React.Fragment>
			<Head>
				<title>Dashboard | Films</title>
			</Head>
			<Title>Films</Title>
			<Table>
				<TableHead>
					<TableRow>
						<StyledTableCell>Featured Image</StyledTableCell>
						<StyledTableCell>Title</StyledTableCell>
						<StyledTableCell>Sypnosis</StyledTableCell>
						<StyledTableCell>Featured</StyledTableCell>
						<StyledTableCell></StyledTableCell>
						<StyledTableCell></StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{featuredFilms &&
						featuredFilms.length &&
						featuredFilms.map((row) => (
							<>
								<StyledTableRow key={row.id}>
									<TableCell>
										<Image
											alt={row.title}
											src={`/assets/images/${row.featuredImg}`}
											width='1920'
											height='1080'
											layout='responsive'
										/>
									</TableCell>
									<TableCell>{row.title}</TableCell>
									<Tooltip title={row.sypnosis}>
										<TableCell>
											{truncateString(row.sypnosis, 50)}
										</TableCell>
									</Tooltip>
									<TableCell>
										{row.isFeatured ? (
											<Checkbox
												defaultChecked
												onChange={() =>
													handleChangeFeatured(row)
												}
											/>
										) : (
											<Checkbox
												onChange={() =>
													handleChangeFeatured(row)
												}
											/>
										)}
									</TableCell>
									<TableCell>
										<NextLink
											href={`/films/edit/${row.id}`}>
											<IconButton
												aria-label='edit'
												color='success'>
												<ModeEditIcon />
											</IconButton>
										</NextLink>
									</TableCell>
									<TableCell>
										<IconButton
											aria-label='delete'
											color='error'>
											<DeleteIcon
												onClick={() =>
													handleDeleteFilm(row)
												}
											/>
										</IconButton>
									</TableCell>
								</StyledTableRow>
							</>
						))}
				</TableBody>
			</Table>
		</React.Fragment>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const { data: films } = await supabase
		.from<Film>('films')
		.select('*')
		.order('id', { ascending: true });

	return {
		props: {
			films,
		},
	};
};
