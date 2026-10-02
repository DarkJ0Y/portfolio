<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Set your email address where you want to receive messages
    $to = "sudiptosarkarjoy@gmail.com"; // Replace with your email address

    // Set email subject
    $subject = "New Message from Portfolio Contact Form";

    // Compose the email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message";

    // Set email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Email sent successfully
        echo "<script>alert('Thank you! Your message has been sent.'); window.location.href = 'index.html';</script>";
    } else {
        // Failed to send email
        echo "<script>alert('Oops! Something went wrong. Please try again later.'); window.location.href = 'index.html';</script>";
    }
} else {
    // If the form is not submitted, redirect to the homepage
    header("Location: index.html");
    exit();
}
?>