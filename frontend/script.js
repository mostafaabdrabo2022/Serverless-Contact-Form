// Replace with your actual API Gateway Invoke URL
const API_BASE_URL = 'https://hk2ewzaxf0.execute-api.us-east-1.amazonaws.com/prod';

// DOM Elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const spinner = document.getElementById('spinner');
const statusMessage = document.getElementById('statusMessage');

const refreshStatsBtn = document.getElementById('refreshStatsBtn');
const totalCount = document.getElementById('totalCount');
const statsTableBody = document.getElementById('statsTableBody');

// 1. Submit Form Handler (POST /contact)
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear status
    hideStatus();
    setLoading(true);

    const payload = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            showStatus('تم إرسال رسالتك بنجاح وحفظها في قاعدة البيانات!', 'success');
            contactForm.reset();
        } else {
            showStatus(data.error || 'حدث خطأ أثناء إرسال الرسالة.', 'error');
        }
    } catch (err) {
        console.error('Fetch Error:', err);
        showStatus('تعذر الاتصال بالسيرفر. يرجى التأكد من رابط API Gateway.', 'error');
    } finally {
        setLoading(false);
    }
});

// 2. Fetch Stats Handler (GET /stats)
refreshStatsBtn.addEventListener('click', fetchStats);

async function fetchStats() {
    refreshStatsBtn.disabled = true;
    refreshStatsBtn.textContent = 'جاري التحميل...';

    try {
        const response = await fetch(`${API_BASE_URL}/stats`, {
            method: 'GET'
        });

        const data = await response.json();

        if (response.ok) {
            totalCount.textContent = data.total_messages || 0;
            renderTable(data.messages || []);
        } else {
            alert('خطأ أثناء جلب البيانات: ' + (data.error || 'Unknown error'));
        }
    } catch (err) {
        console.error('Fetch Stats Error:', err);
        alert('تعذر جلب الإحصائيات. قم بالتحقق من إعدادات CORS ورابط الـ API.');
    } finally {
        refreshStatsBtn.disabled = false;
        refreshStatsBtn.textContent = 'تحديث البيانات';
    }
}

// Helper Functions
function setLoading(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        btnText.textContent = 'جاري الإرسال...';
        spinner.classList.remove('hidden');
    } else {
        submitBtn.disabled = false;
        btnText.textContent = 'إرسال الرسالة';
        spinner.classList.add('hidden');
    }
}

function showStatus(text, type) {
    statusMessage.textContent = text;
    statusMessage.className = `status-message ${type}`;
    statusMessage.classList.remove('hidden');
}

function hideStatus() {
    statusMessage.classList.add('hidden');
}

function renderTable(messages) {
    if (messages.length === 0) {
        statsTableBody.innerHTML = '<tr><td colspan="4" class="text-center">لا توجد رسائل محفوظة حتى الآن.</td></tr>';
        return;
    }

    statsTableBody.innerHTML = messages.map(msg => `
        <tr>
            <td>${escapeHtml(msg.name || 'N/A')}</td>
            <td>${escapeHtml(msg.email || 'N/A')}</td>
            <td>${escapeHtml(msg.message || 'N/A')}</td>
            <td>${msg.timestamp ? new Date(msg.timestamp).toLocaleString('ar-EG') : 'N/A'}</td>
        </tr>
    `).join('');
}

function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}