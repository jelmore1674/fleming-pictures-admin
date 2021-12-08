import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import TvIcon from '@mui/icons-material/Tv';
import WebIcon from '@mui/icons-material/Web';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import NextLink from 'next/link';
import * as React from 'react';

export const mainListItems = (
	<div>
		<NextLink href='/dashboard'>
			<ListItem button>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>

				<ListItemText primary='Dashboard' />
			</ListItem>
		</NextLink>
		<NextLink href='/dashboard/films'>
			<ListItem button>
				<ListItemIcon>
					<GroupWorkIcon />
				</ListItemIcon>
				<ListItemText primary='Films' />
			</ListItem>
		</NextLink>
		<NextLink href='/dashboard/series'>
			<ListItem button>
				<ListItemIcon>
					<TvIcon />
				</ListItemIcon>
				<ListItemText primary='Series' />
			</ListItem>
		</NextLink>
		<NextLink href='/dashboard/edit-site'>
			<ListItem button>
				<ListItemIcon>
					<WebIcon />
				</ListItemIcon>
				<ListItemText primary='Edit Site' />
			</ListItem>
		</NextLink>
	</div>
);

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Saved reports</ListSubheader>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Current month' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Last quarter' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Year-end sale' />
		</ListItem>
	</div>
);
