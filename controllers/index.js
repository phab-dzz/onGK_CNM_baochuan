const PaperModel = require('../models/index');
const {validatePayload} = require('../utils/validate');
const { uploadFile } = require('../services/file.service');

const Controller = {};

Controller.get = async(req, res) => {
    try {
        const papers = await PaperModel.getPapers();
        return res.render('index', { papers });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

Controller.getOne = async(req, res) => {
    let { id } = req.params;
    id = parseInt(id, 10); // Convert id to integer
    console.log("Received ID: ", id);
    try {
      
        const paper = await PaperModel.getPaper(id);

        if (paper) {
            return res.render('edit', { paper });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error1' });
    }
};

Controller.post = async (req, res) => {
    
    const errors = validatePayload(req.body);
    if (errors) {
        res.send(errors.join(", "));
    }

    const { name, author, page, year,title,isbn } = req.body;
    const image = req.file;

    try {
        console.log("Received data: ", req.body);
        const imgURL = await uploadFile(image);
        console.log("Image URL: ", imgURL);
        const paper = await PaperModel.createPaper({name, author, page, year,title,isbn, image: imgURL});
        
        console.log("Paper created successfully: ", paper);
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Error creating page ne");
    }
};
Controller.delete = async (req, res) => {
    try {
        let { id } = req.params;
        
        id = parseInt(id, 10); // Convert id to integer
        console.log("Deleting paper with ID: ", id);
        console.log("Deleting paper with data types ID:", typeof id);

    //    const exists= await PaperModel.getOne(id);
    //   console.log("Paper exists: ", exists);

       const paper= await PaperModel.deletePage(id);
       if(paper)
       {
        console.log("Paper deleted successfully: ", paper);
      return  res.redirect('/');
       }
      
        // Nếu không tìm thấy dữ liệu để xóa
        res.status(404).send("Paper not found");
      
    } catch (error) {
        if (!res.headersSent) { // Kiểm tra trước khi gửi phản hồi lỗi
            res.status(500).send("Error deleting paper");
        }
    }
};
Controller.put = async (req, res) => {
    let { id } = req.params;
    id = parseInt(id, 10); // Convert id to integer
    const { author, page, year, title, isbn, old_image } = req.body;
    let imgURL = old_image; // Mặc định giữ ảnh cũ

    try {
        console.log("Received data: ", req.body);

        if (req.file) {
            console.log("Received Image: ", req.file);
            imgURL = await uploadFile(req.file); // Upload ảnh mới nếu có
            console.log("Image URL: ", imgURL);
        }

        // Cập nhật dữ liệu vào database
        const paper = await PaperModel.updatePage(id, {
            author,
            page,
            year,
            title,
            isbn,
            image: imgURL,
        });

        console.log("Paper updated successfully: ", paper);
        res.redirect('/');
    } catch (error) {
        console.error("Error updating page:", error);
        res.status(500).send("Error updating page");
    }
};





module.exports = Controller;