const Phonebooks = require('../models/Phonebooks');
const path = require('path')
const fs = require('fs')

const getPhonebooks = async ({ page = 1, limit = 60, keyword = '', sort = 'asc' }) => {
    const offset = (page - 1) * limit
    const phonebooks = await Phonebooks.find({
        $or: [{
            name: new RegExp(keyword, 'i')
        }, {
            phone: new RegExp(keyword, 'i')
        }]
    }).limit(limit).skip(offset).collation({locale: "en"}).sort({ name: sort })

    const total = await Phonebooks.aggregate().match({$or: [{
        name: new RegExp(keyword, 'i')
    }, {
        phone: new RegExp(keyword, 'i')
    }]}).count("contactCount")
    const pages = Math.ceil((total[0]? total[0].contactCount : 0) / limit)
    return { phonebooks, page, limit, pages, total: total[0] ? total[0].concatCount : 0 }
};

const getPhonebook = (id) => Phonebooks.findById(id);

const createPhonebook = (input) => Phonebooks.create(input);

const updatePhonebook = (id, input) => Phonebooks.findByIdAndUpdate(id, input, { new: true });

const updateAvatar = (id, avatar) => Phonebooks.findByIdAndUpdate(id, avatar, { new: true });

const deletePhonebook = async (id) => {
    try {
        const rmPhonebook = await Phonebooks.findByIdAndDelete(id, { new: true });
        if (rmPhonebook.avatar) {
            const filePath = path.join(__dirname, '..', 'public', 'images', rmPhonebook.avatar);
            try { fs.unlinkSync(filePath) } catch {
                return rmPhonebook
            }
        }
        return rmPhonebook
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getPhonebooks, getPhonebook, createPhonebook, updatePhonebook, updateAvatar, deletePhonebook }