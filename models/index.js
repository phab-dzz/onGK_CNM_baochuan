const { dynamodb } = require('../utils/aws-helper');
const { v4: uuidv4 } = require('uuid');

const tableName = 'Articles';

const PaperModel = {
    getPapers: async() => {
        const params = {
            TableName: tableName,
        };

        try {
            const pages = await dynamodb.scan(params).promise();
            return pages.Items;
        } catch (error) {
            console.error('Error getting pages', error);
            throw error;
        }
    },
    getPaper: async(id) => {

        // const params = {
        //     TableName: tableName,
        //     KeyConditionExpression: 'id = :id',
        //     ExpressionAttributeValues: {
        //         ':id': id,
        //     }
        // };
        const params = {
            TableName: tableName,
            Key: {
                id: typeof id === "number" ? id : Number(id),  // Ép kiểu số nếu cần
            },
        };
        console.log("models params: ", params);
        try {
            const data = await dynamodb.get(params).promise();
            return data.Item;
        } catch (error) {
            console.error('Error getting page', error);
            throw error;
        }
    },
    createPaper: async(paper) => {
        // const id = uuidv4();
        const id = Math.floor(Math.random() * 10000);
        console.log("ID: ", id);
        const params = {
            TableName: tableName,
            Item: {
                id,
                isbn: paper.isbn,
                title: paper.title,
                author: paper.author,
                page: paper.page,
                year: paper.year,
                image: paper.image,
            }
        };

        try {
            await dynamodb.put(params).promise();
            return { id: id, ...paper };
        } catch (error) {
            console.error('Error creating page', error);
            throw error;
        }
    },
    // updatePaper: async(id, newPaper) => {
    //     const params = {
    //         TableName: tableName,
    //         Key: {
    //           id,
    //         },
    //         UpdateExpression: "set #n = :name, #a = :authors, #p = :pages, #y = :year, #i = :img",
    //         ExpressionAttributeNames: {
    //             '#n': 'Name',
    //             '#a': 'Authors',
    //             '#p': 'pages',
    //             '#y': 'year',
    //             '#i': 'img',
    //         },
    //         ExpressionAttributeValues: {
    //             ':name': newPaper.Name,
    //             ':authors': newPaper.Authors,
    //             ':pages': newPaper.pages,
    //             ':year': newPaper.year,
    //             ':img': newPaper.img,
    //         },
    //         ReturnValues: 'ALL_NEW',
    //     };

    //     try {
    //         const updatedPaper = await dynamodb.update(params).promise();
    //         return updatedPaper.Attributes;
    //     } catch (error) {
    //         console.error('Error updating page', error);
    //         throw error;
    //     }
    // },
    deletePage: async (id,name) => {
        console.log("models Deleting paper with ID: ", id);
        console.log("Models Deleting paper with name: ", name);
        const params = {
            TableName: tableName,
            Key: {
                "id": typeof id === "number" ? id : Number(id),  // Ép kiểu số nếu cần
        // name: String(name),  // Đảm bảo name là string

            },
        };

        try {
            await dynamodb.delete(params).promise();
            return { id: id };
        } catch (error) {
            console.error('Error deleting page', error);
            throw error;
        }
    },
    updatePage: async (id, newPaper) => {
        const params = {
            TableName: tableName,
            Key: {
                id,
            },
            UpdateExpression: "set #t = :title, #a = :author, #p = :page, #y = :year, #i = :image",
            ExpressionAttributeNames: {
                '#t': 'title',
                '#a': 'author',
                '#p': 'page',
                '#y': 'year',
                '#i': 'image',
            },
            ExpressionAttributeValues: {
                ':title': newPaper.title,
                ':author': newPaper.author,
                ':page': newPaper.page,
                ':year': newPaper.year,
                ':image': newPaper.image,
            },
            ReturnValues: 'ALL_NEW',
        };

        try {
            const updatedPaper = await dynamodb.update(params).promise();
            return updatedPaper.Attributes;
        } catch (error) {
            console.error('Error updating page', error);
            throw error;
        }
    },
}

module.exports = PaperModel;