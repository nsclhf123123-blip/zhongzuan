export const config = { runtime: "edge" };

export default async function handler(req) {
  try {
    const baseUrl = new URL(req.url, "https://dummy");
    const path = baseUrl.pathname + baseUrl.search;
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

    // 读取原始返回body和headers
    const rawBody = await res.arrayBuffer();
    const newHeaders = new Headers(res.headers);
    // CORS跨域配置，允许前端网页访问
    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    newHeaders.set("Access-Control-Allow-Headers", "*");

    // 处理OPTIONS预检请求
    if (req.method === "OPTIONS") {
      return new Response(null, { status:204, headers:newHeaders });
    }
    return new Response(rawBody, { status: res.status, headers: newHeaders });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
