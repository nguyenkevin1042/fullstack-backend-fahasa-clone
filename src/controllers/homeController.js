import db from '../models/index';

let getHomePage = async (req, res) => {
    try {

        return res.render("homepage.ejs");
    } catch (error) {
        console.log(error)
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getHelloWorld = (req, res) => {
    return res.status(200).json({
        message: 'Hello World'
    });
}

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getHelloWorld: getHelloWorld
}
