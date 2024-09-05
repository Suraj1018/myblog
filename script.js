const apiURL = 'https://crudcrud.com/api/e5b1384a71af4afa9584f6fcb368cae1'; 

let totalBlogs = 0;

document.getElementById("post-blog-btn").addEventListener("click", function() {
	const imageUrl = document.getElementById("image-url").value;
	const title = document.getElementById("title").value;
	const description = document.getElementById("description").value;

	const newPost = {
		imageUrl,
		title,
		description
	};

	fetch(apiURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newPost)
	})
	.then(response => response.json())
	.then(data => {
		totalBlogs++;
		displayBlogPosts(data);
		updateTotalBlogs();
	})
	.catch(error => console.error('Error:', error));
});

function displayBlogPosts(data) {
	const blogPostsContainer = document.getElementById("blog-posts");
	const postElement = document.createElement("div");
	postElement.classList.add("post");

	const image = document.createElement("img");
	image.src = data.imageUrl;
	postElement.appendChild(image);

	const title = document.createElement("h2");
	title.textContent = data.title;
	postElement.appendChild(title);

	const description = document.createElement("p");
	description.textContent = data.description;
	postElement.appendChild(description);

	const editBtn = document.createElement("button");
	editBtn.textContent = "Edit Blog";
	postElement.appendChild(editBtn);

	const deleteBtn = document.createElement("button");
	deleteBtn.textContent = "Delete Blog";
	postElement.appendChild(deleteBtn);

	blogPostsContainer.appendChild(postElement);
}

function updateTotalBlogs() {
	document.getElementById("total-blogs").textContent = `Total Blogs: ${totalBlogs}`;
}

// Fetch and display existing blog posts on page load
fetch(apiURL)
	.then(response => response.json())
	.then(data => {
		totalBlogs = data.length;
		data.forEach(post => displayBlogPosts(post));
		updateTotalBlogs();
	})
	.catch(error => console.error('Error:', error));