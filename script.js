const imageInput = document.getElementById("imageInput");
const backgroundImage = document.getElementById("backgroundImage");

const captionInput = document.getElementById("captionInput");
const generateBtn = document.getElementById("generateBtn");

const wordEditor = document.getElementById("wordEditor");
const captionPreview = document.getElementById("captionPreview");

const fontFamily = document.getElementById("fontFamily");
const fontSize = document.getElementById("fontSize");

const shadowToggle = document.getElementById("shadowToggle");
const shadowBlur = document.getElementById("shadowBlur");

const saveBtn = document.getElementById("saveBtn");
const canvas = document.getElementById("canvas");

let words = [];
let colors = [];


/* ==========================
   IMAGE UPLOAD
========================== */

imageInput.addEventListener("change", function(){

    const file = this.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        backgroundImage.src = e.target.result;
        backgroundImage.style.display = "block";

    }

    reader.readAsDataURL(file);

});


/* ==========================
   GENERATE WORD EDITOR
========================== */

generateBtn.addEventListener("click", buildEditor);


function buildEditor(){

    const text = captionInput.value.trim();

    if(text === ""){

        wordEditor.innerHTML = "";
        captionPreview.innerHTML = "";
        return;

    }

    words = text.split(/\s+/);

    colors = [];

    wordEditor.innerHTML = "";

    words.forEach((word,index)=>{

        colors.push("#ffffff");

        const card = document.createElement("div");
        card.className = "wordCard";

        card.innerHTML = `
            <h4>${word}</h4>

            <input
                type="color"
                value="#ffffff"
                data-index="${index}"
                class="colorPicker">
        `;

        wordEditor.appendChild(card);

    });

    addColorEvents();

    renderCaption();

}


/* ==========================
   COLOR EVENTS
========================== */

function addColorEvents(){

    const pickers = document.querySelectorAll(".colorPicker");

    pickers.forEach((picker)=>{

        picker.addEventListener("input",function(){

            const index = Number(this.dataset.index);

            colors[index] = this.value;

            renderCaption();

        });

    });

}


/* ==========================
   RENDER CAPTION
========================== */

function renderCaption(){

    captionPreview.innerHTML = "";

    words.forEach((word,index)=>{

        const span = document.createElement("span");

        span.textContent = word;

        span.style.color = colors[index];

        span.style.fontFamily = fontFamily.value;

        span.style.fontSize = fontSize.value + "px";

        if(shadowToggle.checked){

            span.style.textShadow =
            "3px 3px " +
            shadowBlur.value +
            "px rgba(0,0,0,.9)";

        }else{

            span.style.textShadow = "none";

        }

        captionPreview.appendChild(span);

    });

}


/* ==========================
   LIVE SETTINGS
========================== */

fontFamily.addEventListener("change", renderCaption);

fontSize.addEventListener("input", renderCaption);

shadowToggle.addEventListener("change", renderCaption);

shadowBlur.addEventListener("input", renderCaption);


/* ==========================
   SAVE PNG
========================== */

saveBtn.addEventListener("click",()=>{

    html2canvas(canvas,{

        useCORS:true,
        scale:3

    }).then((result)=>{

        const link = document.createElement("a");

        link.download = "caption.png";

        link.href = result.toDataURL("image/png");

        link.click();

    });

});
