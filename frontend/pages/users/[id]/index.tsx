import { NextPage, GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, FC } from "react";
import getUser from "../../../utils/getUser";
import createMessage from "../../../utils/createMessage";
import useUser from "../../../hooks/useUser";
import { User } from "../../../models";
import Error from "next/error";
import MessageBox from "../../../components/MessageBox";
import clsx from "clsx";
import CloseButton from "../../../components/CloseButton";
import CarouselSelect from "../../../components/CarouselSelect";

type UsersIdProps = {
	status: number;
	data?: User;
};

const UsersId: NextPage<UsersIdProps> = (props) => {
	const router = useRouter();
	const { user, setUser } = useUser();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [writerName, setWriterName] = useState("");
	const [content, setContent] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const _user = user ? user : props.data;

	const onselectionchange = (index: number) => {
		setSelectedIndex(index);
	};

	const onClickMessageSendButton = () => {
		createMessage(_user.id, content, writerName, selectedIndex);
	};

	if (props.status !== 200) {
		return <Error statusCode={props.status} />;
	}

	return (
		<div
			className={clsx(
				"relative h-screen overflow-scroll",
				isModalOpen && "overflow-hidden"
			)}
		>
			<div className="pt-14 pb-20 w-11/12 mx-auto">
				<section className="flex flex-col justify-center">
					<h1 className="text-black font-semibold text-center text-xl">
						{_user.name} さんの誕生日をお祝いしよう！
					</h1>
					<p className="text-gray-500 text-center text-xs mx-14 mt-3">
						今日は{_user.name}{" "}
						の誕生日です。1年に1度のイベントを皆で盛り上げましょう！
					</p>

					<div className="mt-3 flex justify-center">
						<Image src="/gift-box.svg" alt="" width={203} height={203} />
					</div>

					<div className="mt-3">
						<label className="text-xs text-gray-500 ml-1">
							あなたのお名前
							<input
								type="text"
								placeholder="Yamada Taro"
								name="name"
								value={writerName}
								className="block w-11/12 mx-auto mt-0.5 px-3 py-2 min-h-[42px] bg-transparent border-2 border-gray-900 rounded-md focus:outline-none"
								onChange={(e) => setWriterName(e.target.value)}
								maxLength={25}
							/>
						</label>
						<button
							onClick={() => setIsModalOpen(true)}
							disabled={writerName === ""}
							className={clsx(
								"mt-5 bg-blue-300 text-white font-semibold text-sm py-3 px-9 rounded-lg shadow-md block mx-auto",
								writerName === "" && "filter brightness-75"
							)}
						>
							誕生日を祝う
						</button>
					</div>
				</section>
				<section className="mt-16">
					<h3 className="text-black font-semibold text-sm">メッセージ一覧</h3>
					<div className="mt-4">
						<ul className="flex flex-col space-y-4">
							{_user.messages.map((message) => (
								<li key={message.id}>
									<MessageBox writerName={message.writerName}>
										{message.content}
									</MessageBox>
								</li>
							))}
						</ul>
					</div>
				</section>
			</div>

			{/* フローティングボタン */}
			<div className="fixed left-1/2 bottom-4 transform -translate-x-1/2  mx-auto">
				<button
					onClick={() => router.push(`/users/${_user.id}/messages`)}
					className="block bg-white py-3 px-6 rounded-3xl shadow-md text-black font-semibold text-sm"
				>
					メッセージ一覧へ
				</button>
			</div>

			{/* バックドロップ */}
			<div
				className={clsx(
					"absolute inset-0 bg-black transition-opacity duration-300",
					{
						"opacity-0 pointer-events-none": !isModalOpen,
						"opacity-80 pointer-events-auto": isModalOpen,
					}
				)}
				onClick={() => setIsModalOpen(false)}
			></div>

			{/* モーダル */}
			<div
				className={clsx(
					"fixed w-full transition-transform duration-300 bottom-0",
					{
						"translate-y-full": !isModalOpen,
					}
				)}
			>
				<div className="relative bg-white rounded-t-3xl">
					<div className="absolute right-2 top-2">
						<CloseButton onClick={() => setIsModalOpen(false)} />
					</div>
					<div className="w-11/12 mx-auto pt-14 pb-4">
						<section className="">
							<h2 className="text-center font-semibold">
								{_user.name} さんの誕生日をお祝いしよう！
							</h2>
							<div className="mt-5 flex justify-center">
								<Image src="/gift-amico.svg" alt="" width={203} height={203} />
							</div>
						</section>
						<section className="mt-2">
							<h3 className="mb-3 text-black font-semibold text-sm">
								プレゼント
							</h3>
							<CarouselSelect
								selectedIndex={selectedIndex}
								onChange={onselectionchange}
							/>
						</section>
						<section className="mt-6">
							<label className="block">
								<h3 className="text-black font-semibold text-sm">メッセージ</h3>
								<textarea
									rows={4}
									cols={40}
									placeholder="お誕生日おめでとう！素敵な一年になりますように！"
									className="mt-3 p-2 border border-gray-300 rounded-md resize-none"
									value={content}
									onChange={(e) => setContent(e.target.value)}
								></textarea>
							</label>
						</section>
						<button
							onClick={onClickMessageSendButton}
							disabled={content === ""}
							className={clsx(
								"mt-5 bg-blue-300 text-white font-semibold text-sm py-3 px-9 rounded-lg shadow-md block mx-auto",
								content === "" && "filter brightness-75"
							)}
						>
							メッセージを送信する
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default UsersId;

export const getServerSideProps: GetServerSideProps<any> = async (
	context: any
) => {
	// mock
	return {
		props: {
			status: 200,
			data: {
				id: 1,
				name: "taro",
				birthday: "2000/01/01",
				messages: [
					{
						id: 1,
						content: "お誕生日おめでとう！",
						writerName: "John",
						objectId: 0,
					},
					{
						id: 2,
						content: "あけましておめでとう！",
						writerName: "John",
						objectId: 1,
					},
					{
						id: 3,
						content: "おはよう！".repeat(30),
						writerName: "Johnnnnnnnnnnnn",
						objectId: 2,
					},
				],
			},
		},
	};

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
