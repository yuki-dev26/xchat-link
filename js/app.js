const HANDLE_RE = /^[A-Za-z0-9_]{1,15}$/;

const form = document.getElementById("form");
const input = document.getElementById("username");
const submit = document.getElementById("submit");
const errorEl = document.getElementById("error");
const result = document.getElementById("result");
const meta = document.getElementById("meta");
const linkEl = document.getElementById("link");
const copyBtn = document.getElementById("copy");

let currentLink = "";

function normalizeUsername(raw) {
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

function setError(msg) {
  errorEl.hidden = !msg;
  errorEl.textContent = msg || "";
}

function setMeta(screen, name) {
  meta.replaceChildren();
  meta.append(document.createTextNode("@" + screen));
  if (name) {
    const sep = document.createElement("span");
    sep.className = "meta-name";
    sep.textContent = " · " + name;
    meta.append(sep);
  }
}

input.addEventListener("input", () => {
  submit.disabled = !input.value.trim();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setError("");
  result.hidden = true;
  currentLink = "";

  let username;
  try {
    username = normalizeUsername(input.value);
  } catch (err) {
    setError(err.message);
    return;
  }

  submit.disabled = true;
  submit.textContent = "…";
  try {
    const res = await fetch(
      "https://api.fxtwitter.com/" + encodeURIComponent(username),
    );
    if (res.status === 404) {
      throw new Error("そのユーザーは見つかりませんでした");
    }
    if (!res.ok) {
      throw new Error(
        "ユーザーの取得に失敗しました。しばらくして再試行してください",
      );
    }
    const data = await res.json();
    const id = data?.user?.id != null ? String(data.user.id) : "";
    if (!id) {
      throw new Error("ユーザーIDを取得できませんでした");
    }
    const screen = data.user.screen_name || username;
    const name = data.user.name || "";
    currentLink = "https://x.com/messages/compose?recipient_id=" + id;
    setMeta(screen, name);
    linkEl.textContent = currentLink;
    copyBtn.textContent = "コピー";
    result.hidden = false;
  } catch (err) {
    setError(err.message || "取得に失敗しました");
  } finally {
    submit.textContent = "生成";
    submit.disabled = !input.value.trim();
  }
});

copyBtn.addEventListener("click", async () => {
  if (!currentLink) return;
  await navigator.clipboard.writeText(currentLink);
  copyBtn.textContent = "コピーしました";
  window.setTimeout(() => {
    copyBtn.textContent = "コピー";
  }, 1600);
});
