const express = require('express');
const axios = require("axios");
const path = require('path');
const bodyParser = require('body-parser');
const secrets = require("./secrets");

const app = express();

// serve the static files from the React app
app.use(express.static(path.join(`${__dirname}/client/build`)));
app.use(express.static(path.join(`${__dirname}/client/src/assets`)));

// parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//
const host = 'http://api.themoviedb.org/3';
const keyLang = `?api_key=${secrets['api_key']}&language=en-US`

//
app.post('/discover', async (req, res) => {

    const {person1, person2} = req.body;
    const [personObj1, personObj2] = await Promise.all([getPersonId(person1), getPersonId(person2)])

    const discoverMovie = '/discover/movie';
    const query = `&with_people=${personObj1.id},${personObj2.id}&sort_by=popularity.desc`;
    const endPoint = `${host}${discoverMovie}${keyLang}${query}`;
    const response = await axios.get(endPoint);
    const result = response.data.results;
    if (result.length) result.map( movie => movie.img = setImageSrc(movie['poster_path']));
    res.send([personObj1, personObj2, result]);
})

//
app.get('/search/person/:id', async(req, res) => {
    const id = req.params.id;
    const personId = `/person/${id}`;
    const endPoint = `${host}${personId}${keyLang}`;
    const response = await axios.get(endPoint);
    const result = response.data;
    result.img = setImageSrc(result['profile_path']);
    result.birthday = formatDate(result.birthday);
    result.deathday = formatDate(result.deathday);
    res.send(result);
})

//
app.get('/search/movie/:id', async(req, res) => {
    const id = req.params.id;
    const movieId = `/movie/${id}`;
    const endPoint = `${host}${movieId}${keyLang}`;
    const response = await axios.get(endPoint);
    const result = response.data;
    result.img = setImageSrc(result['poster_path']);
    result['release_date'] = formatDate(result['release_date']);
    result.revenue = formatRevenue(result.revenue);
    res.send(result);
})

//
const getPersonId = async (name) => {
    name = name.trim().toLowerCase().replace(/[^a-zA-Z ]|\s\s+/g, ' ').split(' ').join('+');
    const query = `&query=${name}`;
    const searchPerson = '/search/person';
    const endPoint = `${host}${searchPerson}${keyLang}${query}`;
    const response = await axios.get(endPoint);
    const result = response.data.results[0];
    result.img = setImageSrc(result['profile_path']);
    return result;
}

//
const setImageSrc = path => {
    const defaultImg = `./default-movie.png`;
    const imageOriginal = 'http://image.tmdb.org/t/p/original';
    return (path === null) ? defaultImg : `${imageOriginal}${path}${keyLang}`
}

//
const formatDate = (date) => {
    if (date === null) return null;
    const month = {
        '01' : 'January',
        '02' : 'February',
        '03' : 'March',
        '04' : 'April',
        '05' : 'May',
        '06' : 'June',
        '07' : 'July',
        '08' : 'August',
        '09' : 'September',
        '10' : 'October',
        '11' : 'November',
        '12' : 'December',
    }
    const arr = date.split('-');
    return `${month[arr[1]]} ${arr[2]}, ${arr[0]}`
}

//
const formatRevenue = revenue => {
    const arr = revenue.toString().split('');
    const mod = arr.length%3;
    const result = [];
    let j = mod;
    for (let i=0; i<arr.length; i++) {
        if (j===i) {
            if (i!==0) result.push(',')
            j+=3;
        }
        result.push(arr[i]);
    }
    return result.join('');
}

//
app.get('*', (req,res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server is listening on port ${port}`);
