// URL твоего Cloudflare Worker'а
const workerUrl = 'https://still-snow-4ac7.irkplast.workers.dev/'; 

let formData = {};

function showStep(step) {
  document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-step="${step}"]`).classList.add('active');

  if (step === 3) updatePreview();
}

function submitPost() {
  const postText = document.querySelector('[data-step="2"] textarea')?.value ||
                   document.getElementById('preview')?.innerText;

  if (!postText) {
      alert("Пост пустой!");
      return;
  }

  // Отправляем пост на сервер
  sendPostToServer(postText);
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

// Функция для отправки данных на сервер
async function sendPostToServer(postText) {
  try {
      const response = await fetch(workerUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              postText
          })
      });

      const result = await response.json();

      console.log('Ответ от сервера:', result);

      if (result && result.response && result.response.post_id) {
          showStep(4); // Переход к экрану успеха
      } else {
          alert('Ошибка при отправке поста');
          console.error(result);
      }
  } catch (error) {
      alert('Не удалось подключиться к серверу');
      console.error(error);
  }
}