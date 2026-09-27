const API_URL = "http://localhost:3000/api/feedback";


// Elements

const feedbackForm = document.getElementById("feedbackForm");

const nameInput = document.getElementById("name");

const ratingInput = document.getElementById("rating");

const commentInput = document.getElementById("comment");

const feedbackContainer =
    document.getElementById("feedbackContainer");

const message =
    document.getElementById("message");

const searchInput =
    document.getElementById("search");

const filterRating =
    document.getElementById("filterRating");

const totalFeedback =
    document.getElementById("totalFeedback");

const averageRating =
    document.getElementById("averageRating");


// GET FEEDBACK

async function getFeedback() {

    try {

        const search = searchInput.value;

        const rating = filterRating.value;

        let url = API_URL;

        const params = new URLSearchParams();

        if (search) {
            params.append("search", search);
        }

        if (rating) {
            params.append("rating", rating);
        }

        if (params.toString()) {
            url += "?" + params.toString();
        }


        const response = await fetch(url);

        const feedback = await response.json();

        displayFeedback(feedback);

    } catch (error) {

        console.log(error);

        feedbackContainer.innerHTML =
            "<p>Failed to load feedback.</p>";
    }
}


// DISPLAY FEEDBACK

function displayFeedback(feedback) {

    feedbackContainer.innerHTML = "";


    if (feedback.length === 0) {

        feedbackContainer.innerHTML =
            "<p>No feedback found.</p>";

        return;
    }


    feedback.forEach((item) => {

        const card =
            document.createElement("div");

        card.className = "feedback-card";


        card.innerHTML = `

            <h3>${item.name}</h3>

            <div class="rating">
                ${"⭐".repeat(item.rating)}
            </div>

            <p>${item.comment}</p>

            <div class="card-buttons">

                <button
                    class="edit-btn"
                    onclick="editFeedback('${item._id}')"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteFeedback('${item._id}')"
                >
                    Delete
                </button>

            </div>
        `;


        feedbackContainer.appendChild(card);

    });
}


// CREATE FEEDBACK

feedbackForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const feedbackData = {

            name: nameInput.value,

            rating: Number(ratingInput.value),

            comment: commentInput.value

        };


        try {

            const response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(feedbackData)
                }
            );


            const data = await response.json();


            if (!response.ok) {

                message.textContent = data.message;

                return;
            }


            message.textContent =
                "Feedback submitted successfully!";


            feedbackForm.reset();


            getFeedback();

            getStats();


        } catch (error) {

            console.log(error);

            message.textContent =
                "Something went wrong.";
        }

    }
);


// DELETE FEEDBACK

async function deleteFeedback(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this feedback?");


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        const data = await response.json();


        message.textContent = data.message;


        getFeedback();

        getStats();


    } catch (error) {

        console.log(error);
    }
}


// EDIT FEEDBACK

async function editFeedback(id) {

    const name =
        prompt("Enter student name:");

    if (!name) {
        return;
    }


    const rating =
        prompt("Enter rating from 1 to 5:");

    if (!rating) {
        return;
    }


    const comment =
        prompt("Enter your comment:");

    if (!comment) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    rating: Number(rating),
                    comment
                })
            }
        );


        const data = await response.json();


        message.textContent = data.message;


        getFeedback();

        getStats();


    } catch (error) {

        console.log(error);
    }
}


// GET STATISTICS

async function getStats() {

    try {

        const response = await fetch(
            `${API_URL}/stats`
        );


        const data = await response.json();


        totalFeedback.textContent =
            data.totalFeedback;


        averageRating.textContent =
            data.averageRating;


    } catch (error) {

        console.log(error);
    }
}


// SEARCH

searchInput.addEventListener(
    "input",
    getFeedback
);


// FILTER

filterRating.addEventListener(
    "change",
    getFeedback
);


// INITIAL LOAD

getFeedback();

getStats();