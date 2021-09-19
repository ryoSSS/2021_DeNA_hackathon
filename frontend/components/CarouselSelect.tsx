import Image from "next/image";
import { VFC } from "react";
import clsx from "clsx";
import OBJECTS from "../data/objects";

type Props = {
	selectedIndex: number;
	idBlackList: number[];
	onChange: (index: number) => void;
};

const CarouselSelect: VFC<Props> = (props) => {
	const { selectedIndex, idBlackList, onChange } = props;

	const whiteList = OBJECTS.filter(
		(object) => !idBlackList.includes(object.id)
	);

	return (
		<ul className="max-w-full overflow-x-scroll flex space-x-4 pb-2">
			{whiteList.map((item) => (
				<li
					key={item.id}
					onClick={() => onChange(item.id)}
					className={clsx(
						"relative w-[112px] h-[112px] bg-gray-100 flex-shrink-0 rounded-md p-2"
					)}
				>
					<div
						className={clsx("w-full h-full", {
							"absolute top-0 left-0 w-full border-2 border-blue-300 rounded-md":
								item.id === selectedIndex,
						})}
					></div>
					<div className="absolute top-0 left-0 w-full h-full p-4">
						<div className="relative object-fill flex justify-center items-center w-full h-full">
							<Image src={item.imageSrc} alt={item.name} layout="fill" />
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};

export default CarouselSelect;
