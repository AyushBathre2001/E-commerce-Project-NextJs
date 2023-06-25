const services = {
  "462001":["Bhopal","Madhya Pradesh"],
  "461775":["Pipariya","Madhya Pradesh"]
};

export default function handler(req, res) {
  try {
    res.status(200).json({ pincodes: services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

