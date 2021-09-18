import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getUser from "../../../utils/getUser";
import createMessage from "../../../utils/createMessage";
import useUser from "../../../hooks/useUser";
import { User } from "../../../models";
import GlassmorphismBox from "../../../components/GlassmorphismBox";

const DUMMY_USER: User = {
	id: 1,
	name: "taro",
	birthday: "2000/01/01",
	messages: [
		{
			id: 1,
			content: "abcdefg".repeat(100),
		},
		{
			id: 2,
			content: "bbbbb",
		},
		{
			id: 3,
			content: "ccccc",
		},
	],
};

const UsersId: NextPage = () => {
	const router = useRouter();
	const { id: userId } = router.query;
	const { user, setUser } = useUser();
	const [error, setError] = useState(false);

	useEffect(() => {
		if (userId === undefined) return;
		if (user !== undefined) return;

		(async () => {
			const res = await getUser(Number(userId));
			if (res.error) {
				setError(true);
			}
			setUser(res.data);
		})();
	}, [userId, setUser, user]);

	const onClick = () => {
		const content = "お誕生日おめでとう！！！";
		createMessage(Number(userId), content);
	};

	if (error) {
		<p>error</p>;
	}

	return (
		<div
			className="object-contain w-full h-screen"
			style={{
				backgroundImage: `url('/star.png')`,
				backgroundSize: "cover",
				backgroundPosition: "center center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<button onClick={onClick}>送信</button>

			<div className="pt-[160px]"></div>
			<ul className="w-11/12 mx-auto flex flex-col space-y-6">
				{user &&
					user.messages.map((message) => (
						<li key={message.id}>
							<GlassmorphismBox className="h-[180px] px-6 py-6">
								<div className="h-full overflow-y-scroll break-words">
									<p className="text-white text-center max-w-full my-auto">
										{message.content}
									</p>
								</div>
							</GlassmorphismBox>
						</li>
					))}
			</ul>
		</div>
	);
};

export default UsersId;
