console.log("running. . .");
/** Store data **/
/* This object called store will store data required for the working of this page
   https://knowledge.udacity.com/questions/333825
*  1. 'user' is an object with one key:value pair name, where name is a string of the user's name
*  2. 'apod' AKA Astronomy picture of the day is a route with which to call API data with
*     a. when data is fetched from server, aka index.js --> API, update store function is responsible for recalling
*     render function, so that the new data will appear on the screen.
*     b. TODO:
*         - create item about info of the current selected rover
*         - an item to hold array of the recent photos of the selected rover and the date of photo
*  Store therefore contains the data necssary to render the page
* */
let store = {
    user: { name: "Student" },
    apod: '',
    selected_rover: '',
}

/** Add markup to page **/
/* get root element of document. this element will contain images and data from API calls */
const root = document.getElementById('root');

/* This function is called updateStore
*  Input: the store object
*
*  */
const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state);
}


// create content
const App = (state) => {
    let { rovers, apod } = state
    console.log(apod)
    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    ${ImageOfTheDay(store.apod)}
                    <img src="${getApod()}" height="350px" width="100%" />
                </p>
            </section>
        </main>
        <footer></footer>
    `
}

const getApod = () => {
    let data = store.apod.image.latest_photos[0].img_src
   console.log(data);
   return data
}
// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

const rover_buttons = document.querySelectorAll('button');

for (let rover_button of rover_buttons) {
    rover_button.onclick = function() {
        // store.selected_rover = rover_button.id;
        updateStore(store, { selected_rover : rover_button.id })
        console.log(store.selected_rover);
        // Make request
        // Populate image
    }
}


// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders information requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    console.log(`Butt ${state.selected_rover}`);
    let { apod } = state
    console.log("Here")
    let data = fetch(`http://localhost:3000/${state.selected_rover}`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
    console.log(data)

    return data
    // return data

}

