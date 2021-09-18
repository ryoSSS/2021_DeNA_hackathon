import type { User, Message } from "../models";

type Body = {
	userId: User["id"];
	content: Message["content"];
	writerName: Message["writerName"];
	objectId: Message["objectId"];
};

type Response = {
	error: boolean;
};

// [POST] /messages
async function createUser(
	userId: number,
	content: string,
	writerName: string,
	objectId: number
): Promise<Response> {
	const body: Body = { userId, content, writerName, objectId };
	const res = await fetch(`${process.env["NEXT_PUBLIC_API_DOMAIN"]}/messages`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		return {
			error: true,
		};
	}

	return {
		error: false,
	};
}

export default createUser;
