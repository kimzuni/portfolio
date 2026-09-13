"use client";

import { useId, useRef, useState, useEffect, useTransition } from "react";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";

import { APP_URL } from "@/config/constants";
import { cn } from "@/lib/utils";
import * as cookie from "@/lib/cookie";
import { useServerCheck } from "@/hooks/use-server-check";

import { toast } from "@/components/ui/toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dot } from "@/components/dot";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupTextarea,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/dialog";
import { Icon } from "@/components/icon";
import { Tooltip } from "@/components/tooltip";
import { ContentLink } from "@/components/content-link";

import { Message } from "./message";

import type * as contents from "@/contents";



export interface ContactFormProps extends Omit<React.ComponentProps<"form">, "children">, Pick<contents.home.ContactForm, "to" | "message" | "checkInterval" | "ulist"> {
	isActive: boolean;
	url: string;
	autoCheck: boolean;
	autoCheckKey: string;
}

export function ContactForm({
	ref: refProp,
	id,
	url,
	to,
	isActive,
	checkInterval,
	ulist,
	message,
	autoCheck: _autoCheck,
	autoCheckKey,
	onSubmit,
	className,
	...props
}: ContactFormProps) {
	const localRef = useRef<HTMLFormElement>(null);
	const ref = useMergedRefs(localRef, refProp);

	const [isIntersecting, setIsIntersecting] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [modelOpen, setModalOpen] = useState(false);
	const [autoCheck, setAutoCheck] = useState(_autoCheck);

	const checkOptions = {
		autoCheck: isActive && isVisible && autoCheck && isIntersecting,
		interval: checkInterval,
	};
	const { ok } = useServerCheck(url, checkOptions);



	const randomId = useId();
	const formId = id || `contact-form-${randomId}`;

	const [isPending, startTransition] = useTransition();
	const [subject, setSubject] = useState("");
	const [content, setContent] = useState("");

	const isSubmittable = (
		(!checkOptions.autoCheck || !!ok)
		&& !isPending
		&& !!(subject || content)
	);

	const updateAutoCheck = (value: boolean) => {
		if (!isActive) return;
		setAutoCheck(value);
		cookie.set(autoCheckKey, `${value}`);
	};

	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsVisible(document.visibilityState === "visible");
		};

		handleVisibilityChange();
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
	}, []);

	useEffect(() => {
		const target = localRef.current;
		if (!target) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry!.isIntersecting);
			},
			{
				threshold: 0.1,
			},
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, []);

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		onSubmit?.(e);

		const { defaultPrevented } = e;
		e.preventDefault();

		if (defaultPrevented || !isActive || isPending) return;

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
					setModalOpen(false);
					setSubject("");
					setContent("");

					toast.add({
						type: "success",
						title: "메일이 성공적으로 전송되었어요!",
						description: "소중한 의견을 보내주셔서 감사합니다",
					});
				} else {
					const { message } = await response.json();
					toast.add({
						type: "error",
						title: "메일 전송 중 오류가 발생했어요",
						description: message,
					});
				}
			} catch (e) {
				toast.add({
					type: "error",
					title: "메일 전송 중 오류가 발생했어요",
					description: e instanceof Error ? e.message : "알 수 없는 오류가 발생했어요",
				});
			}
		});
	};

	return (
		<form
			ref={ref}
			id={formId}
			onSubmit={handleSubmit}
			data-auto-check={autoCheck ? "" : undefined}
			className={cn(
				"group/contact-form",
				className,
			)}
			{...props}
		>
			<div className="mb-4 flex flex-wrap-reverse items-center-safe justify-center-safe gap-1">
				<Message className="text-center text-base">
					{message}
				</Message>
				{(ulist || !isActive) && (
					<Tooltip
						triggerProps={{
							className: "text-muted-foreground relative -top-0.75",
							children: (
								<Icon
									icon="OctagonAlert"
									className={isActive ? undefined : "text-destructive"}
									size={12}
								/>
							),
						}}
					>
						<ul
							className={cn(
								"text-sm",
								isActive && "pl-3 list-decimal",
							)}
						>
							{
								isActive
									? ulist!.map(item => <li key={item}>{item}</li>)
									: <li>
										<ContentLink href={APP_URL}>최신 릴리즈 버전</ContentLink>
										의 웹 포트폴리오에서만 메일을 전송할 수 있어요
									</li>
							}
						</ul>
					</Tooltip>
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
					<Toggle
						title="Auto Check Server Status"
						pressed={autoCheck}
						onPressedChange={updateAutoCheck}
						disabled={!isActive}
						data-ok={ok}
						className={cn(
							"bg-transparent! hover:text-primary gap-2",
							"data-[ok=false]:[--c:var(--color-red-600)]",
							"data-[ok=true]:[--c:var(--color-green-600)]",
							"group-data-auto-check/contact-form:[--bd:var(--c,var(--primary))]!",
							"not-group-data-auto-check/contact-form:[--c:var(--input)]!",
						)}
					>
						<Dot className="border border-(--bd,var(--c)) bg-(--bg,var(--c))"/>
						{
							!isActive ? "Not Available" :
							!autoCheck ? "Press to Check" :
							ok === undefined ? "Checking..." :
							ok ? "Online" :
							"Offline"
						}
					</Toggle>
					<InputGroupButton
						size="sm"
						variant="default"
						type="button"
						className="ml-auto"
						disabled={!isSubmittable}
						onClick={() => setModalOpen(true)}
					>Send Message</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
			<Dialog
				open={modelOpen}
				onOpenChange={setModalOpen}
			>
				<DialogContent className="sm:max-w-sm">
					<DialogHeader>
						<DialogTitle>메일을 전송하시겠어요?</DialogTitle>
						<DialogDescription>
							입력하신 내용이 맞는지 다시 한번 확인할게요!
						</DialogDescription>
					</DialogHeader>
					<div className="rounded-lg border bg-muted/50 p-4 space-y-3">
						<div className="space-y-1">
							<p className="text-xs font-semibold text-muted-foreground">Subject</p>
							<p
								className={cn(
									"font-medium text-foreground break-all",
									!subject && "text-muted-foreground text-xs italic",
								)}
							>
								{subject || "No Subject"}
							</p>
						</div>

						<Separator/>

						<div className="space-y-1">
							<p className="text-xs font-semibold text-muted-foreground">Message</p>
							<ScrollArea
								className="h-48 -mr-4 pr-4"
							>
								<p
									className={cn(
										"text-foreground whitespace-pre-wrap break-all",
										!content && "text-muted-foreground text-xs italic",
									)}
								>
									{content || "No Message"}
								</p>
							</ScrollArea>
						</div>
					</div>
					<DialogFooter>
						<DialogClose render={<Button variant="outline">Cancel</Button>}/>
						<Button type="submit" form={formId}>Submit</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</form>
	);
}
