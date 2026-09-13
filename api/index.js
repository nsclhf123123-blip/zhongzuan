export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const targetUrl = new URL("https://generativelanguage.googleapis.com");
  targetUrl.pathname = url.pathname;
  targetUrl.search = url.search;

  // 过滤掉会导致转发失败的请求头
  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('x-forwarded-host');
  headers.delete('x-forwarded-port');
  headers.delete('x-forwarded-proto');

  const newRequest = new Request(targetUrl, {
    method: req.method,
    headers: headers,
    body: req.body
  });
  const res = await fetch(newRequest);
  return new Response(res.body, res);
}
