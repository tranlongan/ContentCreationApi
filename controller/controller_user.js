const connection = require('../db')
const multer = require('multer');
const path = require('path');
const util = require('util');
const {json} = require("express");
const query = util.promisify(connection.query).bind(connection)

// ********************************************************************************************************************
// set up cho việc upload ảnh
// cho biết toàn bộ thông tin về file ảnh
const storage_content_image = multer.diskStorage({
    destination: 'public/upload/contentImage',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// tạo ra function upload
const upload_content_image = multer({
    storage: storage_content_image,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

const upload = (fieldName, destination) => {
    const storage = multer.diskStorage({
        destination: destination,
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });
    return multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb);
        }
    }).single(fieldName);
}

const uploadMultiple = (fieldName, destination) => {
    const storage = multer.diskStorage({
        destination: destination,
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });
    return multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb);
        }
    }).array(fieldName);
}

const uploadByFields = (fields) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === 'image') {
                cb(null, 'public/upload/illustration');
            } else if (file.fieldname === 'images') {
                cb(null, 'public/upload/imgDescribe');
            } else {
                cb(new Error('Unknown fieldname'));
            }
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + Math.random() + path.extname(file.originalname));
        }
    });
    return multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb);
        }
    }).fields(fields);
}

// tạp ra function kiểm tra có phải là ảnh ko
function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Only image');
    }
}

// ********************************************************************************************************************

const contentDefault = async (req, res) => {
    const contentDefault = await query(`SELECT articles.*, account.username, account.avatar
                                        FROM articles
                                                 INNER JOIN account ON articles.id_user = account.id_account`)

    res.json({
        contentDefault
    })
}

const login = async (req, res) => {
    const {email, password} = req.body
    const login = await query(`SELECT *
                               FROM account
                               WHERE email_account = '${email}'
                                 AND password = '${password}'`)
    if (login.length > 0) {
        res.json({
            msg: 'login success',
            id: login[0].id_account
        })
    } else {
        res.json(
            {msg: 'no account yet'}
        )
    }
}

const register = async (req, res) => {
    const {email, username, day, month, year, phone, password} = req.body
    const birthday = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const isValueInTable = await query(`SELECT *
                                        FROM account
                                        WHERE email_account = '${email}'`)
    if (isValueInTable.length > 0) {
        res.json({
            msg: 'email already exists'
        })
    } else {
        await query(`INSERT INTO account (id_account, email_account, username, password, birthday, phone, avatar,
                                          background, introduce_yourself, is_store_registered)
                     VALUES (null, '${email}', '${username}', '${password.trim()}', '${birthday}', '${phone}',
                             'http://localhost:3001/avatar/default/default.jpg',
                             'http://localhost:3001/background/default/default.jpg', '', 0)`)
        res.json({
            msg: 'register success'
        })
    }


}

const dataForHeader = async (req, res) => {
    const {idUser} = req.query
    const dataForHeader = await query(`SELECT id_account, username, avatar, background, is_store_registered
                                       FROM account
                                       WHERE id_account = '${idUser}'`)
    res.json({
        dataForHeader
    })
}

const dataForProfile = async (req, res) => {
    const {idUser} = req.query
    const dataForProfile = await query(`SELECT account.*,
                                               articles.id_article,
                                               articles.title_article,
                                               articles.article_date,
                                               articles.illustration_for_article
                                        FROM account
                                                 INNER JOIN articles ON account.id_account = articles.id_user
                                        WHERE id_account = '${idUser}'`)
    res.json(
        {dataForProfile}
    )
}

const registerStore = async (req, res) => {
    const {idUser, nameStore, citizenId, description, businessCategory, day, month, year} = req.body
    const birthday = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;


    const check_store_registered = await query(`SELECT *
                                                FROM account
                                                WHERE id_account = '${idUser}'
                                                  AND is_store_registered = '1'`)
    if (check_store_registered.length === 0) {
        await query(`UPDATE account
                     SET is_store_registered = '1'
                     WHERE id_account = '${idUser}'`)

        const dataForProfile = await query(`SELECT *
                                            FROM account
                                            WHERE id_account = '${idUser}'`)

        await query(`INSERT INTO store (id_store, id_user, name_store, address, citizen_id, phone,
                                        avatar_store, background_store, business_category,
                                        store_category, introduction_to_store, registration_date,
                                        quantity_of_products, follower, following)
                     VALUES (null, '${idUser}', '${nameStore}', '', '${citizenId}',
                             '${dataForProfile[0].phone}',
                             '${dataForProfile[0].avatar}', '${dataForProfile[0].background}',
                             '${businessCategory}', 'store_category',
                             'description', '${birthday}', 0, 0, 0)`)

        res.json({
            msg: 'store register success'
        })
    } else {
        res.json({
            msg: 'store registered'
        })
    }

}

const dataForStore = async (req, res) => {
    const {idUser} = req.query
    const dataForStore = await query(`SELECT *
                                      FROM store
                                      WHERE id_user = '${idUser}'`)
    res.json(
        {dataForStore}
    )
}

const uploadImg = async (req, res) => {
    upload_content_image(req, res, () => {
        res.json({url: `upload/contentImage/${req.file.filename}`})
    })
}

const uploadArticle = async (req, res) => {
    const {idUser, titleArticle, tags, editorData, materials, day, month, year} = req.body

    const articleDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    await query(`INSERT INTO articles (id_article, id_user, title_article, tags, illustration_for_article, content,
                                       materials,
                                       likes, comments, article_date, is_accept)
                 VALUES (null, '${idUser}', '${titleArticle}', '${tags}',
                         'http://localhost:3001/upload/illustration/${req.file.filename}', '${editorData}',
                         '${materials}', 0, 0, '${articleDate}', 0)`)
    res.json(
        {msg: 'upload success'}
    )
}

const dataForArticles = async (req, res) => {

}

const updateAvatar = async (req, res) => {
    const {idUser} = req.body
    await query(`UPDATE account
                 SET avatar = 'http://localhost:3001/avatar/${req.file.filename}'
                 WHERE id_account = '${idUser}'`)
    res.json({
        msg: 'change avatar success'
    })
}

const updateBackground = async (req, res) => {
    const {idUser} = req.body
    await query(`UPDATE account
                 SET background = 'http://localhost:3001/background/${req.file.filename}'
                 WHERE id_account = '${idUser}'`)
    res.json(
        {msg: 'change background success'}
    )
}

const dataForDetailPost = async (req, res) => {
    const {idArticle} = req.query
    const dataForDetailPost = await query(`SELECT *
                                           FROM articles
                                           WHERE id_article = '${idArticle}'`)
    res.json({
        dataForDetailPost,
        materials1: JSON.parse(dataForDetailPost[0]?.materials)
    })
}

const updateCategoriesOfStore = async (req, res) => {
    const {inputCategoryValue} = req.body
    const {idUser} = req.query
    const idStore = await query(`SELECT id_store
                                 FROM store
                                 WHERE id_user = '${idUser}'`)
    await query(`INSERT INTO store_categories (id_store_categories, id_user, id_store, name_store_category)
                 VALUES (null, '${idUser}', '${idStore[0]?.id_store}', '${inputCategoryValue}')`)

    res.json({
        msg: 'update success'
    })

}

const dataForStoreManagement = async (req, res) => {
    const {idUser} = req.query
    const idStore = await query(`SELECT id_store
                                 FROM store
                                 WHERE id_user = '${idUser}'`)
    const dataForStoreManagement = await query(`SELECT *
                                                FROM store_categories
                                                WHERE id_store = '${idStore[0]?.id_store}'`)
    res.json({
        dataForStoreManagement
    })
}

const updateCategoryOfStore = async (req, res) => {
    const {idCategory} = req.query
    const {inputEditCategoryValue} = req.body
    await query(`UPDATE store_categories
                 SET name_store_category = '${inputEditCategoryValue}'
                 WHERE id_store_categories = '${idCategory}'`)
    res.json({
        msg: 'edit success'
    })
}

const uploadProduct = async (req, res) => {
    const arrImgDescribe = []
    const {idUser} = req.query
    const {nameProduct, idStoreCategory, price, quantity, options, content, day, month, year} = req.body
    const productDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const id_store = await query(`SELECT id_store
                                  FROM store
                                  WHERE id_user = '${idUser}'`)
    req.files.images.forEach(file => {
        arrImgDescribe.push('http://localhost:3001/upload/imgDescribe/' + file.filename)
    })
    await query(`INSERT INTO products (id_product, id_user, id_store, id_store_category, name_product,
                                       illustration_for_product, price,
                                       options_for_product, quantity_product, description_for_product,
                                       image_describe_product, evaluate, date_upload_product)
                 VALUES (null, '${idUser}', '${id_store[0].id_store}', '${idStoreCategory}', '${nameProduct}',
                         'http://localhost:3001/upload/illustration/${req.files.image[0].filename}
                         ', '${price}', '${options}', '${quantity}', '${content}', '${JSON.stringify(arrImgDescribe)}',
                         'Chưa có', '${productDate}')`)
    res.json({
        msg: 'upload product success'
    })
}

const dataForStoreCategories = async (req, res) => {
    const {idUser} = req.query
    const dataForStoreCategories = await query(`SELECT *
                                                FROM store_categories
                                                WHERE id_user = '${idUser}'`)
    res.json({
        dataForStoreCategories
    })
}

const dataForProducts = async (req, res) => {
    const {idUser} = req.query
    const dataForProducts = await query(`SELECT products.*,
                                                store_categories.name_store_category
                                         FROM products
                                                  INNER JOIN store_categories
                                                             ON products.id_store_category = store_categories.id_store_categories
                                         WHERE products.id_user = '${idUser}'`)
    res.json({
        dataForProducts
    })
}

const dataForNavStore = async (req, res) => {
    const {idUser, idProduct} = req.query
    const dataForNavStore = await query(`SELECT products.*,
                                                store.business_category,
                                                store_categories.name_store_category
                                         FROM products
                                                  JOIN store ON products.id_store = store.id_store
                                                  JOIN store_categories
                                                       ON products.id_store_category = store_categories.id_store_categories
                                         WHERE products.id_product = '${idProduct}'`)
    res.json({
        dataForNavStore
    })
}

const dataForProduct = async (req, res) => {
    const {idProduct} = req.query
    const dataForProduct = await query(`SELECT products.*,
                                               store_categories.name_store_category
                                        FROM products
                                                 INNER JOIN store_categories
                                                            ON products.id_store_category = store_categories.id_store_categories
                                        WHERE products.id_product = '${idProduct}'`)
    res.json({
        dataForProduct,
        variations: JSON.parse(dataForProduct[0].options_for_product),
        arrImgDescription: JSON.parse(dataForProduct[0].image_describe_product)
    })
}

module.exports = {
    contentDefault,
    login,
    register,
    dataForHeader,
    dataForProfile,
    registerStore,
    dataForStore,
    uploadImg,
    uploadArticle,
    dataForArticles,
    updateAvatar,
    upload,
    uploadMultiple,
    uploadByFields,
    updateBackground,
    dataForDetailPost,
    updateCategoriesOfStore,
    dataForStoreManagement,
    updateCategoryOfStore,
    uploadProduct,
    dataForStoreCategories, dataForProducts, dataForNavStore, dataForProduct
}