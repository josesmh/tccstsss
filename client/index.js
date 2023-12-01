
    function calculateEmotion(value) {
        var card = document.getElementById('emotion-card');
        var message = document.getElementById('emotion-message');

        // Altera a cor do card com base no valor selecionado
        var color = calculateColor(value);
        card.style.backgroundColor = color;

        // Exibe a mensagem correspondente
        switch (value) {
            case 1:
                message.innerText = "Tá tudo bem, dias ruins acontecem. Todo mundo, sem exceção, tem seus altos e baixos.";
                break;
            case 2:
                message.innerText = "Dá pra melhorar, em? Que tal achar alguma coisa pra passar o tempo, como assistir vídeos, filmes ou estudar um assunto que você tem interesse? ";
                break;
            case 3:
                message.innerText = "Parece que você não está nem triste nem feliz (tá mais ou menos). Tente fazer algo que traga felidade pra você ;)";
                break;
            case 4:
                message.innerText = "Você está muito bem (; . Continue assim e aproveite o resto do dia.";
                break;
            case 5:
                message.innerText = "Parece que você está realmente brilhando hoje, né? Não se esqueca de espalhar essa positivade, okay?";
                break;
            default:
                message.innerText = "Em uma escala de 1 a 5, como você está?";
        }
        saveEmotion(value);
    }

    function calculateColor(value) {
        // Calcula a cor com base no valor
        var hue = (value - 1) * 60; // Ajusta a tonalidade com base no valor (de 0 a 300)
        return "hsl(" + hue + ", 70%, 50%)"; // Converte para formato HSL
    }

    async function saveEmotion(value) {
        try {
            const response = await fetch('https://psicoifpb-api.onrender.com/update-emotion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value }),
            });
    console.log(response);
            const data = await response.json();
            
            console.log(data.json);
    
            if (data.success) {
                console.log('Emotion saved successfully!');
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    