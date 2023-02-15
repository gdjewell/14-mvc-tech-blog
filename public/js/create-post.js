const newPost = document.querySelector(".new-post");

async function newForm(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-name"]').value;
  const post_content = document.querySelector(
    'input[name="post-content"]'
  ).value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

newPost.addEventListener("submit", newForm);
