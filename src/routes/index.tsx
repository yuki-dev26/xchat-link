import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, Copy, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resolveXUser, type ResolvedXUser } from "@/lib/resolve-x-user";
import { composeDmUrl, normalizeUsername } from "@/lib/x-user";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<ResolvedXUser | null>(null);
  const [copied, setCopied] = useState(false);

  const link = user ? composeDmUrl(user.id) : "";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setCopied(false);
    let username: string;
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

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center px-5 py-12">
      <p className="text-sm font-medium tracking-wide text-muted">X Direct Message</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg">DMリンク</h1>
      <p className="mt-3 max-w-prose text-sm leading-normal text-muted">
        ユーザー名を入れると、その人宛のメッセージ作成リンクが出ます。
      </p>

      <form onSubmit={onSubmit} className="mt-8 rounded-xl bg-subtle p-4">
        <label htmlFor="username" className="text-sm font-medium text-muted">
          ユーザー名
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Input
            id="username"
            name="username"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder="@handle"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            autoComplete="off"
            aria-invalid={error ? true : undefined}
            className="min-h-11 flex-1"
          />
          <Button type="submit" disabled={loading || !raw.trim()} className="min-h-11 sm:w-28">
            {loading ? <LoaderCircle className="size-4 animate-spin" /> : "生成"}
          </Button>
        </div>
        {error ? (
          <p className="mt-3 text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      {user ? (
        <section className="mt-5 rounded-xl bg-subtle p-4" aria-live="polite">
          <p className="text-sm text-muted">
            @{user.username}
            {user.name ? <span className="text-fg-subtle"> · {user.name}</span> : null}
          </p>
          <p className="mt-3 break-all font-mono text-sm leading-relaxed text-fg">{link}</p>
          <div className="mt-4">
            <Button type="button" variant="secondary" onClick={copyLink} className="min-h-11">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "コピーしました" : "コピー"}
            </Button>
          </div>
        </section>
      ) : null}
    </main>
  );
}
