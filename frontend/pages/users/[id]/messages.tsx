import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import useUser from "../../../hooks/useUser";
import getUser from "../../../utils/getUser";
import { User } from "../../../models";

type MessagesProps = {
	status: number;
	data?: User;
};

const Messages: NextPage<MessagesProps> = (props) => {
	const { user, setUser } = useUser();
	const _user = user ? user : props.data;

	return (
		<>
			{/* <a href="https://storyset.com/event">Event illustrations by Storyset</a> */}
			<div className="relative w-full h-screen bg-gray-50">
				{/* happy birthday */}
				<div className="absolute transform -translate-x-1/2 left-1/2">
					<Image alt="画像" src="/present/happy.svg" height={400} width={400} />
				</div>

				{_user.messages.map((message) => (
					<div key={message.id}>
						{/* rocket */}
						{message.objectId === 1 && (
							<div className="absolute top-[2%] left-[2%]">
								<Image
									alt="画像"
									src="/present/1.svg"
									height={100}
									width={100}
								/>
							</div>
						)}

						{/* piggy bank */}
						{message.objectId === 2 && (
							<div className="absolute top-[10%] left-[30%]">
								<Image
									alt="画像"
									src="/present/2.svg"
									height={100}
									width={100}
								/>
							</div>
						)}

						{/* green balloons */}
						{message.objectId === 3 && (
							<div className="absolute top-[20%] left-[20%]">
								<Image
									alt="画像"
									src="/present/3.svg"
									height={150}
									width={150}
								/>
							</div>
						)}

						{/* human */}
						{message.objectId === 4 && (
							<div className="absolute top-[25%] right-[10%]">
								<Image
									alt="画像"
									src="/present/4.svg"
									height={150}
									width={150}
								/>
							</div>
						)}

						{/* present box */}
						{message.objectId === 5 && (
							<div className="absolute top-[30%] left-[10%]">
								<Image
									alt="画像"
									src="/present/5.svg"
									height={100}
									width={100}
								/>
							</div>
						)}

						{/* audio */}
						{message.objectId === 6 && (
							<div className="absolute top-[20%] left-[5%]">
								<Image
									alt="画像"
									src="/present/6.svg"
									height={100}
									width={100}
								/>
							</div>
						)}

						{/* food */}
						{message.objectId === 7 && (
							<div className="absolute top-[10%] right-[5%]">
								<Image
									alt="画像"
									src="/present/7.svg"
									height={100}
									width={100}
								/>
							</div>
						)}

						{/* blue balloon */}
						{message.objectId === 8 && (
							<div className="absolute top-[40%] right-[30%]">
								<Image
									alt="画像"
									src="/present/8.svg"
									height={200}
									width={200}
								/>
							</div>
						)}

						{/* house */}
						{message.objectId === 9 && (
							<div className="absolute top-[40%] right-[5%]">
								<Image
									alt="画像"
									src="/present/9.svg"
									height={100}
									width={100}
								/>
							</div>
						)}

						{/* letter */}
						{message.objectId === 10 && (
							<div className="absolute bottom-[35%] left-[5%]">
								<Image
									alt="画像"
									src="/present/10.svg"
									height={100}
									width={100}
								/>
							</div>
						)}

						{/* coin */}
						{message.objectId === 11 && (
							<div className="absolute bottom-[20%] right-[5%]">
								<Image
									alt="画像"
									src="/present/11.svg"
									height={200}
									width={200}
								/>
							</div>
						)}

						{/* plant */}
						{message.objectId === 12 && (
							<div className="absolute bottom-[10%] left-[5%]">
								<Image
									alt="画像"
									src="/present/12.svg"
									height={200}
									width={200}
								/>
							</div>
						)}

						{/* purple balloon */}
						{message.objectId === 13 && (
							<div className="absolute bottom-[0%]">
								<Image
									alt="画像"
									src="/present/13.svg"
									height={300}
									width={300}
								/>
							</div>
						)}
					</div>
				))}
				{/* cake */}
				<div className="absolute bottom-[0%] right-[10%]">
					<Image alt="画像" src="/present/cake.svg" height={400} width={400} />
				</div>
			</div>
		</>
	);
};
export default Messages;

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
