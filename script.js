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
const canvas = document.getElementById("canvas");


let imageLoaded = false;


/*=========================
IMAGE UPLOAD
=========================*/

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        mainImage.src = e.target.result;
        mirrorImage.src = e.target.result;

        mainImage.style.display = "block";
        mirrorImage.style.display = "block";

        imageLoaded = true;

    };

    reader.readAsDataURL(file);

});


/*=========================
LIVE CAPTIONS
=========================*/

captionOne.addEventListener("input", () => {

    captionOnePreview.innerText = captionOne.value;

});

captionTwo.addEventListener("input", () => {

    captionTwoPreview.innerText = captionTwo.value;

});


/*=========================
CAPTION SIZE
=========================*/

captionSize.addEventListener("input", () => {

    captionOnePreview.style.fontSize =
        captionSize.value + "px";

    captionTwoPreview.style.fontSize =
        captionSize.value + "px";

});


/*=========================
MIRROR OPACITY
=========================*/

mirrorOpacity.addEventListener("input", () => {

    mirrorImage.style.opacity =
        mirrorOpacity.value / 100;

});


/*=========================
MIRROR ROTATION
=========================*/

mirrorAngle.addEventListener("input", () => {

    mirrorImage.style.transform =
        "scaleY(-1) rotate(" +
        mirrorAngle.value +
        "deg)";

});


/*=========================
MIRROR BUTTON
=========================*/

mirrorBtn.addEventListener("click", () => {

    if (!imageLoaded) {

        alert("Please upload a photo first.");

        return;

    }

    mirrorImage.style.display = "block";

});


/*=========================
SAVE IMAGE
=========================*/

saveBtn.addEventListener("click", () => {

    html2canvas(canvas, {

        useCORS: true,
        scale: 3

    }).then((result) => {

        const link = document.createElement("a");

        link.download = "MirrorCaption.png";

        link.href = result.toDataURL("image/png");

        link.click();

    });

});


/*=========================
DEFAULT SETTINGS
=========================*/

captionOnePreview.style.fontSize =
captionSize.value + "px";

captionTwoPreview.style.fontSize =
captionSize.value + "px";

mirrorImage.style.opacity =
mirrorOpacity.value / 100;

mirrorImage.style.transform =
"scaleY(-1) rotate(180deg)";
