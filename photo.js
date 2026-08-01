// ===============================
// UltraAI - photo.js
// ===============================

console.log("🖼️ Photo Module Loaded");

// Preview Image
const imageInput = document.getElementById("imageUpload");

if (imageInput) {

    imageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            let preview = document.getElementById("photoPreview");

            if (!preview) {

                preview = document.createElement("img");

                preview.id = "photoPreview";

                preview.style.width = "100%";
                preview.style.maxWidth = "300px";
                preview.style.marginTop = "15px";
                preview.style.borderRadius = "12px";

                document.querySelector(".photo-box").appendChild(preview);
            }

            preview.src = e.target.result;

        };

        reader.readAsDataURL(file);

    });

}

// Edit Photo
function editPhoto() {

    const file = document.getElementById("imageUpload").files[0];

    if (!file) {

        alert("📷 पहले कोई Photo चुनें।");

        return;

    }

    alert("✨ AI Photo Editing जल्द जोड़ी जाएगी।");

}
