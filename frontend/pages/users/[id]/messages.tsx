import { NextPage, GetServerSideProps } from "next";
import { useEffect } from "react";
import GlassmorphismBox from "../../../components/GlassmorphismBox";
import useUser from "../../../hooks/useUser";
import getUser from "../../../utils/getUser";
import { User } from "../../../models/User";
import Error from "next/error";

type MessagesProps = {
	status: number;
	data?: User;
};

const UsersIdMessages: NextPage<MessagesProps> = (props) => {
	const { user, setUser } = useUser();

	useEffect(() => {
		if (props.status !== 200) return;
		setUser(props.data);
	}, [props, setUser]);

	if (props.status !== 200) {
		return <Error statusCode={props.status} />;
	}
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
					{user.messages ? (
						<>
							{user.messages.map((message) => {
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
						</>
					) : (
						<>
							{props.data.messages.map((message) => {
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
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default UsersIdMessages;

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
