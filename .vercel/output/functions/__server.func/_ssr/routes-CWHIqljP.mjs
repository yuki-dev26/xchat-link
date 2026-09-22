import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as normalizeUsername, t as composeDmUrl } from "./x-user-CMwttYLu.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
import { i as Check, n as LoaderCircle, r as Copy } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CWHIqljP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium h-11 px-4 transition-[opacity,transform,background-color,color] duration-[var(--motion-quick)] ease-[var(--ease-out)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground hover:opacity-90",
		secondary: "bg-surface text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"
	} },
	defaultVariants: { variant: "default" }
});
function Button({ className, variant, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({ variant }), className),
		...props
	});
}
function Input({ className, type = "text", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-lg bg-surface px-3.5 text-base text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-fg-subtle", "focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var resolveXUser = createServerFn({ method: "POST" }).validator((input) => object({ username: string().min(1).max(80) }).parse(input)).handler(createSsrRpc("915c8edc13b3cf2cecc93b6e797ead74fc470d6234d9302c89a750f0d7ec2e55"));
function Home() {
	const [raw, setRaw] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [user, setUser] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const link = user ? composeDmUrl(user.id) : "";
	async function onSubmit(e) {
		e.preventDefault();
		setError("");
		setCopied(false);
		let username;
		try {
			username = normalizeUsername(raw);
		} catch (err) {
			setUser(null);
			setError(err instanceof Error ? err.message : "入力を確認してください");
			return;
		}
		setLoading(true);
		try {
			const resolved = await resolveXUser({ data: { username } });
			setUser(resolved);
		} catch (err) {
			setUser(null);
			setError(err instanceof Error ? err.message : "取得に失敗しました");
		} finally {
			setLoading(false);
		}
	}
	async function copyLink() {
		if (!link) return;
		await navigator.clipboard.writeText(link);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1600);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-wide text-muted",
				children: "X Direct Message"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-semibold tracking-tight text-fg",
				children: "DMリンク"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-prose text-sm leading-normal text-muted",
				children: "ユーザー名を入れると、その人宛のメッセージ作成リンクが出ます。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 rounded-xl bg-subtle p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "username",
						className: "text-sm font-medium text-muted",
						children: "ユーザー名"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "username",
							name: "username",
							value: raw,
							onChange: (e) => setRaw(e.target.value),
							placeholder: "@handle",
							autoCapitalize: "none",
							autoCorrect: "off",
							spellCheck: false,
							autoComplete: "off",
							"aria-invalid": error ? true : void 0,
							className: "min-h-11 flex-1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loading || !raw.trim(),
							className: "min-h-11 sm:w-28",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : "生成"
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-danger",
						role: "alert",
						children: error
					}) : null
				]
			}),
			user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 rounded-xl bg-subtle p-4",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"@",
							user.username,
							user.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-fg-subtle",
								children: [" · ", user.name]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 break-all font-mono text-sm leading-relaxed text-fg",
						children: link
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							onClick: copyLink,
							className: "min-h-11",
							children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "コピーしました" : "コピー"]
						})
					})
				]
			}) : null
		]
	});
}
//#endregion
export { Home as component };
