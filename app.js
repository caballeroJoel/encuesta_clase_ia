const form = document.getElementById('surveyForm');
const grupEl = document.getElementById('grup');
const puntuacioEl = document.getElementById('puntuacio');
const comentariEl = document.getElementById('comentari');
const filterEl = document.getElementById('filter');

const countEl = document.getElementById('count');
const avgEl = document.getElementById('avg');
const positiveEl = document.getElementById('positive');
const kpisEl = document.getElementById('kpis');
const distributionEl = document.getElementById('distribution');
const responsesListEl = document.getElementById('responsesList');
const metaInfo = document.getElementById('metaInfo');

let respostes = [];
let nextId = 1;

// Chart.js instances (inicializades més endavant si existeixen els canvases)
let barChart = null;
let pieChart = null;
let avgChart = null;

function initCharts(){
    // comprovar que els elements existeixen
    const barEl = document.getElementById('barChart');
    const pieEl = document.getElementById('pieChart');
    const avgEl = document.getElementById('avgChart');
    if(window.Chart){
        if(barEl){
            const barCtx = barEl.getContext('2d');
            barChart = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: ['1','2','3','4','5'],
                    datasets: [{ label: 'Respostes', data: [0,0,0,0,0], backgroundColor: '#2563eb' }]
                },
                options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, precision: 0 } } }
            });
        }
        if(pieEl){
            const pieCtx = pieEl.getContext('2d');
            pieChart = new Chart(pieCtx, {
                type: 'pie',
                data: { labels: ['Positives (4-5)','No positives (1-3)'], datasets: [{ data: [0,0], backgroundColor: ['#10b981','#f59e0b'] }] },
                options: { responsive: true }
            });
        }
        if(avgEl){
            const avgCtx = avgEl.getContext('2d');
            avgChart = new Chart(avgCtx, {
                type: 'bar',
                data: { labels: ['DAW1A','DAW1B','ASIX1'], datasets: [{ label: 'Mitjana', data: [0,0,0], backgroundColor: ['#2563eb','#3b82f6','#60a5fa'] }] },
                options: { responsive: true, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { suggestedMin: 0, suggestedMax: 5 } } }
            });
        }
    }
}

function formatDate(iso){
    const d = new Date(iso);
    return d.toLocaleString();
}

function updatePanel(){
    const filter = filterEl.value;
    const filtered = respostes.filter(r => filter === 'Tots' || r.grup === filter);

    if(filtered.length === 0){
        metaInfo.innerHTML = '<small class="muted">Sense dades per al filtrat seleccionat.</small>';
        kpisEl.style.display = 'none';
        distributionEl.innerHTML = '';
        responsesListEl.innerHTML = '';
        return;
    }

    metaInfo.innerHTML = `<small class="muted">Mostrant dades del grup seleccionat al formulari: ${filter}</small>`;
    kpisEl.style.display = '';

    const count = filtered.length;
    const avg = (filtered.reduce((s,r)=>s+r.puntuacio,0)/count)||0;
    const positives = filtered.filter(r=>r.puntuacio>=4).length;

    countEl.textContent = count;
    avgEl.textContent = avg.toFixed(2);
    positiveEl.textContent = ((positives/count)*100).toFixed(1)+'%';

    // distribution 1..5
    const dist = [0,0,0,0,0];
    filtered.forEach(r=> dist[r.puntuacio-1]++);

            distributionEl.innerHTML = '';
    for(let i=0;i<5;i++){
        const row = document.createElement('div');
        row.className = 'bar-row';
        const label = document.createElement('div');
        label.style.width='72px';
        label.textContent = (i+1)+' estrelles';
        const barWrap = document.createElement('div');
        barWrap.className='bar';
        const barInner = document.createElement('i');
        const pct = Math.round((dist[i]/count)*100);
        barInner.style.width = pct+'%';
        barWrap.appendChild(barInner);
        const num = document.createElement('div');
        num.style.width='32px';
        num.style.textAlign='right';
        num.textContent = dist[i];
        row.appendChild(label);
        row.appendChild(barWrap);
        row.appendChild(num);
        distributionEl.appendChild(row);
    }

            // Actualitzar gràfiques Chart.js si existeixen
            if(barChart){
                barChart.data.datasets[0].data = dist;
                barChart.update();
            }

            if(pieChart){
                pieChart.data.datasets[0].data = [positives, count-positives];
                pieChart.update();
            }

            if(avgChart){
                const groups = ['DAW1A','DAW1B','ASIX1'];
                const avgPerGroup = groups.map(g=>{
                    const items = filtered.filter(r=>r.grup===g);
                    if(items.length===0) return 0;
                    return +(items.reduce((s,x)=>s+x.puntuacio,0)/items.length).toFixed(2);
                });
                avgChart.data.datasets[0].data = avgPerGroup;
                avgChart.update();
            }

    // responses list (most recent first)
    responsesListEl.innerHTML = '';
    const sorted = filtered.slice().sort((a,b)=>new Date(b.data)-new Date(a.data));
    sorted.forEach(r=>{
        const d = document.createElement('div');
        d.className='resp';
        d.innerHTML = `<strong>${r.grup}</strong> — <small class="muted">${formatDate(r.data)}</small><div><strong>Puntuació: ${r.puntuacio}/5</strong></div>${r.comentari?'<div>'+r.comentari+'</div>':''}`;
        responsesListEl.appendChild(d);
    });
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const grup = grupEl.value.trim();
    const puntuacio = Number(puntuacioEl.value);
    const comentari = comentariEl.value.trim();

    if(!grup){
        alert('Selecciona un grup.');
        return;
    }
    if(!Number.isInteger(puntuacio) || puntuacio <1 || puntuacio>5){
        alert('La puntuació ha de ser un enter entre 1 i 5.');
        return;
    }

    const resp = { id: nextId++, grup, puntuacio, comentari, data: new Date().toISOString() };
    respostes.push(resp);

    // reset form minimal
    comentariEl.value='';
    puntuacioEl.value = 5;

    // update UI
    updatePanel();
});

filterEl.addEventListener('change', updatePanel);

// optional: seed some example data for testing (comment out if not wanted)
/*
respostes.push({id:nextId++,grup:'DAW1A',puntuacio:4,comentari:'Tot clar',data:new Date().toISOString()});
respostes.push({id:nextId++,grup:'DAW1B',puntuacio:3,comentari:'Millorar exemples',data:new Date().toISOString()});
updatePanel();
*/

// Inicialitzar gràfiques al final (després que el DOM carregui)
document.addEventListener('DOMContentLoaded', ()=>{
    initCharts();
    updatePanel();
});
