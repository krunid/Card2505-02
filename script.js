document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const cardType = card.getAttribute('data-type');
            
            switch(cardType) {
                case 'sign':
                    alert('คุณเลือกการ์ดลงนาม');
                    // ใส่โค้ดสำหรับเปลี่ยนหน้าไปยังการ์ดลงนาม
                    break;
                case 'support':
                    alert('คุณเลือกการ์ดส่งกำลังใจ');
                    // ใส่โค้ดสำหรับเปลี่ยนหน้าไปยังการ์ดส่งกำลังใจ
                    break;
                case 'greeting':
                    alert('คุณเลือกการ์ดอวยพรวันสำคัญ');
                    // ใส่โค้ดสำหรับเปลี่ยนหน้าไปยังการ์ดอวยพร
                    break;
                default:
                    console.log('ไม่พบประเภทการ์ด');
            }
        });
    });
});
