// api/checkout.js
// Vercel Serverless Function acting as a secure proxy to Pancake POS CRM

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }

  try {
    const orderData = req.body;
    
    // 1. Retrieve secure credentials from environment variables
    const apiKey = process.env.PANCAKE_API_KEY;
    const shopId = process.env.PANCAKE_SHOP_ID;

    // 2. Fallback to Simulation Mode if credentials are not configured yet
    if (!apiKey || !shopId) {
      console.warn("PANCAKE_API_KEY or PANCAKE_SHOP_ID is missing. Operating in SIMULATION mode.");
      
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockOrderId = Math.floor(100000 + Math.random() * 900000);
      return res.status(200).json({
        success: true,
        mode: "simulation",
        orderId: `PAN-${mockOrderId}`,
        message: "Order successfully simulated in sandbox mode. Add PANCAKE_API_KEY and PANCAKE_SHOP_ID to Vercel settings to connect to your live Pancake POS CRM."
      });
    }

    // 3. Map Gpaw Shop payload to Pancake POS API schema
    const payload = {
      order: {
        customer_name: orderData.customerName || 'Khách vãng lai',
        customer_phone: orderData.customerPhone || '',
        shipping_address: orderData.customerAddress || '',
        payment_method: orderData.payMethod === 'transfer' ? 'bank' : 'cod',
        note: `Đơn hàng từ Website Gpaw. Phương thức thanh toán: ${orderData.payMethod === 'transfer' ? 'Chuyển khoản' : 'COD'}. Paw đã dùng: ${orderData.pawUsed || 0}. Ghi chú: ${orderData.note || 'Không có'}`,
        products: [
          {
            name: `${orderData.product.name} (${orderData.size.label})`,
            price: orderData.size.salePrice,
            quantity: orderData.qty
          }
        ],
        discount_amount: orderData.discountAmount || 0
      }
    };

    // 4. Send secure server-to-server request to Pancake POS API
    const url = `https://pos.pages.fm/api/v1/shops/${shopId}/orders?api_key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'X-Pos-Api-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Pancake POS API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    return res.status(200).json({
      success: true,
      mode: "live",
      orderId: data.order?.id || data.id || `PAN-${Math.floor(100000 + Math.random() * 900000)}`,
      data: data
    });

  } catch (error) {
    console.error("Error creating order on Pancake:", error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}
