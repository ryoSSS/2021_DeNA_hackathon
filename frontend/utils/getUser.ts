import path from "path";
import type { User } from "../models";

type Response = {
	data?: User;
	error: boolean;
};

// [GET] /users/:user_id
async function getUser(userId: number): Promise<Response> {
	const res = await fetch(
		path.join(process.env["API_DOMAIN"], "users", userId.toString())
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
