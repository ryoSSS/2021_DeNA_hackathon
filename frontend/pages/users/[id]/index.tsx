import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import getUser from "../../../utils/getUser";
import createMessage from "../../../utils/createMessage";
import useUser from "../../../hooks/useUser";
import { User } from "../../../models";
import GlassmorphismBox from "../../../components/GlassmorphismBox";
import Error from "next/error";

type UsersIdProps = {
	status: number;
	data?: User;
};

const UsersId: NextPage<UsersIdProps> = (props) => {
	const router = useRouter();
	const { user, setUser } = useUser();
	const [text, setText] = useState<string>("");

	const getAgain = async (user_id: number) => {
		// SSRした後の再フェッチ
		const res = await getUser(user_id);
		if (res.error) {
			alert("エラーが発生が発生しました");
			return;
		} else {
			setUser(res.data);
		}
	};

	const onClick = () => {
		createMessage(props.data.id, text);
		alert("送信しました！");
		setText("");
		getAgain(props.data.id);
	};

	if (props.status !== 200) {
		return <Error statusCode={props.status} />;
	}

	return (
		// <div
		// 	className="object-contain w-full h-screen"
		// 	style={{
		// 		backgroundImage: `url('/elnaz-asadi-RczTV4UAkw0-unsplash.jpg')`,
		// 		backgroundSize: "cover",
		// 		backgroundPosition: "center center",
		// 		backgroundRepeat: "no-repeat",
		// 	}}
		// >
		<div className="bg-gradient-to-b from-indigo-300 to-blue-500">
			<div className="pt-10">
				<GlassmorphismBox className="mx-4">
					<div className="">
						<textarea
							className="w-full px-4 py-4 text-lg bg-transparent focus:outline-none"
							name="form"
							placeholder="入力ホーム"
							id="form"
							cols={20}
							rows={5}
							value={text}
							onChange={(e) => setText(e.target.value)}
						></textarea>
					</div>
				</GlassmorphismBox>
			</div>

			<GlassmorphismBox className="mx-4 my-4">
				<div className="text-center">
					<button
						onClick={onClick}
						className="px-4 py-2 font-semibold text-gray-700 focus:outline-none active:outline-none"
					>
						送信
					</button>
				</div>
			</GlassmorphismBox>

			<GlassmorphismBox className="mx-4 my-4">
				<div className="text-center">
					<button
						onClick={() => router.push(`/users/${props.data.id}/messages`)}
						className="px-4 py-2 font-semibold text-gray-700 focus:outline-none active:outline-none"
					>
						メッセージ一覧へ
					</button>
				</div>
			</GlassmorphismBox>

			<div className="pb-10">
				<ul className="flex flex-col mx-4 mx-auto space-y-6">
					{user ? (
						<>
							{user.messages.map((message) => (
								<li key={message.id}>
									<GlassmorphismBox className="h-[180px] px-6 py-6">
										<div className="h-full overflow-y-scroll break-words">
											<p className="max-w-full my-auto text-center text-white">
												{message.content}
											</p>
										</div>
									</GlassmorphismBox>
								</li>
							))}
						</>
					) : (
						<>
							{props.data.messages.map((message) => (
								<li key={message.id}>
									<GlassmorphismBox className="h-[180px] px-6 py-6">
										<div className="h-full overflow-y-scroll break-words">
											<p className="max-w-full my-auto text-center text-white">
												{message.content}
											</p>
										</div>
									</GlassmorphismBox>
								</li>
							))}
						</>
					)}
				</ul>
			</div>
		</div>
	);
};

export default UsersId;

export const getServerSideProps: GetServerSideProps<any> = async (
	context: any
) => {
	try {
		const { id } = context.query;
		console.log(id);
		const res = await getUser(id);
		if (res.error) return { props: { status: 404, data: {} } };
		console.log(res.data);
		return { props: { status: 200, data: res.data } };
	} catch (e) {
		return { props: { status: 500, data: {} } };
	}
};
