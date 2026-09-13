export const config = { runtime: "edge" };

export default async function handler(req) {
  try {
    // 从请求头手动拼装路径，不再依赖 req.url
    const path = new URL(req.url, "https://dummy").pathname + new URL(req.url, "https://dummy").search;
    const target = new URL(path, "https://generativelanguage.googleapis.com");

    const h = new Headers(req.headers);
    h.delete("host");
    h.delete("x-forwarded-host");

    const res = await fetch(target, {
      method: req.method,
      headers: h,
      body: req.body,
      signal: req.signal
    });
    return new Response(res.body, res);
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
