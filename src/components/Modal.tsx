import { useEffect } from "react";
import { IoIosClose } from "@react-icons/all-files/io/IoIosClose";

import { useLayoutContext, useAnimateInView } from "../hooks";



export interface ModalProps extends Omit<React.ComponentPropsWithoutRef<"div">, "hidden" | "role" | "aria-modal"> {
	modalTitle: string;
	isOpen: boolean;
	backdropColor?: string;
	onClose: () => void;
}

export default function Modal({
	modalTitle,
	isOpen=false,
	backdropColor="color-mix(in oklab, var(--color-theme-bg-dark) 30%, transparent)",
	onClose,
	className="",
	children,
	...props
}: ModalProps) {
	const duration = "300ms";
	const { bodyOverflowHidden } = useLayoutContext();
	const backdropRef = useAnimateInView<HTMLDivElement>(isOpen, { duration, collapseOnHide: true, translateValue: "0px 0px" });
	const modalRef = useAnimateInView<HTMLDivElement>(isOpen, { duration });

	useEffect(() => {
		bodyOverflowHidden(isOpen, { showDelay: duration });
	}, [isOpen, bodyOverflowHidden]);

	return (
		<div
			ref={backdropRef}
			role="dialog"
			aria-modal={true}
			aria-labelledby={`${modalTitle}-modalTitle`}
			onClick={onClose}
			className={`
				bg-(--bg)
				fixed top-0 left-0 z-999
				flex justify-center items-center
				p-6 h-full w-full
				mr-(--body-hidden-scroll-width)
			`.replace(/\s+/g, " ").trim()}
			style={{
				"--bg": backdropColor,
			} as React.CSSProperties}
			hidden
		>
			<div
				ref={modalRef}
				className={`
					${className}
					bg-theme-bg-light drop-shadow-2xl rounded-lg
					w-full max-w-[550px]
				`.replace(/\s+/g, " ").trim()}
				onClick={e => e.stopPropagation()}
				{...props}
			>
				<div className="p-2 pl-4 flex items-center">
					<h3
						id={`${modalTitle}-modalTitle`}
						className="flex-1 font-semibold text-lg"
						children={modalTitle}
					/>
					<button
						aria-label="close this modal"
						onClick={onClose}
						children={<IoIosClose size="2rem"/>}
					/>
				</div>
				<div className="p-4 pt-2 max-h-[80svh] min-h-[350px] overflow-auto">
					{children}
				</div>
			</div>
		</div>
	);
}
