export interface Film {
	id: number;
	title: string;
	featuredImg: string;
	posterImg: string;
	trailer: string;
	sypnosis: string;
}

export const InitialFilms: Film[] = [
	{
		id: 1,
		title: 'The Chronus',
		featuredImg: '/assets/images/chronus1920x1080.png',
		posterImg: '/assets/images/chronos2x3.png',
		trailer: '/assets/clips/trailer.mp4',
		sypnosis:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		id: 2,
		title: 'Another Film',
		featuredImg: '/assets/images/featured2.png',
		posterImg: '/assets/images/poster2.png',
		trailer: 'https://www.youtube.com/watch?v=GOysW6WYWoE',
		sypnosis:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
];

export function getFilmById(id: any): any {
	return InitialFilms.find((film) => film.id == id);
}
