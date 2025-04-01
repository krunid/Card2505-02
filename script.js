// ฟังก์ชันแสดง Popup
function showPopup(title, bodyContent, onConfirm = null) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-body').innerHTML = bodyContent;
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('popup-btn').textContent = 'ตกลง';
    document.getElementById('popup-btn').style.display = 'block';
    if (onConfirm) {
        document.getElementById('popup-btn').onclick = function() {
            onConfirm();
            closePopup();
        };
    } else {
        document.getElementById('popup-btn').onclick = closePopup;
    }
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

// ฟังก์ชันส่งข้อความไป Telegram
function sendToTelegram(message) {
    const telegramData = JSON.parse(localStorage.getItem('telegramSettings'));
    if (!telegramData || !telegramData.telegramId || !telegramData.telegramToken) {
        showPopup('ข้อผิดพลาด', 'กรุณาตั้งค่า Telegram ID และ Bot Token ก่อนในเมนู "ตั้งค่า"');
        return;
    }

    const chatId = telegramData.telegramId;
    const botToken = telegramData.telegramToken;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // ตรวจสอบข้อมูลก่อนส่ง
    console.log('Sending to Telegram:', { chatId, botToken, message });

    showLoading();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        hideLoading();
        console.log('Telegram Response:', data); // ดีบักผลลัพธ์
        if (data.ok) {
            showPopup('สำเร็จ', 'ส่งข้อความไปยัง Telegram เรียบร้อยแล้ว');
        } else {
            showPopup('ข้อผิดพลาด', `ไม่สามารถส่งไป Telegram ได้: ${data.description}\nกรุณาตรวจสอบ Telegram ID และ Bot Token`);
        }
    })
    .catch(error => {
        hideLoading();
        console.error('Error sending to Telegram:', error);
        showPopup('ข้อผิดพลาด', `เกิดข้อผิดพลาดในการเชื่อมต่อ: ${error.message}\nกรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต`);
    });
}

// ฟังก์ชันสำหรับปุ่มตั้งค่า (Telegram Settings)
function openSettings() {
    const savedTelegramData = JSON.parse(localStorage.getItem('telegramSettings')) || {};
    const telegramId = savedTelegramData.telegramId || '';
    const telegramToken = savedTelegramData.telegramToken || '';

    const settingsHTML = `
        <form id="telegram-form" class="telegram-form" onsubmit="saveTelegramSettings(event)">
            <div class="form-group">
                <label for="telegram-id">Telegram ID (เช่น @Username หรือ Chat ID):</label>
                <input type="text" id="telegram-id" value="${telegramId}" placeholder="เช่น @YourTelegramID หรือ 123456789" required>
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

    localStorage.setItem('telegramSettings', JSON.stringify(telegramData));

    setTimeout(() => {
        hideLoading();
        const successHTML = `
            <div class="success-content">
                <div class="success-details">
                    <p><strong>Telegram ID:</strong> ${telegramId}</p>
                    <p><strong>Telegram Bot Token:</strong> ${telegramToken}</p>
                    <p><strong>บันทึกเมื่อ:</strong> ${new Date(telegramData.timestamp).toLocaleString('th-TH')}</p>
                </div>
            </div>
        `;
        const message = `ตั้งค่า Telegram:\nTelegram ID: ${telegramId}\nTelegram Bot Token: ${telegramToken}\nบันทึกเมื่อ: ${new Date(telegramData.timestamp).toLocaleString('th-TH')}`;
        showPopup('สำเร็จ', successHTML, () => sendToTelegram(message));
    }, 1000);
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

        const successHTML = `
            <div class="success-content">
                <img src="${photoBase64}" alt="รูปภาพที่อัพโหลด" class="success-image">
                <div class="success-details">
                    <p><strong>ขอถวายพระพร:</strong> ${blessing}</p>
                    <p><strong>ด้วยเกล้า ด้วยกระหม่อม ขอเดชะ</strong></p>
                    <p><strong>ข้าพระพุทธเจ้า:</strong> ${fullname}</p>
                    <p><strong>หน่วยงาน/จังหวัด:</strong> ${affiliation}</p>
                </div>
            </div>
        `;
        const message = `การ์ดลงนาม:\nขอถวายพระพร: ${blessing}\nด้วยเกล้า ด้วยกระหม่อม ขอเดชะ\nข้าพระพุทธเจ้า: ${fullname}\nหน่วยงาน/จังหวัด: ${affiliation}\nวันที่: ${new Date(signData.timestamp).toLocaleString('th-TH')}`;
        hideLoading();
        showPopup('สำเร็จ', successHTML, () => sendToTelegram(message));
    };

    reader.onerror = function() {
        console.error('เกิดข้อผิดพลาดในการอ่านไฟล์รูปภาพ');
        hideLoading();
        showPopup('ข้อผิดพลาด', 'ไม่สามารถอ่านรูปภาพได้ กรุณาลองใหม่');
    };

    if (photo) {
        reader.readAsDataURL(photo);
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
