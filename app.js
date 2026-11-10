const records = [
  {
    t: 'Otros tejidos',
    d: '2024-04-18',
    s: 'No recolectada',
    h: 'Posible muestra de orina u otro tejido específico, solo según valoración profesional.',
    n: 'Registro de planificación O-001. Piel, médula ósea u otras biopsias requieren indicación clínica; no se obtienen para esta demostración.',
    
  },
  {
    t: 'Saliva',
    d: '2020-01-16',
    s: 'Registro de referencia',
    h: 'Perfil ilustrativo A.',
    n: 'Muestra S-001. La saliva contiene diferentes tipos de células, por lo que no se puede considerar una mezcla de un solo tipo de tejido.',
    q: 'Calidad de la muestra: aceptable. Se puede utilizar para comparar el perfil genético con otras muestras de referencia, pero hay que tener en cuenta que contiene celulas de distintos orígenes, se requiere la realizacion de pruebas adicionales.'
  },
  {
    t: 'Pelo con raíz',
    d: '2020-01-16',
    s: 'No concluyente',
    h: 'ADN nuclear insuficiente en el ejemplo. No permite comparar.',
    n: 'Muestra simulada P-001. Tener raíz no garantiza material nuclear suficiente. No interpretar ausencia de señal como ausencia de quimerismo.',
    q: 'Calidad de la muestra: insuficiente. Recolección adicional solo si estuviera justificada por profesionales.'
  },
  {
    t: 'Sangre',
    d: '2020-01-16',
    s: 'Registro de referencia',
    h: 'Perfil ilustrativo A en los marcadores comparados.',
    n: 'Muestra simulada B-001. La comparación de ADN nuclear refleja sobre todo leucocitos, no todos los tejidos.',
    q: 'Calidad de la muestra: aceptable. Sin antecedentes de transfusión o trasplante en el guion del caso.'
  },
  {
    t: 'Saliva',
    d: '2024-03-20',
    s: 'Por validar',
    h: 'Señal adicional ficticia en algunos marcadores; causa sin determinar.',
    n: 'Muestra simulada S-002. Revisar identidad, contaminación y mezcla celular antes de interpretar. No se asigna un diagnóstico.',
    q: 'Calidad de la muestra: requiere revisión. Solicitar evaluación del laboratorio dentro del escenario educativo.'
  },
  {
    t: 'Pelo con raíz',
    d: '2024-04-15',
    s: 'Repetición ilustrativa',
    h: 'Perfil ilustrativo A; no resuelve el hallazgo de saliva.',
    n: 'Muestra simulada P-002. Un resultado concordante en esta muestra no excluye diferencias en otras células.',
    q: 'Calidad de la muestra: aceptable. Nota de revisión: conservar el resultado anterior sin sobrescribirlo.'
  },
  {
    t: 'Sangre',
    d: '2024-04-15',
    s: 'Seguimiento',
    h: 'Perfil ilustrativo A; caso pendiente de revisión especializada.',
    n: 'Muestra simulada B-002. No extrapolar al organismo completo ni usar para decisiones de trasplante.',
    q: 'Calidad de la muestra: aceptable. Fecha del informe simulado: 18 abr 2024.'
  }
];

let active = 'Todos';

function render() {
  const visible = records.filter((record) => (
    active === 'Todos' || record.t === active
  ));

  document.querySelector('#count').textContent = `${visible.length} registros`;
  document.querySelector('#records').innerHTML = visible
    .map((record) => `
      <article class="record">
        <div class="record-top">
          <h4>${record.t}<span class="tag">${record.s}</span></h4>
          <time datetime="${record.d}">${new Date(`${record.d}T12:00:00`).toLocaleDateString('es', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}</time>
        </div>
        <p>${record.h}</p>
        <details>
          <summary>Ver notas y calidad de la muestra</summary>
          <p>${record.n}</p>
          <p>${record.q}</p>
        </details>
      </article>
    `)
    .join('');
}

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    active = button.dataset.filter;

    document.querySelectorAll('[data-filter]').forEach((filterButton) => {
      filterButton.setAttribute('aria-pressed', String(filterButton === button));
    });

    render();
  });
});

document.querySelector('#simulate').addEventListener('click', (event) => {
  const item = document.createElement('li');
  item.id = 'simulated';
  item.innerHTML = `
    <small>12 OCT 2026 · SIMULADO</small>
    <b>Seguimiento añadido</b>
    <p>Revisión educativa de notas. Sin nuevas muestras ni conclusión diagnóstica.</p>
  `;

  document.querySelector('.timeline').append(item);
  document.querySelector('#feedback').textContent =
    'Se añadió un evento ficticio. Se borrará al recargar o reiniciar.';
  event.target.disabled = true;
});

document.querySelector('#reset').addEventListener('click', () => {
  document.querySelector('#simulated')?.remove();
  document.querySelector('#simulate').disabled = false;
  document.querySelector('#feedback').textContent = 'Demostración reiniciada.';
  document.querySelector('[data-filter="Todos"]').click();
});

render();
