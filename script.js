const imageInput = document.getElementById("imageInput");
const removeImageBtn = document.getElementById("removeImageBtn");

const captionInput = document.getElementById("captionInput");
const generateWordsBtn = document.getElementById("generateWordsBtn");

const wordEditor = document.getElementById("wordEditor");
const captionPreview = document.getElementById("captionPreview");

const backgroundImage = document.getElementById("backgroundImage");

const fontFamily = document.getElementById("fontFamily");
const fontSize = document.getElementById("fontSize");

const shadowToggle = document.getElementById("shadowToggle");
const shadowBlur = document.getElementById("shadowBlur");
const shadowX = document.getElementById("shadowX");
const shadowY = document.getElementById("shadowY");

const saveBtn = document.getElementById("saveBtn");
const canvas = document.getElementById("canvas");

let words = [];

/* ===========================
   IMAGE UPLOAD
=========================== */

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        backgroundImage.src = e.target.result;
        backgroundImage.style.display = "block";

    };

    reader.readAsDataURL(file);

});

removeImageBtn.addEventListener("click", () => {

    backgroundImage.src = "";
    backgroundImage.style.display = "none";
    imageInput.value = "";

});


/* ===========================
   GENERATE WORD EDITOR
=========================== */

generateWordsBtn.addEventListener("click", () => {

    words = captionInput.value.trim().split(/\s+/);

    wordEditor.innerHTML = "";

    words.forEach((word, index) => {

        const card = document.createElement("div");
        card.className = "wordCard";

        card.innerHTML = `

            <h3>${word}</h3>

            <label>Word Color</label>

            <input
                type="color"
                value="#ffffff"
                data-index="${index}"
                class="colorPicker">

        `;

        wordEditor.appendChild(card);

    });

    attachColorEvents();

    updatePreview();

});


/* ===========================
   COLOR PICKERS
=========================== */

function attachColorEvents() {

    const pickers = document.querySelectorAll(".colorPicker");

    pickers.forEach(picker => {

        picker.addEventListener("input", updatePreview);

    });

}


/* ===========================
   UPDATE PREVIEW
=========================== */

function updatePreview() {

    captionPreview.innerHTML = "";

    const pickers = document.querySelectorAll(".colorPicker");

    words.forEach((word, index) => {

        const span = document.createElement("span");

        span.textContent = word + " ";

        if (pickers[index]) {

            span.style.color = pickers[index].value;

        }

        span.style.fontFamily = fontFamily.value;

        span.style.fontSize = fontSize.value + "px";

        if (shadowToggle.checked) {

            span.style.textShadow =
                `${shadowX.value}px ${shadowY.value}px ${shadowBlur.value}px black`;

        } else {

            span.style.textShadow = "none";

        }

        captionPreview.appendChild(span);

    });

}


/* ===========================
   FONT SETTINGS
=========================== */

fontFamily.addEventListener("change", updatePreview);

fontSize.addEventListener("input", updatePreview);

shadowToggle.addEventListener("change", updatePreview);

shadowBlur.addEventListener("input", updatePreview);

shadowX.addEventListener("input", updatePreview);

shadowY.addEventListener("input", updatePreview);


/* ===========================
   LIVE TEXT UPDATE
=========================== */

captionInput.addEventListener("input", () => {

    words = captionInput.value.trim().split(/\s+/);

    updatePreview();

});


/* ===========================
   SAVE PNG
=========================== */

saveBtn.addEventListener("click", () => {

    html2canvas(canvas, {

        useCORS: true,
        scale: 3

    }).then(canvasImage => {

        const link = document.createElement("a");

        link.download = "caption.png";

        link.href = canvasImage.toDataURL("image/png");

        link.click();

    });

});


/* ===========================
   INITIAL PREVIEW
=========================== */

updatePreview();
