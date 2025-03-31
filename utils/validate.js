const nameRegex = /^[a-zA-Z0-9\s]+$/;
const typeRegex = /^[a-zA-Z0-9\s]+$/;
const semesterRegex = /^[0-9]+$/;
const isbnRegex = /^\d{3}-\d{3}-\d{3}$/;
const facultyRegex = /^[a-zA-Z\s]+$/;
const checkEmpty = payload => {
  // Kiểm tra xem payload có thuốc tính nào bị rỗng không
  const { title,author } = payload;
  if ( !author || !title) {
    return true;
  }
  return false;
};

module.exports = {
  validatePayload: payload => {
    const { title, author,isbn} = payload;
    const errors = [];

    if (checkEmpty(payload)) {
      errors.push("All fields are required");
    }

    if (!nameRegex.test(author)) {
      errors.push("Name must be a string");
    }
    if (!nameRegex.test(title)) {
      errors.push("Title must be a string");
    }
    if (!isbnRegex.test(isbn)) {
      errors.push("ISBN must be in the format xxx-xxx-xxx");
    }

    if (errors?.length > 0) {
      return errors;
    }

    return null;
  },
};
