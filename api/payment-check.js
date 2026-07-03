// api/payment-check.js
// Secure server-to-server check for Casso bank transactions

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }

  const { orderId, amount, cassoKey } = req.query;

  if (!orderId || !amount) {
    return res.status(400).json({ success: false, error: 'Missing orderId or amount query parameter' });
  }

  try {
    // 1. Get Casso API key from environment variables or custom query parameter
    const apiKey = process.env.CASSO_API_KEY || cassoKey;

    // 2. Fallback to Simulation Mode if no API key is configured
    if (!apiKey) {
      console.log(`CASSO_API_KEY is missing. Operating payment-check in SIMULATION mode for Order ${orderId}.`);
      
      // We simulate a mock checking process where it returns paid: false initially,
      // but if the request has a query param 'simulate=success', we approve it.
      // Alternatively, the frontend can let the user click a simulation button.
      const isSimulatedSuccess = req.query.simulate === 'success';
      return res.status(200).json({
        success: true,
        mode: "simulation",
        paid: isSimulatedSuccess,
        message: isSimulatedSuccess 
          ? "Payment simulated successfully." 
          : "Waiting for payment in simulation mode. Configure CASSO_API_KEY to start verifying real bank transfers."
      });
    }

    // 3. Query the Casso API for recent transactions
    const url = 'https://api.casso.vn/v2/transactions?sort=desc&limit=50';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Apikey ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Casso API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    if (data.error !== 0) {
      throw new Error(`Casso API returned error code ${data.error}: ${data.message}`);
    }

    const records = data.data?.records || [];

    // 4. Scan recent transactions for a matching transfer description and amount
    const cleanOrderId = orderId.toUpperCase();
    const orderAmount = Number(amount);

    const matchingTx = records.find(r => {
      if (!r.description) return false;
      const desc = r.description.toUpperCase();
      
      // Check if transaction description contains the Order ID
      const matchesId = desc.includes(cleanOrderId);
      
      // Check if transaction amount is equal to or greater than the required amount
      const matchesAmount = Math.abs(r.amount) >= orderAmount;

      return matchesId && matchesAmount;
    });

    if (matchingTx) {
      return res.status(200).json({
        success: true,
        mode: "live",
        paid: true,
        transaction: {
          id: matchingTx.id,
          tid: matchingTx.tid,
          amount: matchingTx.amount,
          description: matchingTx.description,
          when: matchingTx.when
        }
      });
    }

    return res.status(200).json({
      success: true,
      mode: "live",
      paid: false,
      message: `No matching transaction found yet for order ${orderId} with amount ${amount}.`
    });

  } catch (error) {
    console.error("Error checking bank transaction:", error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}
