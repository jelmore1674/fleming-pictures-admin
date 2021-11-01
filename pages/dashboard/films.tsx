import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Title from '../../components/title';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Tooltip from '@mui/material/Tooltip';
import NextLink from 'next/link';
import { Checkbox } from '@mui/material';
import Head from 'next/head';

export interface Film {
	id: number;
	title: string;
	featuredImg: string;
	posterImg: string;
	trailer: string;
	sypnosis: string;
	isFeatured: boolean;
}

// Generate initial Films
const initialFilms: Film[] = [
	{
		id: 1,
		title: 'The Chronus',
		featuredImg: '/assets/images/chronus1920x1080.png',
		posterImg: '/assets/images/chronos2x3.png',
		trailer: '/assets/clips/trailer.mp4',
		sypnosis:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		isFeatured: true,
	},
	{
		id: 2,
		title: 'Another Film',
		featuredImg: '/assets/images/featured2.png',
		posterImg: '/assets/images/poster2.png',
		trailer: 'https://www.youtube.com/watch?v=GOysW6WYWoE',
		sypnosis:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		isFeatured: false,
	},
];

// Prevent event default behavior
function preventDefault(event: React.MouseEvent) {
	event.preventDefault();
}

export default function FilmTable() {
	const [featuredFilms, setFeaturedFilms] = React.useState(initialFilms);

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		'&:nth-of-type(even)': {
			backgroundColor: theme.palette.action.hover,
		},
		// hide last border
		'&:last-child td, &:last-child th': {
			border: 0,
		},
	}));

	function handleChangeFeatured(film: Film) {
		if (film.isFeatured) {
			film.isFeatured = false;
		} else {
			film.isFeatured = true;
		}
		console.log(film);
	}

	const handleDeleteFilm = (film: Film) => {
		const newFilms = featuredFilms.filter((f) => f.id !== film.id);
		setFeaturedFilms(newFilms);
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
					{featuredFilms.map((row) => (
						<>
							<StyledTableRow key={row.id}>
								<TableCell>
									<Image
										alt={row.title}
										src={row.featuredImg}
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
									<NextLink href={`/films/edit/${row.id}`}>
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
			<Link
				color='primary'
				href='#'
				onClick={preventDefault}
				sx={{ mt: 3 }}>
				See more orders
			</Link>
		</React.Fragment>
	);
}
