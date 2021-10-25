const {Diet, Recipe} = require('../db');

const getDbInfo = async () => {
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
    })
}

module.exports = {
    getDbInfo
}