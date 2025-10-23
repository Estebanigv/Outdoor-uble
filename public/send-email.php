<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Get JSON data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate required fields
if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos los campos obligatorios deben ser completados']);
    exit;
}

// Sanitize inputs
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags($data['phone']));
$message = htmlspecialchars(strip_tags($data['message']));
$participants = isset($data['participants']) ? htmlspecialchars(strip_tags($data['participants'])) : '';
$preferredDate = isset($data['preferredDate']) ? htmlspecialchars(strip_tags($data['preferredDate'])) : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit;
}

// Email configuration - IMPORTANTE: Cambia este email
$to = 'contacto@outdoornuble.cl'; // Tu email real de Hostinger
$subject = 'Nueva consulta de ' . $name;

// Format date if provided
$dateFormatted = '';
if (!empty($preferredDate)) {
    $date = new DateTime($preferredDate);
    $dateFormatted = $date->format('d/m/Y');
}

// Create HTML email
$htmlMessage = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; border-radius: 8px; padding: 30px; margin-bottom: 20px; }
        .header h1 { color: #0f172a; margin: 0 0 10px 0; }
        .header p { color: #64748b; margin: 0; }
        .content { background-color: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 30px; }
        .content h2 { color: #0f172a; margin: 0 0 20px 0; font-size: 18px; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
        td strong { color: #475569; }
        .message-box { margin-top: 30px; }
        .message-box h3 { color: #0f172a; margin-bottom: 10px; font-size: 16px; }
        .message-content { background-color: #f8f9fa; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px; }
        .message-content p { margin: 0; white-space: pre-wrap; }
        .footer { margin-top: 20px; padding: 20px; text-align: center; color: #94a3b8; font-size: 14px; }
        a { color: #3b82f6; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Nueva Consulta - Rafting Río Ñuble</h1>
            <p>Has recibido un nuevo mensaje de contacto</p>
        </div>

        <div class="content">
            <h2>Información del Cliente</h2>

            <table>
                <tr>
                    <td><strong>Nombre:</strong></td>
                    <td style="text-align: right;">' . $name . '</td>
                </tr>
                <tr>
                    <td><strong>Email:</strong></td>
                    <td style="text-align: right;"><a href="mailto:' . $email . '">' . $email . '</a></td>
                </tr>
                <tr>
                    <td><strong>Teléfono:</strong></td>
                    <td style="text-align: right;"><a href="tel:' . $phone . '">' . $phone . '</a></td>
                </tr>';

if (!empty($participants)) {
    $htmlMessage .= '
                <tr>
                    <td><strong>Participantes:</strong></td>
                    <td style="text-align: right;">' . $participants . '</td>
                </tr>';
}

if (!empty($dateFormatted)) {
    $htmlMessage .= '
                <tr>
                    <td><strong>Fecha Preferida:</strong></td>
                    <td style="text-align: right;">' . $dateFormatted . '</td>
                </tr>';
}

$htmlMessage .= '
            </table>

            <div class="message-box">
                <h3>Mensaje:</h3>
                <div class="message-content">
                    <p>' . nl2br($message) . '</p>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de Outdoor Ñuble</p>
        </div>
    </div>
</body>
</html>
';

// Create plain text version
$textMessage = "Nueva Consulta - Rafting Río Ñuble\n\n";
$textMessage .= "Información del Cliente:\n";
$textMessage .= "Nombre: $name\n";
$textMessage .= "Email: $email\n";
$textMessage .= "Teléfono: $phone\n";
if (!empty($participants)) {
    $textMessage .= "Participantes: $participants\n";
}
if (!empty($dateFormatted)) {
    $textMessage .= "Fecha Preferida: $dateFormatted\n";
}
$textMessage .= "\nMensaje:\n$message\n";

// Email headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Outdoor Ñuble <no-reply@outdoornuble.cl>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $htmlMessage, $headers)) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email enviado correctamente'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al enviar el email. Por favor intenta nuevamente.'
    ]);
}
?>
