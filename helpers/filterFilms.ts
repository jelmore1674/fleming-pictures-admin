export interface Film {
	id: number;
	title: string;
	featuredImg: string;
	posterImg: string;
	trailer: string;
	releaseYear: number;
	sypnosis: string;
	cast: string;
}
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';

export const InitialFilms: Film[] = [
	{
		id: 1,
		title: 'The Chronus',
		featuredImg: '/assets/images/chronus1920x1080.png',
		posterImg: '/assets/images/chronos2x3.png',
		trailer: '/assets/clips/trailer.mp4',
		releaseYear: 2021,
		cast: '',
		sypnosis:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		id: 2,
		title: 'Another Film',
		featuredImg: '/assets/images/featured2.png',
		posterImg: '/assets/images/poster2.png',
		trailer: 'https://www.youtube.com/watch?v=GOysW6WYWoE',
		releaseYear: 2020,
		cast: '',
		sypnosis:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
];

export async function getFilmById(id: any): Promise<Film | PostgrestError> {
	const { data: film, error } = await supabase
		.from('films')
		.select('*')
		.eq('id', id);
	if (error) {
		return error;
	}
	return film[0];
}

export async function getAllFilmIds(): Promise<any> {
	const { data: films, error } = await supabase
		.from('films')
		.select('id')
		.order('id', { ascending: true });
	if (error) {
		return error;
	}
	return films;
}
