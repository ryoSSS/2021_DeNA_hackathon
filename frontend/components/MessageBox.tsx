import type { ReactNode, VFC } from "react";

type Props = {
	children: ReactNode;
	writerName: string;
};

const MessageBox: VFC<Props> = ({ children, writerName }) => {
	return (
		<div className="relative bg-white h-[160px] px-3 py-6 border-4 border-blue-100 rounded-sm overflow-hidden">
			<div className="flex items-center h-full">
				<p className="max-w-full max-h-full mx-auto overflow-auto text-sm text-center text-black break-words">
					{children}
				</p>
			</div>
			<p className="absolute text-xs text-gray-800 bottom-1 right-2">
				<span className="mr-2 text-gray-500">from:</span>
				{writerName}
			</p>
		</div>
	);
};

export default MessageBox;
