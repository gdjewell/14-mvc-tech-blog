const newComment = document.querySelector(".new-comment");

async function postComment(event) {
  event.preventDefault();
  
  const comment_content = document.querySelector("#comment-input").value;
  const post_id = document.querySelector('#post_id').value;

  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ comment_content, post_id}),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

newComment.addEventListener("submit", postComment);
