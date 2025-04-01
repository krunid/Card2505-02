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

// ฟังก์ชันจัดการการส่งฟอร์ม
function submitSignForm(event) {
    event.preventDefault();
    showLoading();
    setTimeout(() => {
        const photo = document.getElementById('photo').files[0];
        const blessing = document.getElementById('blessing').value;
        const fullname = document.getElementById('fullname').value;
        const affiliation = document.getElementById('affiliation').value;

        console.log({
            photo: photo ? photo.name : 'ไม่มีรูป',
            blessing,
            fullname,
            affiliation
        });

        hideLoading();
        showPopup('สำเร็จ', 'ข้อมูลการลงนามถูกส่งเรียบร้อยแล้ว');
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
