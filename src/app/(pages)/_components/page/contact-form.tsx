"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { toast, type ExternalToast } from "sonner";

import { cn } from "@/lib/utils";
import * as cookie from "@/lib/cookie";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
	Field,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupTextarea,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Icon } from "@/components/icon";
import { TooltipWithMobile } from "@/components/tooltip-with-mobile";

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



const commonToastOption: ExternalToast = {
	position: "top-center",
	action: {
		label: "Close",
		onClick: () => {},
	},
};

export interface ContactFormProps extends Omit<React.ComponentProps<"form">, "children">, Pick<contents.home.ContactForm, "to" | "message" | "checkInterval" | "ulist"> {
	isActive: boolean;
	url: string;
	autoCheck: boolean;
	autoCheckKey: string;
}

export function ContactForm({
	url,
	to,
	isActive,
	checkInterval,
	ulist,
	message,
	autoCheck: _autoCheck,
	autoCheckKey,
	...props
}: ContactFormProps) {
	const [autoCheck, setAutoCheck] = useState(_autoCheck);

	const [isPending, startTransition] = useTransition();
	const [subject, setSubject] = useState("");
	const [content, setContent] = useState("");
	const status = useStatus(url);

	const isSubmittable = (
		isActive
		&& !!(subject || content)
		&& (
			(!!status.ok && !isPending)
			|| !autoCheck
		)
	);

	const updateAutoCheck = (value: boolean) => {
		setAutoCheck(value);
		cookie.set(autoCheckKey, `${value}`);
	};

	useEffect(() => {
		if (!isActive) return;

		const check = () => {
			if (autoCheck && !document.hidden) {
				status.check();
			}
		};

		check();
		const interval = setInterval(() => {
			check();
		}, checkInterval);
		return () => clearInterval(interval);
	}, [isActive, autoCheck, status, checkInterval]);

	const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isActive || isPending) return;

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

					toast.success("메일이 성공적으로 전송되었어요!", {
						description: "소중한 의견을 보내주셔서 감사합니다",
						...commonToastOption,
					});
				} else {
					const { message } = await response.json();
					toast.error("메일 전송 중 오류가 발생했어요", {
						description: message,
						...commonToastOption,
					});
				}
			} catch (e) {
				toast.error("메일 전송 중 오류가 발생했어요", {
					description: e instanceof Error ? e.message : "알 수 없는 오류가 발생했어요",
					...commonToastOption,
				});
			}
		});
	};

	return (
		<form
			{...props}
			onSubmit={onSubmit}
		>
			<div className="mb-4 flex flex-wrap-reverse items-center-safe justify-center-safe gap-1">
				<Message className="text-center text-base">
					{message}
				</Message>
				{ulist && (
					<TooltipWithMobile
						className="text-muted-foreground relative -top-0.75"
						tooltip={<ul className="pl-3 list-decimal text-sm">
							{ulist.map(item => <li key={item}>{item}</li>)}
						</ul>}
					>
						<Icon icon="OctagonAlert" size={12}/>
					</TooltipWithMobile>
				)}
			</div>
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
					autoComplete="off"
					disabled={!isActive}
				/>
				<Separator/>
				<InputGroupTextarea
					name="content"
					placeholder="Message..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="max-h-72 min-h-32 h-full"
					disabled={!isActive}
				/>
				<Separator/>
				<InputGroupAddon
					align="block-end"
					className="py-3!"
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							e.currentTarget.parentElement?.querySelector("input")?.focus();
						}
					}}
				>
					<div className="pl-2.5">
						<FieldSet>
							<FieldGroup>
								<Field orientation="horizontal" data-disabled={!isActive}>
									<Checkbox
										id="mail-form-auto-check"
										checked={autoCheck}
										onCheckedChange={updateAutoCheck}
										disabled={!isActive}
										className={cn(
											"*:hidden! rounded-full size-2 data-checked:border-input",
											"bg-(--c)! border-(--c)!",
										)}
										style={{
											"--c": !autoCheck
													? "var(--input)"
													: status.ok === undefined
														? "var(--input)"
														: status.ok
															? "var(--color-green-600)"
															: "var(--color-red-600)",
											"--ring": !autoCheck
													? "var(--primary)"
													: "var(--c)",
										} as React.CSSProperties}
									/>
									<FieldLabel
										htmlFor="mail-form-auto-check"
										className="text-nowrap group-hover/field:text-primary"
										onClick={(e) => {
											e.preventDefault();
											if (!isActive) return;
											updateAutoCheck(!autoCheck);
										}}
									>{
										!isActive
											? "Not Available"
											: !autoCheck
												? "Status Check Disabled"
												: status.ok === undefined
													? "Checking status..."
													: status.ok ? "Online" : "Offline"
									}</FieldLabel>
								</Field>
							</FieldGroup>
						</FieldSet>
					</div>
					<InputGroupButton
						size="sm"
						variant="default"
						type="submit"
						className="ml-auto"
						disabled={!isSubmittable}
					>Submit</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</form>
	);
}
