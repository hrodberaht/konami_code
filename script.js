window.addEventListener('keydown', logKey);

let password = '';
const secret = 'injects3crets';
let start;

async function fetchData() {
  const fetched = await fetch(
    'https://api.github.com/repos/elixir-lang/elixir/issues',
  );
  return await fetched.json();
}

async function checkKonamiCode(password) {
  if (password === secret) {
    const div = document.createElement('div');
    const data = await fetchData();

    data.slice(0, 5).map(data => {
      const p = document.createElement('p');
      p.innerHTML = `Name: ${data.title} | Nickname: ${
        data.user.login
      }`;
      div.appendChild(p);
    });
    document.body.appendChild(div);

    setTimeout(() => {
      document.body.removeChild(div);
    }, 15000);
  }
}

function logKey(e) {
  if (start) clearInterval(start);
  start = setTimeout(() => (password = ''), 5000);
  e.key === 'Escape' ? (password = '') : (password += e.key);
  checkKonamiCode(password);
}
