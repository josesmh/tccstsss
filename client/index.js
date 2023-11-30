
    function calculateEmotion(value) {
        var card = document.getElementById('emotion-card');
        var message = document.getElementById('emotion-message');

        // Altera a cor do card com base no valor selecionado
        var color = calculateColor(value);
        card.style.backgroundColor = color;

        // Exibe a mensagem correspondente
        switch (value) {
            case 1:
                message.innerText = "Está tudo bem, dias ruins acontecem. Todo munto tem seus altos e baixos.";
                break;
            case 2:
                message.innerText = "Pode melhorar! Encontre algo que te traga alegria.";
                break;
            case 3:
                message.innerText = "Parece que você não está nem triste nem feliz. Tente fazer algo produtivo ou que lhe dê serotonina ;)";
                break;
            case 4:
                message.innerText = "Você está bem! Continue assim e aproveite o dia.";
                break;
            case 5:
                message.innerText = "Muito feliz! Continue espalhando essa positividade.";
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
            const response = await fetch('/update-emotion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value }),
            });
    
            const data = await response.json();
    
            if (data.success) {
                console.log('Emotion saved successfully!');
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    