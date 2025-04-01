// ฟังก์ชันแสดง Popup
function showPopup(title, bodyContent) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-body').innerHTML = bodyContent;
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('popup-btn').textContent = 'ตกลง';
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
    showLoading();
    setTimeout(() => {
        hideLoading();
        switch(cardType) {
            case 'sign':
                window.location.href = 'sign_card.html'; // Redirect ไปหน้าใหม่
                break;
            case 'support':
                showPopup('การ์ดส่งกำลังใจ', 'ส่งคำพูดให้กำลังใจถึงคนที่คุณรัก');
                break;
            case 'greeting':
                showPopup('การ์ดอวยพรวันสำคัญ', 'เลือกวันสำคัญและเขียนคำอวยพร');
                break;
            default:
                console.log('ไม่พบประเภทการ์ด');
        }
    }, 1000);
}

// ฟังก์ชันสำหรับปุ่มตั้งค่า
function openSettings() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showPopup('การตั้งค่า', 'คุณสามารถปรับแต่งธีม ฟอนต์ หรืออื่นๆ ได้ที่นี่');
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
