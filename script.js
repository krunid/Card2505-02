// ฟังก์ชันแสดง Popup
function showPopup(title, bodyContent) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-body').innerHTML = bodyContent;
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('popup-btn').textContent = 'ตกลง';
    document.getElementById('popup-btn').style.display = 'block';
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

// ฟังก์ชันสำหรับการ์ดลงนาม
function showSignCardForm() {
    const formHTML = `
        <form id="sign-form" class="sign-form" onsubmit="submitSignForm(event)">
            <div class="form-group">
                <label for="photo">อัพโหลดรูปภาพ:</label>
                <input type="file" id="photo" accept="image/*" required>
            </div>
            <div class="form-group">
                <label for="blessing">เลือกคำถวายพระพร:</label>
                <select id="blessing" required>
                    <option value="">-- เลือกคำถวายพระพร --</option>
                    <option value="ขอพระองค์ทรงพระเจริญ">ขอพระองค์ทรงพระเจริญ</option>
                    <option value="ด้วยเกล้าด้วยกระหม่อม">ด้วยเกล้าด้วยกระหม่อม</option>
                    <option value="ขอเดชะ">ขอเดชะ</option>
                </select>
            </div>
            <div class="form-group">
                <label for="fullname">ชื่อ-นามสกุล:</label>
                <input type="text" id="fullname" required>
            </div>
            <div class="form-group">
                <label for="affiliation">หน่วยงาน/จังหวัด:</label>
                <input type="text" id="affiliation" required>
            </div>
            <button type="submit" class="popup-btn">ส่งข้อมูล</button>
        </form>
    `;
    showPopup('การ์ดลงนาม', formHTML);
    document.getElementById('popup-btn').style.display = 'none';
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

        // สร้าง URL ชั่วคราวสำหรับแสดงรูปภาพ
        const photoURL = photo ? URL.createObjectURL(photo) : 'https://via.placeholder.com/200x150?text=ไม่มีรูปภาพ';

        // สร้างเนื้อหา popup "สำเร็จ"
        const successHTML = `
            <div class="success-content">
                <img src="${photoURL}" alt="รูปภาพที่อัพโหลด" class="success-image">
                <div class="success-details">
                    <p><strong>คำถวายพระพร:</strong> ${blessing}</p>
                    <p><strong>ชื่อ-นามสกุล:</strong> ${fullname}</p>
                    <p><strong>หน่วยงาน/จังหวัด:</strong> ${affiliation}</p>
                </div>
            </div>
        `;

        hideLoading();
        showPopup('สำเร็จ', successHTML);
    }, 1000);
}

// ฟังก์ชันจัดการการเลือกการ์ด
function handleCardAction(cardType) {
    showLoading();
    setTimeout(() => {
        hideLoading();
        switch(cardType) {
            case 'sign':
                showSignCardForm();
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
