// ฟังก์ชันสำหรับปุ่มตั้งค่า (Telegram Settings)
function openSettings() {
    // ดึงข้อมูล Telegram เดิมจาก localStorage (ถ้ามี)
    const savedTelegramData = JSON.parse(localStorage.getItem('telegramSettings')) || {};
    const telegramId = savedTelegramData.telegramId || '';
    const telegramToken = savedTelegramData.telegramToken || '';

    const settingsHTML = `
        <form id="telegram-form" class="telegram-form" onsubmit="saveTelegramSettings(event)">
            <div class="form-group">
                <label for="telegram-id">Telegram ID:</label>
                <input type="text" id="telegram-id" value="${telegramId}" placeholder="เช่น @YourTelegramID" required>
            </div>
            <div class="form-group">
                <label for="telegram-token">Telegram Bot Token:</label>
                <input type="text" id="telegram-token" value="${telegramToken}" placeholder="เช่น 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" required>
            </div>
            <button type="submit" class="popup-btn">บันทึก</button>
        </form>
    `;
    showPopup('ตั้งค่า Telegram', settingsHTML);
    document.getElementById('popup-btn').style.display = 'none';
}

// ฟังก์ชันบันทึกข้อมูล Telegram
function saveTelegramSettings(event) {
    event.preventDefault();
    showLoading();

    const telegramId = document.getElementById('telegram-id').value;
    const telegramToken = document.getElementById('telegram-token').value;

    const telegramData = {
        telegramId: telegramId,
        telegramToken: telegramToken,
        timestamp: new Date().toISOString()
    };

    // บันทึกข้อมูลลง localStorage
    localStorage.setItem('telegramSettings', JSON.stringify(telegramData));

    setTimeout(() => {
        hideLoading();
        showPopup('สำเร็จ', 'ตั้งค่า Telegram ถูกบันทึกเรียบร้อยแล้ว');
    }, 1000);
}

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
                    <option value="ขอพระองค์ทรงพระเจริญยิ่งยืนนาน">ขอพระองค์ทรงพระเจริญยิ่งยืนนาน</option>
                    <option value="ขอพระองค์ทรงมีพระพลานามัยแข็งแรง">ขอพระองค์ทรงมีพระพลานามัยแข็งแรง</option>
                    <option value="ขอพระองค์ทรงพระเกษมสำราญ">ขอพระองค์ทรงพระเกษมสำราญ</option>
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

// ฟังก์ชันจัดการการส่งฟอร์มและบันทึกข้อมูล
function submitSignForm(event) {
    event.preventDefault();
    showLoading();

    const photoInput = document.getElementById('photo');
    const blessing = document.getElementById('blessing').value;
    const fullname = document.getElementById('fullname').value;
    const affiliation = document.getElementById('affiliation').value;
    const photo = photoInput.files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
        const photoBase64 = e.target.result;

        // บันทึกข้อมูลลง localStorage
        const signData = {
            photo: photoBase64,
            blessing: blessing,
            fullname: fullname,
            affiliation: affiliation,
            timestamp: new Date().toISOString()
        };

        let savedData = JSON.parse(localStorage.getItem('signCardData')) || [];
        savedData.push(signData);
        localStorage.setItem('signCardData', JSON.stringify(savedData));

        // สร้างเนื้อหา popup "สำเร็จ"
        const successHTML = `
            <div class="success-content">
                <img src="${photoBase64}" alt="รูปภาพที่อัพโหลด" class="success-image">
                <div class="success-details">
                    <p><strong>ขอถวายพระพร:</strong> ${blessing}</p>
                    <p><strong>ด้วยเกล้า ด้วยกระหม่อม ขอเดชะ</strong></p>
                    <p><strong>ข้าพระุทธเจ้า:</strong> ${fullname}</p>
                    <p><strong>หน่วยงาน/จังหวัด:</strong> ${affiliation}</p>
                </div>
            </div>
        `;

        hideLoading();
        showPopup('สำเร็จ', successHTML);
    };

    reader.onerror = function() {
        console.error('เกิดข้อผิดพลาดในการอ่านไฟล์รูปภาพ');
        hideLoading();
        showPopup('ข้อผิดพลาด', 'ไม่สามารถอ่านรูปภาพได้ กรุณาลองใหม่');
    };

    if (photo) {
        reader.readAsDataURL(photo);
    } else {
        // กรณีไม่มีรูปภาพ (ไม่ควรเกิดขึ้นเพราะ required)
        const successHTML = `
            <div class="success-content">
                <img src="https://via.placeholder.com/200x150?text=ไม่มีรูปภาพ" alt="ไม่มีรูปภาพ" class="success-image">
                <div class="success-details">
                    <p><strong>ขอถวายพระพร:</strong> ${blessing}</p>
                    <p><strong>ด้วยเกล้า ด้วยกระหม่อม ขอเดชะ</strong></p>
                    <p><strong>ข้าพระุทธเจ้า:</strong> ${fullname}</p>
                    <p><strong>หน่วยงาน/จังหวัด:</strong> ${affiliation}</p>
                </div>
            </div>
        `;
        hideLoading();
        showPopup('สำเร็จ', successHTML);
    }
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
