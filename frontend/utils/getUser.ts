import type { User } from "../models";

type Response = {
	data?: User;
	error: boolean;
};

// [GET] /users/:user_id
async function getUser(userId: number): Promise<Response> {
	const res = await fetch(
		`${process.env["NEXT_PUBLIC_API_DOMAIN"]}/users/${userId.toString()}`
	);
	const data: User = await res.json();

	if (!res.ok) {
		return {
			error: true,
		};
	}

	return {
		data,
		error: false,
	};
}

export default getUser;
