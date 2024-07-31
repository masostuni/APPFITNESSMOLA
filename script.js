document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = 1;
    const totalQuestions = 5;

    const showNextButton = () => document.getElementById('next').style.display = 'block';
    const hideNextButton = () => document.getElementById('next').style.display = 'none';

    document.getElementById('goal').addEventListener('change', showNextButton);
    document.getElementById('frequency').addEventListener('input', showNextButton);
    document.querySelectorAll('input[name="gym"]').forEach(radio => radio.addEventListener('change', showNextButton));
    document.getElementById('experience').addEventListener('change', showNextButton);
    document.getElementById('motivation').addEventListener('input', showNextButton);
    document.getElementById('next').addEventListener('click', nextQuestion);
    document.getElementById('sendEmail').addEventListener('click', sendEmail);

    function nextQuestion() {
        if (currentQuestion < totalQuestions) {
            document.getElementById(`q${currentQuestion}`).style.display = 'none';
            currentQuestion++;
            document.getElementById(`q${currentQuestion}`).style.display = 'block';
            hideNextButton();
        } else {
            showResult();
        }
    }

    function showResult() {
        const goal = document.getElementById('goal').value;
        const frequency = document.getElementById('frequency').value;
        const gym = document.querySelector('input[name="gym"]:checked').value;
        const experience = document.getElementById('experience').value;
        const motivation = document.getElementById('motivation').value;

        let result = `
            <h2>🎉 Il tuo profilo fitness personalizzato</h2>
            <p><strong>Obiettivo:</strong> ${getEmoji(goal)} ${goal}</p>
            <p><strong>Frequenza allenamenti:</strong> ${frequency} volte a settimana</p>
            <p><strong>Accesso alla palestra:</strong> ${gym === 'si' ? '✅' : '❌'}</p>
            <p><strong>Livello di esperienza:</strong> ${experience}</p>
            <p><strong>Livello di motivazione:</strong> ${motivation}/10</p>
            <h3>💡 Consigli personalizzati:</h3>
            <ul>${getAdvice(goal, frequency, gym, experience, motivation)}</ul>
        `;

        document.getElementById('result').innerHTML = result;
        document.getElementById('result').style.display = 'block';
        document.getElementById('userForm').style.display = 'block';
    }

    function getEmoji(goal) {
        const emojis = {
            'perdita-peso': '🏃‍♂️',
            'aumento-massa': '💪',
            'resistenza': '🏊‍♂️',
            'flessibilita': '🧘‍♀️'
        };
        return emojis[goal] || '';
    }

    function getAdvice(goal, frequency, gym, experience, motivation) {
        let advice = '';
        if (goal === 'perdita-peso') {
            advice += '<li>Combina cardio e allenamento di forza per massimizzare il consumo calorico.</li>';
            advice += '<li>Monitora la tua alimentazione e crea un deficit calorico moderato.</li>';
        } else if (goal === 'aumento-massa') {
            advice += '<li>Focalizzati su esercizi composti come squat, stacchi e panca.</li>';
            advice += '<li>Assicurati di avere un surplus calorico e un alto apporto proteico.</li>';
        } else if (goal === 'resistenza') {
            advice += '<li>Incorpora allenamenti intervallati ad alta intensità (HIIT).</li>';
            advice += '<li>Aumenta gradualmente la durata delle tue sessioni di allenamento.</li>';
        } else if (goal === 'flessibilita') {
            advice += '<li>Pratica lo stretching dinamico prima degli allenamenti e quello statico dopo.</li>';
            advice += '<li>Considera di incorporare sessioni di yoga o pilates nella tua routine.</li>';
        }

        if (frequency < 3) {
            advice += '<li>Cerca di aumentare gradualmente la frequenza dei tuoi allenamenti per migliori risultati.</li>';
        }

        if (gym === 'no') {
            advice += '<li>Esplora opzioni di allenamento a corpo libero e considera l\'acquisto di attrezzatura base per casa.</li>';
        }

        if (experience === 'principiante') {
            advice += '<li>Inizia con esercizi base e concentrati sulla forma corretta prima di aumentare l\'intensità.</li>';
        }

        if (motivation < 5) {
            advice += '<li>Trova un partner di allenamento o unisciti a un gruppo fitness per aumentare la tua motivazione.</li>';
        }

        return advice;
    }

    function sendEmail() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const goal = document.getElementById('goal').value;
        const frequency = document.getElementById('frequency').value;
        const gym = document.querySelector('input[name="gym"]:checked').value;
        const experience = document.getElementById('experience').value;
        const motivation = document.getElementById('motivation').value;

        const subject = encodeURIComponent("Il tuo profilo fitness personalizzato");
        const body = encodeURIComponent(`
            Ciao ${name},

            Ecco il tuo profilo fitness personalizzato:

            Obiettivo: ${getEmoji(goal)} ${goal}
            Frequenza allenamenti: ${frequency} volte a settimana
            Accesso alla palestra: ${gym === 'si' ? '✅' : '❌'}
            Livello di esperienza: ${experience}
            Livello di motivazione: ${motivation}/10

            Consigli personalizzati:
            ${getAdvice(goal, frequency, gym, experience, motivation)}

            Buona fortuna con il tuo allenamento!

            Cordiali saluti,
            FitMe
        `);

        window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    }
});
