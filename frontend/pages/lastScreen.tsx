import Image from "next/image";

export const Sample = () => {
	return (
		<>
			<div className="relative w-full bg-gray-50">
				{/* <a href="https://storyset.com/event">Event illustrations by Storyset</a> */}

				<div className="absolute transform -translate-x-1/2 left-1/2">
					<Image
						alt="画像"
						src="/Happy birthday-cuate.svg"
						height={340}
						width={400}
					/>
				</div>

				<div className="absolute top-44 left-20">
					<Image
						alt="画像"
						src="/Balloons-amico.svg"
						height={150}
						width={150}
					/>
				</div>

				<div className="absolute top-44 right-10">
					<Image
						alt="画像"
						src="/Celebration-rafiki.svg"
						height={150}
						width={150}
					/>
				</div>

				<div className="absolute top-64 left-10">
					<Image alt="画像" src="/Gift-rafiki.svg" height={100} width={100} />
				</div>
				<div className="absolute top-72 right-8">
					<Image
						alt="画像"
						src="/Balloons-amico-blue.svg"
						height={200}
						width={200}
					/>
				</div>
				<div className="absolute top-96">
					<Image
						alt="画像"
						src="/Birthday cake-pana.svg"
						height={400}
						width={400}
					/>
				</div>
			</div>
		</>
	);
};
