const fs = require('fs');

// Function to generate clamp values and write to a file
function generateClampFile() {
    const viewportWidth = 1440; // Reference viewport width
    let content = ""; // To store the clamp values

    // Generate clamp values for X = 1 to 1920
    for (let x = 1; x <= 1920; x++) {
        const clampValue = `clamp(px,${(x / viewportWidth) * 100}vw,${x}px)`;
        content += `${clampValue}\n`;
    }

    // Write the content to a file
    fs.writeFile('clamp-values.txt', content, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File "clamp-values.txt" has been created successfully.');
        }
    });
}

// Call the function
generateClampFile();
