// Select the form
const createForm = document.querySelector("form")

// Add an event listener to the form for when it's submitted. In the event listener, 
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
// - Prevent the default behavior of refreshing the page
// - get the form data from the form
// - create an object from the form data
  const loanerData = new FormData(createForm);
  const reqBody = Object.fromEntries(loanerData);
// - make a fetch request to your POST route to send the object to the server
// - once that is done, redirect the client to "/" (back to the home page)

  fetch("/itemz", {
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify(reqBody)
    })
    .then(() => {
      window.location.href = "/"
    })

  })


