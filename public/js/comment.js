const submitButton = document.querySelector('#submitButton');
const commentText = document.querySelector('#commentText');


const buttonSubmit = () => {
    event.preventDefault();
console.log("Button");
const newComment = {
    content: commentText.value,
    blogPost_id: submitButton.dataset.id,//Get correct id of blogpost that comment is attached to
}
console.log(newComment);
fetch('/api/comments', { //Not the correct route? maybe something before /api?
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });
}


//submitButton.addEventListener('click', buttonSubmit);