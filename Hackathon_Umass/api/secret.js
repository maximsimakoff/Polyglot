export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    const secretString = process.env.SECRET_STRING;
    
    if (!secretString) {
      return res.status(500).json({ error: 'Secret not configured' });
    }
  
    res.status(200).json({ secret: secretString });
}