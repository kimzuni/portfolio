import { useEffect } from "react";

import { Icons } from "../components";
import { useLayoutContext, useAnimateInView } from "../hooks";



export interface ModalProps extends Omit<React.ComponentPropsWithoutRef<"div">, "hidden" | "role" | "aria-modal"> {
	modalTitle: string;
	isOpen: boolean;
	backdropColor?: string;
	onClose: () => void;
	closeOnBackdropClick?: boolean;
}

export default function Modal({
	modalTitle,
	isOpen=false,
	backdropColor="color-mix(in oklab, var(--color-theme-bg-dark) 30%, transparent)",
	onClose,
	closeOnBackdropClick=true,
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
			onClick={closeOnBackdropClick ? onClose : undefined}
			className={`
				bg-(--bg)
				fixed top-0 left-0 z-999
				flex justify-center items-center
				p-8 h-full w-full
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
					relative
					bg-theme-bg-light shadow-2xl rounded-2xl
					min-w-[min(100%,350px)] w-full max-w-[min(100%,550px)]
				`.replace(/\s+/g, " ").trim()}
				onClick={e => e.stopPropagation()}
			>
				<div className="p-6 pl-8 pb-0 flex items-center">
					<h3
						id={`${modalTitle}-modalTitle`}
						className="flex-1 font-semibold text-lg pt-1 pr-[2.4rem]"
						children={modalTitle}
					/>
					<button
						aria-label="close this modal"
						onClick={onClose}
						className="absolute top-4 right-6"
						children={<Icons.XMark size="2.4rem"/>}
					/>
				</div>
				<div className={`px-8 pb-8 pt-4 max-h-[80svh] overflow-auto ${className}`.trim()} {...props}>
					{children}
				</div>
			</div>
		</div>
	);
}
