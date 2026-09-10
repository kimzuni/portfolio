import { cn } from "@/lib/utils";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter as BaseFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";



export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};



export interface DialogProps extends React.ComponentProps<typeof Dialog> {
}

export interface DialogCloseProps extends React.ComponentProps<typeof DialogClose> {
}

export interface DialogContentProps extends React.ComponentProps<typeof DialogContent> {
}

export interface DialogDescriptionProps extends React.ComponentProps<typeof DialogDescription> {
}

export interface DialogHeaderProps extends React.ComponentProps<typeof DialogHeader> {
}

export interface DialogOverlayProps extends React.ComponentProps<typeof DialogOverlay> {
}

export interface DialogPortalProps extends React.ComponentProps<typeof DialogPortal> {
}

export interface DialogTitleProps extends React.ComponentProps<typeof DialogTitle> {
}

export interface DialogTriggerProps extends React.ComponentProps<typeof DialogTrigger> {
}



export interface DialogFooterProps extends React.ComponentProps<typeof BaseFooter> {
}

export function DialogFooter({
	className,
	...props
}: DialogFooterProps) {
	return (
		<BaseFooter
			className={cn(
				"-mx-6 -mb-6 px-6 py-4 bg-muted/50 rounded-b-xl border-t",
				className,
			)}
			{...props}
		/>
	);
}
