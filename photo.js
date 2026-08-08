// ===============================
// UltraAI - photo.js
// ===============================

const imageUpload = document.getElementById("imageUpload");

if (imageUpload) {

    imageUpload.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        addMessage("🖼️ Photo selected: " + file.name, "user");

        // Preview
        const reader = new FileReader();

        reader.onload = function (event) {

            const img = document.createElement("img");

            img.src = event.target.result;

            img.style.maxWidth = "80%";
            img.style.borderRadius = "15px";
            img.style.margin = "10px 0";

            chat.appendChild(img);

            chat.scrollTop = chat.scrollHeight;

        };

        reader.readAsDataURL(file);

    });

}


// AI Photo Edit
async function editPhoto() {

    const file = imageUpload?.files[0];

    if (!file) {

        alert("पहले Photo चुनें।");

        return;

    }

    const prompt = window.prompt(
        "Photo में क्या बदलना है?",
        "Background बदल दो"
    );

    if (!prompt) return;

    addMessage("🖼️ AI Photo Editing शुरू...", "user");

    try {

        const formData = new FormData();

        formData.append("image", file);
        formData.append("prompt", prompt);

        const response = await fetch("/api/photo", {

            method: "POST",

            body: formData

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.error || "Photo edit failed"
            );

        }

        if (data.image) {

            const result = document.createElement("img");

            result.src = data.image;

            result.style.maxWidth = "100%";
            result.style.borderRadius = "15px";
            result.style.marginTop = "10px";

            chat.appendChild(result);

            chat.scrollTop = chat.scrollHeight;

            addMessage(
                "✅ Photo editing पूरी हो गई।",
                "ai"
            );

        } else {

            addMessage(
                "⚠️ Edited image नहीं मिली।",
                "ai"
            );

        }

    } catch (error) {

        addMessage(
            "❌ Photo Edit Error: " + error.message,
            "ai"
        );

    }

}
