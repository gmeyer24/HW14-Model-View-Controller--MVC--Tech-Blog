const newPost = async (e) => {
  e.preventDefault();

  // capture the content from the new post form
  const title = document.getElementById("postTitle").value;
  const contents = document.getElementById("postContent").value;

  if (title && contents) {
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        // add contents to be inserted into the DB
        title: title,
        contents: contents,
      }),
      headers: { "Content-Type": "application/json" },
    });

    document.location.replace("/dashboard");
  } else {
    alert("need content & title");
  }
};

// create event listener for the submit button to run newPost
document.getElementById("new-post").addEventListener("submit", newPost);
