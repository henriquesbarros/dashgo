import { useQuery } from "react-query"; // utilizado para fazer as requisições p/ API

import { api } from "../api";

type User = {
	id: string;
	name: string;
	email: string;
	createdAt: string;
};

type GetUsersResponse = {
	users: User[];
	totalCount: number;
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
	const { data, headers } = await api.get('users', {
		params: {
			page,
		}
	});

	const totalCount = Number(headers['x-total-count']);

	const users = data.users.map(({ id, name, email, createdAt }) => {
		return {
			id,
			name,
			email,
			createdAt: new Date(createdAt).toLocaleDateString('pt-br', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})
		}
	});

	return {
		users,
		totalCount
	}
}

export function useUsers(page: number) {
	return useQuery(['users', page], () => getUsers(page), {
		staleTime: 1000 * 60 * 10,
	});
}