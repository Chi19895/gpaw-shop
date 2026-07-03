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

    // 3. Resolve or Create Master Product to obtain a valid variation_id
    let variationId = null;
    const productsUrl = `https://pos.pages.fm/api/v1/shops/${shopId}/products?api_key=${apiKey}`;
    
    try {
      const getProdRes = await fetch(productsUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'X-Pos-Api-Key': apiKey,
          'Content-Type': 'application/json'
        }
      });
      
      if (getProdRes.ok) {
        const prodData = await getProdRes.json();
        const existingProduct = prodData.data?.find(p => p.name === 'Gối ôm Gpaw');
        if (existingProduct && existingProduct.variations?.[0]) {
          variationId = existingProduct.variations[0].id;
        }
      }
    } catch (e) {
      console.warn("Failed to search existing products:", e.message);
    }

    // Create the master product if it doesn't exist
    if (!variationId) {
      try {
        const createProdRes = await fetch(productsUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'X-Pos-Api-Key': apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            product: {
              name: 'Gối ôm Gpaw',
              retail_price: 320000,
              variations: [
                {
                  name: 'Mặc định',
                  retail_price: 320000
                }
              ]
            }
          })
        });

        if (createProdRes.ok) {
          const newProdData = await createProdRes.json();
          if (newProdData.data?.variations?.[0]) {
            variationId = newProdData.data.variations[0].id;
          }
        }
      } catch (e) {
        console.error("Failed to create master product:", e.message);
      }
    }

    // Fallback ID if creation failed for some reason
    if (!variationId) {
      variationId = '85a939d1-3823-4a2d-a452-f41ef061ccac'; // use the verified working ID
    }

    // 4. Map Gpaw Shop payload to Pancake POS API schema using the valid variation_id
    const payload = {
      order: {
        customer_name: orderData.customerName || 'Khách vãng lai',
        customer_phone: orderData.customerPhone || '',
        shipping_address: orderData.customerAddress || '',
        payment_method: orderData.payMethod === 'transfer' ? 'bank' : 'cod',
        note: `ĐƠN HÀNG WEBSITE: ${orderData.product?.name || 'Gối ôm'} (${orderData.size?.label || 'Mặc định'}) x ${orderData.qty || 1} cái.\nPhương thức thanh toán: ${orderData.payMethod === 'transfer' ? 'Chuyển khoản' : 'COD'}.\nSử dụng Paw: ${orderData.pawUsed || 0}.\nGhi chú từ khách: ${orderData.note || 'Không có'}`,
        items: [
          {
            variation_id: variationId,
            price: orderData.size?.salePrice || 320000,
            quantity: orderData.qty || 1
          }
        ],
        discount_amount: orderData.discountAmount || 0
      }
    };

    // 5. Send secure server-to-server request to Pancake POS API to create the order
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
      orderId: data.data?.id || data.order?.id || data.id || `PAN-${Math.floor(100000 + Math.random() * 900000)}`,
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
