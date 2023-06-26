import db from '../models/index';
import redisService from '../redisService'


let getHomePage = async (req, res) => {
    try {
        redisService.redisConnect();
        redisService.setData('helloworld', 'Hello World Redis!')
        let data = await redisService.getData('helloworld')

        return res.render("homepage.ejs",
            { dataFromRedis: data });
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

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getHelloWorld: getHelloWorld
}
