import React,{useState} from 'react'




function Audio() {


    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = function(){
    console.log("You Can Start Talking !!")
} 

recognition.onresult =  function(event){
    const current = event.resultIndex;
    console.log(event)
    const transcript =event.results[current][0].transcript;
    setKeyword({gourav:transcript})
}



    const [Keyword, setKeyword] = useState({
        gourav:''
    })


    return (
        <>
            <input 
     onChange={(e) => setKeyword({gourav:e.target.value})}
     value={Keyword.gourav}
    />
    <button onClick={()=>{recognition.start()}}>Mic</button>
        </>
    )
}

export default Audio



[{ "name":"Albela","producer":"Bhagwan Dada"},
{"name":"Lagaan: Once Upon a Time in India", "producer":"Aamir Khan"},
{"name":"Meri Biwi Ka Jawab Nahin","producer":"S. M. Iqbal"},
{"name":"Hum Tumhare Hain Sanam","producer":"K. C. Bokadia"},
{"name":"One 2 Ka 4", "producer":"Nazir Ahmed"},
{"name":"Devdas","producer":"Bharat Shah"},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},
{"name":"","producer":""},

]









