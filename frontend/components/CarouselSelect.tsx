import clsx from "clsx";
import { useState, VFC } from "react";

const OBJECT_MAP = ["/image_src", "/image_src"];

type Props = {
	selectedIndex: number;
	onChange: (index: number) => void;
};

const CarouselSelect: VFC<Props> = (props) => {
	const { selectedIndex, onChange } = props;

	return (
		<ul className="max-w-full overflow-x-scroll flex space-x-4 pb-2">
			{[1, 2, 3, 4, 5, 6].map((item, i) => (
				<li
					key={i}
					onClick={() => onChange(i)}
					className={clsx(
						"relative w-[112px] h-[112px] bg-gray-100 flex-shrink-0 rounded-md p-2"
					)}
				>
					<div
						className={clsx("w-full h-full", {
							"absolute top-0 left-0 w-full border-2 border-blue-300 rounded-md":
								i === selectedIndex,
						})}
					></div>
					<div className="absolute top-0 w-full h-full">
						<div className="relative">
							{/* TODO: 写真を入れる */}
							{item}
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};

export default CarouselSelect;
