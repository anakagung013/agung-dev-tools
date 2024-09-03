<?php
require_once 'Midtrans.php';

// Configurations
\Midtrans\Config::$serverKey = 'YOUR_SERVER_KEY';
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

$transaction_details = array(
    'order_id' => 'order-id-123',
    'gross_amount' => 100000, // Amount in Rupiah
);

$item_details = array(
    array(
        'id' => 'item01',
        'price' => 100000,
        'quantity' => 1,
        'name' => 'Premium Subscription'
    ),
);

$customer_details = array(
    'first_name' => 'John',
    'last_name' => 'Doe',
    'email' => 'john.doe@example.com',
    'phone' => '08123456789',
);

$transaction = array(
    'payment_type' => 'credit_card',
    'credit_card' => array(
        'secure' => true
    ),
    'transaction_details' => $transaction_details,
    'item_details' => $item_details,
    'customer_details' => $customer_details
);

$snapToken = \Midtrans\Snap::getSnapToken($transaction);
echo json_encode(array('snapToken' => $snapToken));
?>
