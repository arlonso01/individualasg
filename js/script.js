// JavaScript for handling comments and adding interactivity

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Select the form and comments display container
    const form = document.querySelector("form");
    const commentsDisplay = document.getElementById("comments-display");

    // Add an event listener for form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the page from reloading

        // Get form data
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const comment = document.getElementById("comment").value.trim();

        // Validate form inputs
        if (name === "" || email === "" || comment === "") {
            alert("Please fill in all fields before submitting!");
            return;
        }

        // Create a new comment element
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment", "fade-in"); // Add fade-in animation

        // Add content to the comment
        commentElement.innerHTML = `
            <p><strong>${name}</strong> (${email}) says:</p>
            <p>${comment}</p>
            <hr>
        `;

        // Append the new comment to the comments display section
        commentsDisplay.appendChild(commentElement);

        // Clear the form fields
        form.reset();

        // Notify the user
        alert("Thank you for your comment!");
    });

    // Add interactive effects to the header
    const header = document.querySelector("header");
    header.addEventListener("mouseover", () => {
        header.classList.add("bounce"); // Add bounce animation
    });

    header.addEventListener("mouseout", () => {
        header.classList.remove("bounce"); // Remove bounce animation
    });
});
