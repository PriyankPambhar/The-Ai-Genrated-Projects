document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("resume-form");
    const previewSection = document.getElementById("resume-preview");
    const resumeContent = document.getElementById("resume-content");
    const qrCanvas = document.getElementById("qrcode");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const linkedin = document.getElementById("linkedin").value.trim();
        const degree = document.getElementById("degree").value.trim();
        const university = document.getElementById("university").value.trim();
        const cgpa = document.getElementById("cgpa").value.trim();
        const year = document.getElementById("year").value.trim();
        const jobTitle = document.getElementById("jobTitle").value.trim();
        const company = document.getElementById("company").value.trim();
        const duration = document.getElementById("duration").value.trim();
        const workDescription = document.getElementById("workDescription").value.trim();
        const skills = document.getElementById("skills").value.trim();

        if (!name || !email || !phone || !degree || !university) {
            alert("Please fill in all required fields!");
            return;
        }

        // Generate Resume Preview
        resumeContent.innerHTML = `
            <div class="resume-box">
                <h3 class="text-center">${name}</h3>
                <p class="text-center"><strong>Email:</strong> ${email} | <strong>Phone:</strong> ${phone}</p>
                <p class="text-center"><strong>Address:</strong> ${address}</p>
                <p class="text-center"><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>
                <hr>
                <h4>Education</h4>
                <ul>
                    <li><strong>Degree:</strong> ${degree}</li>
                    <li><strong>University:</strong> ${university}</li>
                    <li><strong>CGPA:</strong> ${cgpa}</li>
                    <li><strong>Year:</strong> ${year}</li>
                </ul>
                <hr>
                <h4>Work Experience</h4>
                <ul>
                    <li><strong>Job Title:</strong> ${jobTitle}</li>
                    <li><strong>Company:</strong> ${company}</li>
                    <li><strong>Duration:</strong> ${duration}</li>
                    <li><strong>Description:</strong> ${workDescription}</li>
                </ul>
                <hr>
                <h4>Skills</h4>
                <ul>
                    <li>${skills}</li>
                </ul>
            </div>
        `;

        // Show Resume Preview
        previewSection.style.display = "block";

        // Generate QR Code for LinkedIn
        if (linkedin) {
            let qr = new QRious({
                element: qrCanvas,
                value: linkedin,
                size: 150
            });
        }
    });
});

// Function to Export Resume as PDF
function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Resume", 80, 20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const linkedin = document.getElementById("linkedin").value.trim();
    const degree = document.getElementById("degree").value.trim();
    const university = document.getElementById("university").value.trim();
    const cgpa = document.getElementById("cgpa").value.trim();
    const year = document.getElementById("year").value.trim();
    const jobTitle = document.getElementById("jobTitle").value.trim();
    const company = document.getElementById("company").value.trim();
    const duration = document.getElementById("duration").value.trim();
    const workDescription = document.getElementById("workDescription").value.trim();
    const skills = document.getElementById("skills").value.trim();

    // Add Personal Info
    doc.text("Personal Information", 10, 30);
    doc.text("- Name: " + name, 15, 40);
    doc.text("- Email: " + email, 15, 50);
    doc.text("- Phone: " + phone, 15, 60);
    doc.text("- Address: " + address, 15, 70);

    // Add LinkedIn QR Code
    if (linkedin) {
        doc.text("- LinkedIn: " + linkedin, 15, 80);
        let qrCanvas = document.getElementById("qrcode");
        let qrImageData = qrCanvas.toDataURL("image/png");
        doc.addImage(qrImageData, "PNG", 150, 30, 40, 40);
    }

    // Add Education Section
    doc.text("Education", 10, 100);
    doc.text("- Degree: " + degree, 15, 110);
    doc.text("- University: " + university, 15, 120);
    doc.text("- CGPA: " + cgpa, 15, 130);
    doc.text("- Year: " + year, 15, 140);

    // Add Work Experience
    doc.text("Work Experience", 10, 160);
    doc.text("- Job Title: " + jobTitle, 15, 170);
    doc.text("- Company: " + company, 15, 180);
    doc.text("- Duration: " + duration, 15, 190);
    doc.text("- Description: " + workDescription, 15, 200, { maxWidth: 180 });

    // Add Skills
    doc.text("Skills", 10, 220);
    doc.text("- " + skills, 15, 230, { maxWidth: 180 });

    doc.save("resume.pdf");
}
