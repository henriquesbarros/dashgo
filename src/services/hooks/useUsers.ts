import { useQuery } from "react-query"; // utilizado para fazer as requisições p/ API

import { api } from "../api";

type User = {
	id: string;
	name: string;
	email: string;
	createdAt: string;
};

export async function getUsers(): Promise<User[]> {
	const { data } = await api.get('users');

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

	return users
}

export function useUsers() {
	return useQuery('users', getUsers, {
		staleTime: 1000 * 5, // 5 seconds
	});
}