const Article = require('../models/articlesModels');

// Mendapatkan semua artikel
const getAllArticles = {
    method: 'GET',
    path: '/articles',
    handler: async () => {
        const articles = await Article.findAll(); // Mengambil data dari database
        return {
            status: 'success',
            data: articles,
        };
    },
};

// Mendapatkan artikel berdasarkan ID
const getArticleById = {
    method: 'GET',
    path: '/articles/{id}',
    handler: async (request, h) => {
        const { id } = request.params;
        const article = await Article.findByPk(id); // Mengambil data berdasarkan primary key

        if (!article) {
            return h.response({
                status: 'fail',
                message: 'Artikel tidak ditemukan!',
            }).code(404);
        }

        return {
            status: 'success',
            data: article,
        };
    },
};

// Menambahkan artikel baru
const addArticle = {
    method: 'POST',
    path: '/articles',
    handler: async (request, h) => {
        const { name, image, summary, description, publishDate } = request.payload;

        const newArticle = await Article.create({
            name,
            image,
            summary,
            description,
            publishDate,
        });

        return h.response({
            status: 'success',
            message: 'Artikel berhasil ditambahkan!',
            data: newArticle,
        }).code(201);
    },
};

// Memperbarui artikel berdasarkan ID
const updateArticle = {
    method: 'PUT',
    path: '/articles/{id}',
    handler: async (request, h) => {
        const { id } = request.params;
        const { name, image, summary, description, publishDate } = request.payload;

        const article = await Article.findByPk(id);

        if (!article) {
            return h.response({
                status: 'fail',
                message: 'Artikel tidak ditemukan!',
            }).code(404);
        }

        await article.update({ name, image, summary, description, publishDate });

        return {
            status: 'success',
            message: 'Artikel berhasil diperbarui!',
            data: article,
        };
    },
};

// Menghapus artikel berdasarkan ID
const deleteArticle = {
    method: 'DELETE',
    path: '/articles/{id}',
    handler: async (request, h) => {
        const { id } = request.params;

        const article = await Article.findByPk(id);

        if (!article) {
            return h.response({
                status: 'fail',
                message: 'Artikel tidak ditemukan!',
            }).code(404);
        }

        await article.destroy();

        return {
            status: 'success',
            message: 'Artikel berhasil dihapus!',
        };
    },
};

module.exports = [getAllArticles, getArticleById, addArticle, updateArticle, deleteArticle];
