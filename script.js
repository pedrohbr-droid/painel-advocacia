function executarCalculo() {
  const lei = document.getElementById('calc-lei').value;
  const dataInput = document.getElementById('calc-data').value;
  const dias = parseInt(document.getElementById('calc-dias').value);
  const resultadoEl = document.getElementById('calc-resultado');

  if (!dataInput || isNaN(dias) || dias <= 0) {
    alert('Por favor, informe a data de publicação e a quantidade de dias válida.');
    return;
  }

  let data = new Date(dataInput + 'T00:00:00');
  let diasContados = 0;
  const apenasDiasUteis = lei !== 'cpp';

  while (diasContados < dias) {
    data.setDate(data.getDate() + 1);
    const diaSemana = data.getDay();

    if (apenasDiasUteis) {
      if (diaSemana !== 0 && diaSemana !== 6) {
        diasContados++;
      }
    } else {
      diasContados++;
    }
  }

  if (!apenasDiasUteis) {
    if (data.getDay() === 6) data.setDate(data.getDate() + 2);
    else if (data.getDay() === 0) data.setDate(data.getDate() + 1);
  }

  const dataFinal = data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  resultadoEl.style.display = 'block';
  resultadoEl.innerHTML = `Data Fatal (${lei.toUpperCase()}): <strong>${dataFinal}</strong>`;
}

document.getElementById('lead-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const statusEl = document.getElementById('lead-status');
  statusEl.innerText = 'Solicitação enviada com sucesso! Nossa equipe entrará em contato em instantes.';
  e.target.reset();

  setTimeout(() => {
    statusEl.innerText = '';
  }, 6000);
});