import createUser from "../../utils/createUser";
import { NextPage } from "next";
import { useState } from "react";

const Users: NextPage = () => {
	const [name, setName] = useState<string>("");
	const [birthday, setBirthday] = useState<string>("");
	const [link, setLink] = useState<string>("");
	const [openModal, setOpenModal] = useState<boolean>(false);

	const validate = (name: string, birthday: string) => {
		// name validation
		if (name.length < 1) return "name invalid";

		// birthday validation
		const pattern = /^\d{4}\/\d{2}\/\d{2}$/g;
		const result = birthday.match(pattern);
		if (result === null) return "birthday invalid";

		const year = Number(birthday.split("/")[0]);
		const month = Number(birthday.split("/")[1]);
		const day = Number(birthday.split("/")[2]);

		if (year < 1900) return "old";
		if (month <= 0 || month >= 13) return "no month";
		if (day <= 0 || day >= 32) return "no day";
		const now = new Date();
		const here = new Date(year, month - 1, day);
		if (now.getTime() - here.getTime() < 0) return "future";

		return "ok";
	};

	const submit = async () => {
		// バリデーション
		const isValid = validate(name, birthday);
		if (isValid === "name invalid") {
			alert("名前は1文字以上25文字以下で入力してください");
		} else if (isValid === "birthday invalid") {
			alert("誕生日は1990/01/01のように半角数字で入力してください");
		} else if (
			isValid === "old" ||
			isValid === "no month" ||
			isValid === "no day"
		) {
			alert("適切な日時を入力してください");
		} else if (isValid === "future") {
			alert("未来の日時です");
		} else {
			// データベースへの処理
			// await toDatebase()
			const res = await createUser(name, birthday);
			const userId = res.data.userId
			setLink(`${process.env.NEXT_PUBLIC_API_DOMAIN}/users/${userId}`);
			setOpenModal(true)
		}
	};
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
				{openModal ? (
					<>
						<div className="flex flex-col md:pt-40 pt-52">
							<input
								type="text"
								placeholder="https://...."
								name="link"
								value={link}
								className="px-2 py-2 mx-auto my-2 bg-transparent border-2 border-gray-900 rounded-md w-60 focus:outline-none"
								disabled
							/>

							<button
								onClick={() =>
									navigator.clipboard.writeText(link).then(() => {
										alert("コピーしました");
									})
								}
								className="px-2 py-2 mx-auto my-2 font-semibold transition duration-200 bg-transparent border-2 border-gray-900 rounded-md w-60 focus:outline-none hover:bg-gray-50"
							>
								リンクをコピー
							</button>
						</div>
					</>
				) : (
					<>
						<div className="flex flex-col md:pt-40 pt-52">
							<input
								type="text"
								placeholder="Yamada Taro"
								name="name"
								value={name}
								className="px-2 py-2 mx-auto my-2 bg-transparent border-2 border-gray-900 rounded-md w-60 focus:outline-none"
								onChange={(e) => setName(e.target.value)}
								maxLength={25}
							/>
							<input
								type="text"
								placeholder="1990/01/01"
								name="birthday"
								value={birthday}
								className="px-2 py-2 mx-auto my-2 bg-transparent border-2 border-gray-900 rounded-md w-60 focus:outline-none"
								onChange={(e) => setBirthday(e.target.value)}
								maxLength={10}
							/>
							<button
								onClick={() => submit()}
								className="px-2 py-2 mx-auto my-2 font-semibold text-white transition duration-200 bg-transparent bg-gray-900 border-2 border-gray-900 rounded-md w-60 focus:outline-dotted-cool-gray-600 hover:bg-gray-700"
							>
								リンクを作成
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Users;
