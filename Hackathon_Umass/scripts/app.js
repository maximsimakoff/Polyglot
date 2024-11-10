async function getSecret() {
    try {
      const response = await fetch('/api/secret');
      const data = await response.json();
      return data.secret;
    } catch (error) {
      console.error('Error fetching secret:', error);
      return null;
    }
  }
  
  async function init() {
    const secret = await getSecret();
    
  }
  
  init();
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto'; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
}

document.addEventListener('DOMContentLoaded', function () {
    const convertButton = document.querySelector('.button-85'); 
    let timer; 
    convertButton.addEventListener('click', function () {
        if (convertButton.disabled) return; 
        handleConversion();

        convertButton.disabled = true;
        startCountdown(30); 
    });

    function startCountdown(duration) {
        let timeRemaining = duration;
        convertButton.textContent = `00:00:${String(timeRemaining).padStart(2, '0')}`; 
        
        timer = setInterval(() => {
            timeRemaining--;
            convertButton.textContent = `00:00:${String(timeRemaining).padStart(2, '0')}`;

            if (timeRemaining <= 0) {
                clearInterval(timer);
                convertButton.textContent = 'CONVERT!';
                convertButton.disabled = false; 
            }
        }, 1000); 
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const inputButtons = document.querySelectorAll('.input-buttons .button-30');
    const outputButtons = document.querySelectorAll('.output-buttons .button-30-red');
    const convertButton = document.querySelector('.button-85');

    inputButtons.forEach(button => {
        button.addEventListener('click', function () {
            inputButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    outputButtons.forEach(button => {
        button.addEventListener('click', function () {
            outputButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    convertButton.addEventListener('click', handleConversion);
});
document.addEventListener('DOMContentLoaded', function () {
    function autoResizeTextarea(textarea) {
        textarea.style.height = 'auto'; 
        textarea.style.height = `${textarea.scrollHeight}px`; 
    }

    const inputBox = document.getElementById('inputBox');
    inputBox.addEventListener('input', function () {
        autoResizeTextarea(inputBox);
    });

    const outputBox = document.getElementById('outputBox');
    outputBox.addEventListener('input', function () {
        autoResizeTextarea(outputBox);
    });
});
async function checkforcorrectcode(language, code){
    const secret = await getSecret();
    if (!secret) {
        console.error('Failed to retrieve the secret key');
        throw new Error('Secret key not found');
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${secret}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { "role": "system", "content": `You check if the given code is in ${language}. You can only generate yes/no responce.` },
                    { "role": "user", "content": `is this ${code} in ${language} language`}
                ],
                max_tokens: 2048, 
                temperature: 0.7

            })
        });

        const data = await response.json();
        if (response.ok && data.choices[0].message.content.trim().toLowerCase() === 'yes') {
            return(1);
        }
        else if (response.ok && data.choices[0].message.content.trim().toLowerCase() === 'no'){
            return(0);
        }
        else {
            console.error('Error:', data);
            throw new Error(data.error.message || 'An error occurred while generating the response');
        }
    } catch (error) {
        console.error('Request failed:', error);
        throw new Error('Failed to connect to OpenAI API');
    }
}
async function generateResponse(language, code) {
    const secret = await getSecret();
    if (!secret) {
        console.error('Failed to retrieve the secret key');
        throw new Error('Secret key not found');
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${secret}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { "role": "system", "content": `You are a code translator that translates given code into ${language} code. You can only generate code. You must not generate anything but` },
                    { "role": "user", "content": code }
                ],
                max_tokens: 2048, 
                temperature: 0.7
            })
        });

        const data = await response.json();
        if (response.ok) {
            return data.choices[0].message.content;
        } else {
            console.error('Error:', data);
            throw new Error(data.error.message || 'An error occurred while generating the response');
        }
    } catch (error) {
        console.error('Request failed:', error);
        throw new Error('Failed to connect to OpenAI API');
    }
}

async function handleConversion() {
    const inputLanguageButton = document.querySelector('.input-buttons .active');
    const outputLanguageButton = document.querySelector('.output-buttons .active');

    if (!inputLanguageButton || !outputLanguageButton) {
        alert('Please select both an input and output language.');
        return;
    }

    const inputLanguage = inputLanguageButton.textContent.trim();
    const outputLanguage = outputLanguageButton.textContent.trim();
    const code = document.getElementById('inputBox').value.trim();
    const outputBox = document.getElementById('outputBox');

    if (!code) {
        alert('Please enter some code to translate.');
        outputBox.value = 'Please enter some code to translate.'; 
        autoResizeTextarea(outputBox); 
        return;
    }

    try {
        if (await checkforcorrectcode(inputLanguage, code) === 1) {
            const result = await generateResponse(outputLanguage, code);
            outputBox.value = result;
            autoResizeTextarea(outputBox);
        }    
        else{
            outputBox.value = "Error: the code doesn't match the chosen language";
            autoResizeTextarea(outputBox);
        }    
    } 
    catch (error) {
        console.error('Error during conversion:', error);
        alert('Error: ' + error.message);
    }
}
