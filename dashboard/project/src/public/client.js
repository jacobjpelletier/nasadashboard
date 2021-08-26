/*
TODO:
    1. iterate over API data to add photos to DOM
    2. pass 'selected rover' to API

 */

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

// selector buttons for rovers
const rover_buttons = document.querySelectorAll('button');

// add listener for click to each button.
// such that, when each button is clicked, the selected rover of object store is then updated.
for (let rover_button of rover_buttons) {
    rover_button.onclick = function() {
        // store.selected_rover = rover_button.id;
        updateStore(store, { selected_rover : rover_button.id })
        console.log(store.selected_rover);
        /* API call happens here!!! */
        getAPIData(store);
        // Make request
        // Populate image
    }
}

/* Called by for loop; called when a button is clicked
*  Input: the store object, selected rover id from button clicked
*  Output: will call render to update HTML
*  */
const updateStore = (store, newState) => {
    store = Object.assign(store, newState) // reassign current store object to a new store object with new selected rover
    render(root, store)
}

/* Called by update store
 * Input: DOM root, the current state
 * Output: updates DOM with App function
 */
const render = async (root, state) => {
    root.innerHTML = App(state);
}


/* Called by render
 * Calls getLatestPhotosObject
 * Input: current state (some store object)
 * Output: puts filler dom with html, uses getApod
 */
const App = (state) => {
    let { rovers, apod } = state
    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    ${getLatestPhotosObject(store.apod)}
                </p>
            </section>
        </main>
        <footer></footer>
    `
}
/* for testing
                    <!-- <img src="${getApod()}" height="350px" width="100%" /> --> // html
const getApod = () => {
    let data = store.apod.image.latest_photos[0].img_src
    console.log(data);
    return data
}
*/

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

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
const getLatestPhotosObject = (apod) => {

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
        `)
    } else {
        let data = store.apod.image.latest_photos;
        // let data = store.apod.image;
        // console.log(data);
        console.log(data);
        // return getImageAndDesc(data[1]);
        // return getImageAndDesc(data);
        data.forEach(photo => {
            //console.log(photo);
            return getImageAndDesc(photo);
        });
    }
}

const getImageAndDesc = (data) => {
    return (`
            <img src="${data.img_src}" height="350px" width="100%" />
            <p>Rover: ${data.rover.name} <br> Landing Date: ${data.rover.landing_date} <br>
            Camera: ${data.camera.full_name} <br> Taken on Sol: ${data.sol}
            </p>
    `)
}


// ------------------------------------------------------  API CALLS

// Called by for loop - occurs whenever a rover is selected
// In turn this function called update store
const getAPIData = (state) => {
    // console.log(`Butts ${state.selected_rover}`);
    // let { apod } = state
    let data = fetch(`http://localhost:3000/${state.selected_rover}`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }));
    // console.log(data);


    //return data

}

