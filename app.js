const synth = window.speechSynthesis;
//DOM
const textForm = document.querySelector('form');
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const rate = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const pitch = document.getElementById('pitch');
const pitchValue = document.getElementById('pitch-value');

//Array of voices
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    //Loop the voices
    voices.forEach(voice => {
        const option = document.createElement('option');
        //Fill option with voice language
        option.textContent = voice.name + "("+ voice.lang +")";
        //set option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    })
}
getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {
    //if speaking
    if(synth.speaking){
        console.error('speaking...');
        return
    }
    if(textInput.value !== ''){
        //Get text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //Speak end
        speakText.onend = e => {
            console.log('done speaking')
        }
        //if error
        speakText.onerror = e => {
            console.log('something went wrong');
        }
        //Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //Loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice)
            speakText.voice = voice;
        })

        //Pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //Speak
        synth.speak(speakText)
    }

}

//Events

//Sumbit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//Rate
rate.addEventListener('change', e => (rateValue.textContent = rate.value));
//Pitch
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

//Voice select change
voiceSelect.addEventListener('change', e => speak());