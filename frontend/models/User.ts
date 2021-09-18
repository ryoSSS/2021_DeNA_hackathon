import type { Message } from "./Message";

export type User = {
	id: number;
	name: string;
	birthday: string;
	messages: Message[];
};
