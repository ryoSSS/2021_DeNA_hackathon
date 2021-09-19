import Image from "next/image";

const Messages = () => {
	return (
		<>
			{/* <a href="https://storyset.com/event">Event illustrations by Storyset</a> */}
			<div className="relative w-full h-screen bg-gray-50">
				{/* happy birthday */}
				<div className="absolute transform -translate-x-1/2 left-1/2">
					<Image alt="画像" src="/present/happy.svg" height={400} width={400} />
				</div>

				{/* rocket */}
				<div className="absolute top-[2%] left-[2%]">
					<Image alt="画像" src="/present/1.svg" height={100} width={100} />
				</div>

				{/* piggy bank */}
				<div className="absolute top-[10%] left-[30%]">
					<Image alt="画像" src="/present/2.svg" height={100} width={100} />
				</div>

				{/* green balloons */}
				<div className="absolute top-[20%] left-[20%]">
					<Image alt="画像" src="/present/3.svg" height={150} width={150} />
				</div>

				{/* human */}
				<div className="absolute top-[25%] right-[10%]">
					<Image alt="画像" src="/present/4.svg" height={150} width={150} />
				</div>

				{/* present box */}
				<div className="absolute top-[30%] left-[10%]">
					<Image alt="画像" src="/present/5.svg" height={100} width={100} />
				</div>

				{/* audio */}
				<div className="absolute top-[20%] left-[5%]">
					<Image alt="画像" src="/present/6.svg" height={100} width={100} />
				</div>

				{/* food */}
				<div className="absolute top-[10%] right-[5%]">
					<Image alt="画像" src="/present/7.svg" height={100} width={100} />
				</div>

				{/* blue balloon */}
				<div className="absolute top-[40%] right-[30%]">
					<Image alt="画像" src="/present/8.svg" height={200} width={200} />
				</div>

				{/* house */}
				<div className="absolute top-[40%] right-[5%]">
					<Image alt="画像" src="/present/9.svg" height={100} width={100} />
				</div>

				{/* letter */}
				<div className="absolute bottom-[35%] left-[5%]">
					<Image alt="画像" src="/present/10.svg" height={100} width={100} />
				</div>

				{/* coin */}
				<div className="absolute bottom-[20%] right-[5%]">
					<Image alt="画像" src="/present/11.svg" height={200} width={200} />
				</div>

				{/* plant */}
				<div className="absolute bottom-[10%] left-[5%]">
					<Image alt="画像" src="/present/12.svg" height={200} width={200} />
				</div>

				{/* purple balloon */}
				<div className="absolute bottom-[0%]">
					<Image alt="画像" src="/present/13.svg" height={300} width={300} />
				</div>

				{/* cake */}
				<div className="absolute bottom-[0%] right-[10%]">
					<Image alt="画像" src="/present/14.svg" height={400} width={400} />
				</div>
			</div>
		</>
	);
};
export default Messages;
