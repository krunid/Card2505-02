// ฟังก์ชันแสดง Popup
function showPopup(title, message) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-message').textContent = message;
    document.getElementById('popup').style.display = 'flex';
}

// ฟังก์ชันปิด Popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// ฟังก์ชันแสดง Loading
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

// ฟังก์ชันซ่อน Loading
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// ฟังก์ชันจัดการการเลือกการ์ด
function handleCardAction(cardType) {
    showLoading(); // แสดง loading
    setTimeout(() => { // จำลองการโหลด 1 วินาที
        hideLoading();
        switch(cardType) {
            case 'sign':
                showPopup('การ์ดลงนาม', 'กรุณาใส่ข้อความสำหรับลงนาม');
                // window.location.href = 'sign_card.html';
                break;
            case 'support':
                showPopup('การ์ดส่งกำลังใจ', 'ส่งคำพูดให้กำลังใจถึงคนที่คุณรัก');
                // window.location.href = 'support_card.html';
                break;
            case 'greeting':
                showPopup('การ์ดอวยพรวันสำคัญ', 'เลือกวันสำคัญและเขียนคำอวยพร');
                // window.location.href = 'greeting_card.html';
                break;
            default:
                console.log('ไม่พบประเภทการ์ด');
        }
    }, 1000); // หน่วงเวลา 1 วินาที
}

// ฟังก์ชันสำหรับปุ่มตั้งค่า
function openSettings() {
    showLoading(); // แสดง loading
    setTimeout(() => {
        hideLoading();
        showPopup('การตั้งค่า', 'คุณสามารถปรับแต่งธีม ฟอนต์ หรืออื่นๆ ได้ที่นี่');
        // window.location.href = 'settings.html';
    }, 1000);
}

// เพิ่ม event listener สำหรับการ์ด
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                const cardType = card.getAttribute('data-type');
                handleCardAction(cardType);
            }
        });
    });
});
