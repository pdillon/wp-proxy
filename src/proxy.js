import request from 'request';

export default function proxy(destination) {
  return function(ctx) {
    const {
      headers,
      url
      } = ctx.request;

    const {
      referer,
      origin,
      host
      } = headers;

    const [destScheme, destDomain] = destination.split('://');

    const rewriteHeaders = {
      host: destDomain
    };

    if (origin) {
      rewriteHeaders.origin = origin.replace(host, destDomain);
    }

    if (referer) {
      rewriteHeaders.referer = referer.replace(host, destDomain);
    }

    const proxyUrl = `${destScheme}://${destDomain}${url.length ? url : ''}`;
    const newHeaders = {...headers, ...rewriteHeaders};

    const requestParams = {
      url: proxyUrl,
      headers: newHeaders,
      method: ctx.method,
      encoding: null,
      body: getParsedBody(ctx)
    };

    if (!requestParams.body) {
      ctx.body = ctx.req.pipe(request(requestParams))
    } else {
      ctx.body = request(requestParams);
    }
  }
}

function getParsedBody(ctx) {
  const {body} = ctx.request;
  if (body == undefined) {
    return undefined;
  }
  const contentType = ctx.request.header['content-type'];
  if (!Buffer.isBuffer(body) && typeof body !== 'string') {
    if (contentType && contentType.indexOf('json') !== -1) {
      body = JSON.stringify(body);
    } else {
      body = body + '';
    }
  }
  return body;
}