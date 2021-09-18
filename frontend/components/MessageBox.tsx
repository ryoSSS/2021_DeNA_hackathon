import type { ReactNode, VFC } from "react";

type Props = {
	children: ReactNode;
};

const MessageBox: VFC<Props> = ({ children }) => {
	return (
		<div className="bg-gray-200 h-[160px] px-6 py-6 rounded-2xl overflow-hidden">
			<div className="h-full flex items-center">
				<p className="max-h-full overflow-auto max-w-full mx-auto text-sm text-center text-black break-words">
					{children}
				</p>
			</div>
		</div>
	);
};

export default MessageBox;
