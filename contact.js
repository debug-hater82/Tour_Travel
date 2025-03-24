document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Ngừng hành động gửi form mặc định

    // Lấy dữ liệu từ form
    const name = event.target.querySelector('input[type="text"]').value;
    const email = event.target.querySelector('input[type="email"]').value;
    const message = event.target.querySelector('textarea').value;

    // Tạo đối tượng dữ liệu
    const contactData = { name, email, message };

    try {
        // Gửi dữ liệu đến server
        const response = await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactData),
        });

        // Xử lý phản hồi từ server
        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            event.target.reset(); // Xóa dữ liệu trong form nếu gửi thành công
        }
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Không thể gửi thông tin! Hãy thử lại.');
    }
});
