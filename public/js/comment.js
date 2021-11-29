const submitButton = document.querySelector('#submitButton');
const commentText = document.querySelector('#commentText');


const buttonSubmit = (event) => {
    event.preventDefault();
console.log("Button");
const newComment = {
    content: commentText.value,
    blogPost_id: submitButton.dataset.id,
}
console.log(newComment);
fetch('/api/comments', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });
}


submitButton.addEventListener('click', buttonSubmit);