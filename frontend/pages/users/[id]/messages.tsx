import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Message } from "../../../models/Message";
import GlassmorphismBox from "../../../components/GlassmorphismBox";

const UsersIdMessages: NextPage = () => {
	const router = useRouter();

	const [id, setId] = useState<string>("");
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		if (router.asPath !== router.route) {
			setId(String(router.query.id));
			//
			// TODO: storeチェック
			//
		}
	}, [router]);
	return (
		<>
			<div
				className="object-contain w-full h-screen"
				style={{
					backgroundImage: `url('/elnaz-asadi-RczTV4UAkw0-unsplash.jpg')`,
					backgroundSize: "cover",
					backgroundPosition: "center center",
					backgroundRepeat: "no-repeat",
				}}
			>
				<div className="grid h-screen grid-cols-2 py-4 overflow-y-scroll md:grid-cols-3">
					{messages.map((message) => {
						return (
							<GlassmorphismBox
								key={message.id}
								className="h-40 px-3 py-4 mx-4 my-2 text-center"
							>
								<div className="h-full overflow-y-scroll">
									<h1 className="font-semibold">{message.content}</h1>
								</div>
							</GlassmorphismBox>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default UsersIdMessages;
