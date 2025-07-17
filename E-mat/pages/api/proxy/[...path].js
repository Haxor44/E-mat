export default async function proxyHandler(req, res) {
  // Extract path segments from URL
  const { path } = req.query;
  const backendUrl = process.env.API_URL;
  
  // Reconstruct backend URL
  const targetUrl = `${backendUrl}/${path.join('/')}`;
  
  try {
    // Forward request to backend service
    const backendResponse = await fetch(targetUrl, {
      method: req.method,
      headers: {
        // Filter out headers that shouldn't be forwarded
        ...Object.fromEntries(
          Object.entries(req.headers).filter(
            ([key]) => !['host', 'connection'].includes(key.toLowerCase())
        ))
      },
      body: req.method === 'GET' || req.method === 'HEAD' 
        ? undefined 
        : JSON.stringify(req.body),
    });

    // Forward backend response to client
    res.status(backendResponse.status);
    
    // Pipe headers
    for (const [key, value] of backendResponse.headers.entries()) {
      res.setHeader(key, value);
    }
    
    // Pipe response body
    const data = await backendResponse.text();
    res.send(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}