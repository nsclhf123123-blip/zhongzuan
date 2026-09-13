export default async function handler(req) {
  const url = new URL(req.url);
  const targetUrl = new URL("https://generativelanguage.googleapis.com");
  targetUrl.pathname = url.pathname;
  targetUrl.search = url.search;

  const newRequest = new Request(targetUrl, {
    method: req.method,
    headers: req.headers,
    body: req.body
  });
  const res = await fetch(newRequest);
  return new Response(res.body, res);
}
