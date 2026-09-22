import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { normalizeUsername } from "@/lib/x-user";

export type ResolvedXUser = {
  id: string;
  username: string;
  name: string;
};

export const resolveXUser = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({ username: z.string().min(1).max(80) }).parse(input),
  )
  .handler(async ({ data }): Promise<ResolvedXUser> => {
    const username = normalizeUsername(data.username);
    const res = await fetch(
      `https://api.fxtwitter.com/${encodeURIComponent(username)}`,
      { headers: { Accept: "application/json" } },
    );

    if (res.status === 404) {
      throw new Error("そのユーザーは見つかりませんでした");
    }
    if (!res.ok) {
      throw new Error("ユーザーの取得に失敗しました。しばらくして再試行してください");
    }

    const json = (await res.json()) as {
      user?: { id?: string | number; screen_name?: string; name?: string };
    };
    const id = json.user?.id != null ? String(json.user.id) : "";
    if (!id) {
      throw new Error("ユーザーIDを取得できませんでした");
    }

    return {
      id,
      username: json.user?.screen_name || username,
      name: json.user?.name || "",
    };
  });
