const HANDLE_RE = /^[A-Za-z0-9_]{1,15}$/;

export function normalizeUsername(raw: string): string {
  const trimmed = raw.trim();
  const urlMatch = trimmed.match(
    /(?:x|twitter)\.com\/(?:#!\/)?@?([A-Za-z0-9_]{1,15})(?:\/|$|\?|#)/i,
  );
  if (urlMatch) return urlMatch[1];
  const handle = trimmed.replace(/^@/, "");
  if (!HANDLE_RE.test(handle)) {
    throw new Error("ユーザー名の形式が正しくありません");
  }
  return handle;
}

export function composeDmUrl(userId: string): string {
  return `https://x.com/messages/compose?recipient_id=${userId}`;
}
