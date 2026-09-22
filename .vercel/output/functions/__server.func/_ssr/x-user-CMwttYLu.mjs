//#region node_modules/.nitro/vite/services/ssr/assets/x-user-CMwttYLu.js
var HANDLE_RE = /^[A-Za-z0-9_]{1,15}$/;
function normalizeUsername(raw) {
	const trimmed = raw.trim();
	const urlMatch = trimmed.match(/(?:x|twitter)\.com\/(?:#!\/)?@?([A-Za-z0-9_]{1,15})(?:\/|$|\?|#)/i);
	if (urlMatch) return urlMatch[1];
	const handle = trimmed.replace(/^@/, "");
	if (!HANDLE_RE.test(handle)) throw new Error("ユーザー名の形式が正しくありません");
	return handle;
}
function composeDmUrl(userId) {
	return `https://x.com/messages/compose?recipient_id=${userId}`;
}
//#endregion
export { normalizeUsername as n, composeDmUrl as t };
