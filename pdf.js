// ===============================
// UltraAI - pdf.js
// ===============================

console.log("📄 PDF Module Loaded");

function showPDFName() {
    const file = document.getElementById("pdfUpload").files[0];
    const name = document.getElementById("pdfName");

    if (file) {
        name.innerText = "📄 " + file.name;
    } else {
        name.innerText = "";
    }
}

function uploadPDF() {
    const file = document.getElementById("pdfUpload").files[0];

    if (!file) {
        alert("❌ पहले PDF चुनें।");
        return;
    }

    alert("✅ PDF Upload: " + file.name);

    addMessage("📄 PDF Upload: " + file.name, "user");
    addMessage("🤖 जल्द ही मैं इस PDF को पढ़कर आपके सवालों के जवाब दूँगा।", "ai");
}
