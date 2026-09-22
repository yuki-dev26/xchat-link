import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { n as normalizeUsername } from "./x-user-CMwttYLu.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resolve-x-user-DXzmNJLo.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var resolveXUser_createServerFn_handler = createServerRpc({
	id: "915c8edc13b3cf2cecc93b6e797ead74fc470d6234d9302c89a750f0d7ec2e55",
	name: "resolveXUser",
	filename: "src/lib/resolve-x-user.ts"
}, (opts) => resolveXUser.__executeServer(opts));
var resolveXUser = createServerFn({ method: "POST" }).validator((input) => object({ username: string().min(1).max(80) }).parse(input)).handler(resolveXUser_createServerFn_handler, async ({ data }) => {
	const username = normalizeUsername(data.username);
	const res = await fetch(`https://api.fxtwitter.com/${encodeURIComponent(username)}`, { headers: { Accept: "application/json" } });
	if (res.status === 404) throw new Error("そのユーザーは見つかりませんでした");
	if (!res.ok) throw new Error("ユーザーの取得に失敗しました。しばらくして再試行してください");
	const json = await res.json();
	const id = json.user?.id != null ? String(json.user.id) : "";
	if (!id) throw new Error("ユーザーIDを取得できませんでした");
	return {
		id,
		username: json.user?.screen_name || username,
		name: json.user?.name || ""
	};
});
//#endregion
export { resolveXUser_createServerFn_handler };
