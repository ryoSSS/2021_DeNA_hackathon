import path from "path";
import type { User } from "../models";

type Body = Pick<User, "name" | "birthday">;

type Response = {
	data?: {
		userId: User["id"];
	};
	error: boolean;
};

// [POST] /users
async function createUser(name: string, birthday: string): Promise<Response> {
	const body: Body = { name, birthday };
	const res = await fetch(path.join(process.env["API_DOMAIN"], "users"), {
		method: "POST",
		body: JSON.stringify(body),
	});
	const data = await res.json();

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

export default createUser;
