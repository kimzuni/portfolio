"use client";

import { useState, useEffect, useCallback, useTransition } from "react";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupTextarea,
	InputGroupText,
	InputGroupInput,
} from "@/components/ui/input-group";

import { Message } from "./message";

import type * as contents from "@/contents";



function useStatus(url: string) {
	const [ok, setOk] = useState<boolean | undefined>(undefined);
	const [isPending, setIsPending] = useState(false);

	const check = useCallback(async () => {
		setIsPending(true);
		try {
			const response = await fetch(url, { method: "HEAD" });
			setOk(response.ok);
		} catch {
			setOk(false);
		} finally {
			setIsPending(false);
		}
	}, [url]);

	return { ok, isPending, check };
}



export interface ContactFormProps extends Omit<React.ComponentProps<"form">, "children">, Pick<contents.home.ContactForm, "to" | "message"> {
	checkInterval?: number;
	url: string;
}

export function ContactForm({
	url,
	to,
	checkInterval = 1000 * 60,
	message,
	...props
}: ContactFormProps) {
	const [isPending, startTransition] = useTransition();
	const [subject, setSubject] = useState("");
	const [content, setContent] = useState("");
	const status = useStatus(url);

	useEffect(() => {
		status.check();
		const interval = setInterval(() => {
			if (!document.hidden) {
				status.check();
			}
		}, checkInterval);
		return () => clearInterval(interval);
	}, [status, checkInterval]);

	const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!status.ok || isPending) return;

		startTransition(async () => {
			try {
				const response = await fetch(url, {
					method: "POST",
					body: JSON.stringify({ subject, content }),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.ok) {
					setSubject("");
					setContent("");
				}
			} catch {
			}
		});
	};

	return (
		<form
			{...props}
			onSubmit={onSubmit}
		>
			<Message className="text-center text-base mb-4">{message}</Message>
			<div className="flex gap-2 items-center-safe mb-2">
				<span>To:</span>
				<Input type="email" placeholder="Email..." value={to} disabled/>
			</div>
			<InputGroup>
				<InputGroupInput
					type="text"
					name="subject"
					placeholder="Subject..."
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					className="py-3!"
				/>
				<ScrollArea className="w-full max-h-72 h-32 border-b border-t">
					<InputGroupTextarea
						name="content"
						placeholder="Message..."
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="h-full"
					/>
				</ScrollArea>
				<InputGroupAddon align="block-end" className="py-3!">
					<InputGroupText className="px-2">
						<span
							className={cn(
								"size-2 rounded-full bg-primary/50",
								status.ok === true && "bg-green-600",
								status.ok === false && "bg-red-600",
							)}
						/>
						<span>{
							status.ok === undefined
								? "Checking status..."
								: status.ok ? "Online" : "Offline"
						}</span>
					</InputGroupText>
					<InputGroupButton
						size="sm"
						variant="default"
						type="submit"
						className="ml-auto"
						disabled={!status.ok}
					>Submit</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</form>
	);
}
