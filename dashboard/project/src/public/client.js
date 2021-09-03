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

/* selector buttons for rovers */
const rover_buttons = document.querySelectorAll('button');

/* add listener for click to each button.
 * such that, when each button is clicked, the selected rover of object store is then updated.
 */
rover_buttons.forEach(rover => {
    rover.onclick = function() {
        // update store.selected_rover with the rover that is selected by the user
        updateStore(store, { selected_rover : rover.id })
        // when button is clicked, call for data from API
        getAPIData(store);
    }
})

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
            <section>
                ${getLatestPhotosObject(store.apod)}
            </section>
        </main>
        <footer></footer>
    `
}

/* listening for load event because page should load before any JS is called */
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS
/* Pure function that renders information requested from the backend
 * Called by APP
 * Input: store.apod
 * Output: html with API data to populate id="loadAPIDataHere"
 */
const getLatestPhotosObject = (apod) => {
    // upon initial load, apod will be blank until a button is clioked. this is to avoid console errors.
    if (apod == ''){
        return "<h2>Click any rover to see that rover\'s photos from Mars. . .</h2>";
    }
    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
        `)
    } else {
        let data = store.apod.image.latest_photos;
        /* !!! check if I hit my API rate limit here */
        // console.log(store.apod.image);
        const APITToData = data.map(photo => {
            return `<img src="${photo.img_src}" height="350px" width="100%" />
                    <p>Rover: ${photo.rover.name}</p>
                    <p>Rover Status: ${photo.rover.status}</p>
                    <p>Launcg Date: ${photo.rover.launch_date}</p>
                    <p>Landing Date: ${photo.rover.landing_date}</p>
                    <p>Camera: ${photo.camera.full_name}</p> 
                    <p>Taken on Sol: ${photo.sol}</p>
            `;
        })
        return APITToData;
    }
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
}