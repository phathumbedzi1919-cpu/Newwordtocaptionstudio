const imageInput = document.getElementById("imageInput");
const mainImage = document.getElementById("mainImage");
const mirrorImage = document.getElementById("mirrorImage");

const captionOne = document.getElementById("captionOne");
const captionTwo = document.getElementById("captionTwo");

const captionOnePreview = document.getElementById("captionOnePreview");
const captionTwoPreview = document.getElementById("captionTwoPreview");

const captionSize = document.getElementById("captionSize");
const mirrorOpacity = document.getElementById("mirrorOpacity");
const mirrorAngle = document.getElementById("mirrorAngle");

const mirrorBtn = document.getElementById("mirrorBtn");
const saveBtn = document.getElementById("saveBtn");

const wordEditorOne = document.getElementById("wordEditorOne");
const wordEditorTwo = document.getElementById("wordEditorTwo");

const canvas = document.getElementById("canvas");


/* -------------------------
IMAGE UPLOAD
------------------------- */

imageInput.addEventListener("change", function(){

    const file = this.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        mainImage.src = e.target.result;
        mirrorImage.src = e.target.result;

        mainImage.style.display = "block";
        mirrorImage.style.display = "block";

    }

    reader.readAsDataURL(file);

});


/* -------------------------
CAPTION EVENTS
------------------------- */

captionOne.addEventListener("input", buildCaptionOne);

captionTwo.addEventListener("input", buildCaptionTwo);

captionSize.addEventListener("input", ()=>{

    buildCaptionOne();
    buildCaptionTwo();

});


/* -------------------------
BUILD CAPTION ONE
------------------------- */

function buildCaptionOne(){

    const words = captionOne.value.trim().split(/\s+/);

    wordEditorOne.innerHTML = "";
    captionOnePreview.innerHTML = "";

    words.forEach((word,index)=>{

        if(word==="") return;

        const card = document.createElement("div");
        card.className = "wordCard";

        card.innerHTML = `
            <h4>${word}</h4>

            <input
            type="color"
            value="#ffffff"
            class="pickerOne"
            data-index="${index}">
        `;

        wordEditorOne.appendChild(card);

        const span = document.createElement("span");

        span.innerText = word + " ";

        span.style.fontSize = captionSize.value + "px";
        span.style.fontWeight = "bold";
        span.style.textShadow = "3px 3px 8px black";

        captionOnePreview.appendChild(span);

    });

    updateColorsOne();

}


/* -------------------------
BUILD CAPTION TWO
------------------------- */

function buildCaptionTwo(){

    const words = captionTwo.value.trim().split(/\s+/);

    wordEditorTwo.innerHTML = "";
    captionTwoPreview.innerHTML = "";

    words.forEach((word,index)=>{

        if(word==="") return;

        const card = document.createElement("div");
        card.className = "wordCard";

        card.innerHTML = `
            <h4>${word}</h4>

            <input
            type="color"
            value="#ffffff"
            class="pickerTwo"
            data-index="${index}">
        `;

        wordEditorTwo.appendChild(card);

        const span = document.createElement("span");

        span.innerText = word + " ";

        span.style.fontSize = captionSize.value + "px";
        span.style.fontWeight = "bold";
        span.style.textShadow = "3px 3px 8px black";

        captionTwoPreview.appendChild(span);

    });

    updateColorsTwo();

}


/* -------------------------
COLOR PICKERS
------------------------- */

function updateColorsOne(){

    const pickers = document.querySelectorAll(".pickerOne");
    const spans = captionOnePreview.querySelectorAll("span");

    pickers.forEach((picker,index)=>{

        picker.addEventListener("input",()=>{

            spans[index].style.color = picker.value;

        });

    });

}

function updateColorsTwo(){

    const pickers = document.querySelectorAll(".pickerTwo");
    const spans = captionTwoPreview.querySelectorAll("span");

    pickers.forEach((picker,index)=>{

        picker.addEventListener("input",()=>{

            spans[index].style.color = picker.value;

        });

    });

}


/* -------------------------
MIRROR
------------------------- */

mirrorOpacity.addEventListener("input",()=>{

    mirrorImage.style.opacity =
    mirrorOpacity.value/100;

});

mirrorAngle.addEventListener("input",()=>{

    mirrorImage.style.transform =
    `scaleY(-1) rotate(${mirrorAngle.value}deg)`;

});

mirrorBtn.addEventListener("click",()=>{

    mirrorImage.style.display="block";

});


/* -------------------------
SAVE
------------------------- */

saveBtn.addEventListener("click",()=>{

    html2canvas(canvas,{
        scale:3,
        useCORS:true
    }).then(result=>{

        const link=document.createElement("a");

        link.download="caption.png";

        link.href=result.toDataURL();

        link.click();

    });

});
