export default function handler(req, res) {
    if (req.method === 'POST') {
        console.log('Data received:', req.body);
        // You would handle file and data processing here.
        res.status(200).json({ message: 'Data received successfully!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
