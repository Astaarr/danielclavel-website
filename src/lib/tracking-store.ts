const memoryStore = new Map<string, number>();

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const TRACKING_KEY = "bio:clicks";

function hasKvConfig() {
  return Boolean(KV_URL && KV_TOKEN);
}

async function incrementKv(slug: string): Promise<number | null> {
  if (!hasKvConfig()) {
    return null;
  }

  try {
    const endpoint = `${KV_URL}/hincrby/${TRACKING_KEY}/${encodeURIComponent(slug)}/1`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { result?: number };
    if (typeof data.result === "number") {
      return data.result;
    }
  } catch {
    return null;
  }

  return null;
}

function incrementMemory(slug: string) {
  const current = memoryStore.get(slug) ?? 0;
  const next = current + 1;
  memoryStore.set(slug, next);
  return next;
}

export async function incrementClick(slug: string) {
  const kvCount = await incrementKv(slug);
  if (kvCount !== null) {
    return { count: kvCount, source: "kv" as const };
  }

  return { count: incrementMemory(slug), source: "memory" as const };
}
