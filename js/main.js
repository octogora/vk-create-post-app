let formData = {};

function showStep(step) {
  document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-step="${step}"]`).classList.add('active');

  if (step === 3) updatePreview();
}

function submitPost() {
  alert("Функция отправки пока отключена (следующий шаг разработки).");
  showStep(4);
}

function updatePreview() {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const category = document.getElementById('category').value;
  const location = document.getElementById('location').value.trim();
  const contacts = document.getElementById('contacts').value.trim();

  let preview = `📌 ${title || '[Заголовок]'}`;
  preview += `\n\n${content || '[Основной текст]'}`;

  if (location) preview += `\n\n📍 ${location}`;
  if (contacts) preview += `\n📞 ${contacts}`;

  const categoryMap = {
    prodam: '#продажа',
    kuplu: '#куплю',
    otdam: '#отдам',
    ishu: '#ищу',
    usluga: '#услуга'
  };

  preview += `\n\n#${categoryMap[category] || ''}`;

  document.getElementById('preview').innerText = preview;
}

// Обновление при изменении полей
document.addEventListener('input', e => {
  if ([ 'title', 'content', 'location', 'contacts' ].includes(e.target.id)) {
    updatePreview();
  }
});

// Обновление при смене категории
document.getElementById('category').addEventListener('change', updatePreview);