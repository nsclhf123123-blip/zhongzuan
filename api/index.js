export const config = { runtime: "edge" };

export default async function handler(req) {
  try {
    const originUrl = new URL(req.url);
    const target = new URL("https://generativelanguage.googleapis.com");
    target.pathname = originUrl.pathname;
    target.search = originUrl.search;

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
