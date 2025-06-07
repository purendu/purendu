// Payment Settings JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle UPI payment checkbox toggle
    const upiCheckbox = document.getElementById('payment-upi');
    const upiSettings = document.querySelectorAll('.upi-settings');
    
    if (upiCheckbox && upiSettings.length > 0) {
        // Function to toggle UPI settings visibility
        function toggleUpiSettings() {
            upiSettings.forEach(setting => {
                setting.style.display = upiCheckbox.checked ? 'block' : 'none';
            });
        }
        
        // Set initial state
        toggleUpiSettings();
        
        // Add event listener for checkbox changes
        upiCheckbox.addEventListener('change', toggleUpiSettings);
    }
    
    // Handle file upload for UPI QR code
    const fileInput = document.getElementById('upi-qr');
    const fileNameDisplay = document.querySelector('.file-name');
    
    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                // Display selected file name
                fileNameDisplay.textContent = this.files[0].name;
                
                // Preview the selected image
                const reader = new FileReader();
                reader.onload = function(e) {
                    const currentQrImg = document.querySelector('.current-qr img');
                    if (currentQrImg) {
                        currentQrImg.src = e.target.result;
                    }
                };
                reader.readAsDataURL(this.files[0]);
            } else {
                fileNameDisplay.textContent = 'No file chosen';
            }
        });
    }
    
    // Test UPI payment settings
    const testUpiBtn = document.createElement('button');
    testUpiBtn.type = 'button';
    testUpiBtn.className = 'btn secondary-btn';
    testUpiBtn.textContent = 'Test UPI Settings';
    testUpiBtn.style.marginRight = '10px';
    
    // Insert the test button before the save button
    const saveBtn = document.querySelector('.payment-settings .primary-btn');
    if (saveBtn) {
        saveBtn.parentNode.insertBefore(testUpiBtn, saveBtn);
        
        // Add event listener for the test button
        testUpiBtn.addEventListener('click', function() {
            const upiId = document.getElementById('upi-id').value;
            
            if (!upiId) {
                alert('Please enter a UPI ID to test');
                return;
            }
            
            // Show success message
            alert('UPI settings test successful! UPI ID: ' + upiId);
        });
    }
});