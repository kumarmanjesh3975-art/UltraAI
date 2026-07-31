// ===============================
// UltraAI - pdf.js
// ===============================

console.log("📄 PDF Module Loaded");

// PDF Upload
function uploadPDF() {

    const pdf = document.getElementById("pdfUpload");

    if (!pdf) {
        alert("PDF Upload Box नहीं मिला।");
        return;
    }

    if (pdf.files.length === 0) {
        alert("पहले PDF चुनें।");
        return;
    }

    const file = pdf.files[0];

    alert("📄 PDF Selected: " + file.name);

}

// PDF Name
function showPDFName() {

    const pdf = document.getElementById("pdfUpload");

    if (pdf.files.length > 0) {

        document.getElementById("pdfName").innerText =
            "📄 " + pdf.files[0].name;

    }

}
