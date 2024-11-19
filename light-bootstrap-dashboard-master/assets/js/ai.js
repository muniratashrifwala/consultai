document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("update-btn"); // Find the button
    const p = document.getElementById("ai-prompt"); // Find the input/textarea
    const responseParagraph = document.getElementById("response-paragraph"); // Find the paragraph to display response
    btn.addEventListener("click", async (e) => { // Add click event to the button
        e.preventDefault(); // Prevent default button behavior
        responseParagraph.textContent = "Loading..."; // Show a loading message while waiting for response
        const response = await sendMessageToServer(p.value); // Send the user input to the server
        console.log(response); // Log the server's response for debugging
        if (response) {
            responseParagraph.textContent = response; // Display AI's response in the paragraph
        } else {
            responseParagraph.textContent = "No response received."; // Display an error message if no response
        }
    });
});
const sendMessageToServer = async (prompt) => {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json', // Tell the server we're sending JSON data
            },
            body: JSON.stringify({ prompt }), // Convert the input into a JSON string
        });
        const data = await response.json(); // Parse the server's JSON response
        return data.choices[0]?.message?.content || "No valid response from AI."; // Return AI's response
    } catch (error) {
        console.error('Error:', error.message); // Log any errors
        return "An error occurred while communicating with the server."; // Return an error message
    }
};