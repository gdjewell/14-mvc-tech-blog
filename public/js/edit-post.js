const editPostSelector = document.querySelector(".edit-form");

const editPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("input[name='post-name']").value.trim();
  const post_content = document
    .querySelector("input[name='post-content']")
    .value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (title && post_content) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
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
};

editPostSelector.addEventListener("submit", editPost);
