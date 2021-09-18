import type { ReactNode, VFC, ComponentPropsWithoutRef } from "react";
import styles from "../styles/GlassmorphismBox.module.css";
import clsx from "clsx";

type Props = {
	children?: ReactNode;
} & ComponentPropsWithoutRef<"div">;

const GlassmorphismBox: VFC<Props> = ({ children, className, ...rest }) => {
	const classes = clsx(className, styles.box);

	return (
		<div className={classes} {...rest}>
			{children}
		</div>
	);
};

export default GlassmorphismBox;
