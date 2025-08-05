const webhookURL = 'https://eo7mk5x5am79c6w.m.pipedream.net';

function sendInvitation() {
  const name = document.getElementById('customerName').value.trim();
  const email = document.getElementById('customerEmail').value.trim();
  const sendButton = document.getElementById('sendButton');

  if (name === '' || email === '') {
    alert('Please fill in both fields.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  sendButton.disabled = true;
  sendButton.innerText = 'Sending...';

  const data = { name, email };

  fetch(webhookURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('formPage').style.display = 'none';
      document.getElementById('successPage').style.display = 'block';
    } else {
      alert('Failed to send. Please try again.');
    }
    sendButton.disabled = false;
    sendButton.innerText = 'Ask for Review';
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
    sendButton.disabled = false;
    sendButton.innerText = 'Ask for Review';
  });
}

function resetForm() {
  document.getElementById('customerName').value = '';
  document.getElementById('customerEmail').value = '';
  document.getElementById('successPage').style.display = 'none';
  document.getElementById('formPage').style.display = 'block';
}
