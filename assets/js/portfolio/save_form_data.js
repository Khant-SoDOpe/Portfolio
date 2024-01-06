const contactForm = document.querySelector('#contact-form');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Get the contact form data
  const user_name = contactForm.querySelector('input[name="user_name"]');
  const user_email = contactForm.querySelector('input[name="user_email"]');
  const message = contactForm.querySelector('textarea[name="message"]');

  // Create a JavaScript object with the form data
  const formData = {
    user_name: user_name.value,
    user_email: user_email.value,
    message: message.value
  };

  // Convert the JavaScript object to JSON
  const jsonData = JSON.stringify(formData);

  // Make a POST request to the API route with JSON data
  fetch('https://api-khantzay-l7wj.onrender.com/api/contact-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData // Send the JSON data as the request body
  })
    .then(response => response.json())
    .then(data => {
      // Handle the success or error response from the API
      if (data.status === 'success') {
        // Show a success message to the user
        alert('Message sent successfully! ',user_name);
        
        // Clear the form fields
        user_name.value = '';
        user_email.value = '';
        message.value = '';
      } else {
        // Show an error message to the user
        alert('Error sending message. Please try again later.');
      }
    });
});
