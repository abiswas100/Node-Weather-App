// console.log('Client side JS output');

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })



 // challenge
// fetch('http://localhost:3000/weather?address=kolkata').then((response)=>{
//     response.json().then((data)=>{
//        if(data.error){
//            console.log(data.error)
//        }
//        else{
//            console.log(data.location);
//            console.log(data.Forecast);
//        }
//     })
// })

// console.log('yo1');

// const weatherForm = document.querySelector('form')
// console.log('yo2');
// weatherForm.addEventListener('Submit',(e)=>{
//     e.preventDefault()
//     alert('yo')
//     console.log('testing!')
// })

console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error
            } else {
                // console.log(data.location)
                messageOne.textContent = data.location
                // console.log(data.Forecast)
                messageTwo.textContent = data.Forecast
            }
        })
    })
})

