const slugify = require('slugify');

exports.isSameLevelAndDepartment = (userProfile, doc) => {
  // you have to represent the department and level or be an admin to delete a document
  if (
    (userProfile.department !== doc.department ||
      userProfile.level !== doc.level) &&
    userProfile.role !== 'admin'
  ) {
    return false;
  }

  return true;
};

exports.generateUniqueSlug = (text) => {
  // Slugify the first 20 characters of the description or all if < 20
  if (text.length > 20) {
    text = text.substr(0, 20);
  }

  let slug = slugify(text, { lower: true, replacement: '-' });

  // Generate random string to add to slug
  const randomString =
    Date.now().toString() + Math.random().toString().replace('.', 'a');
  slug += randomString;

  return slug;
};

exports.transformToCamelCase = (text) => {
  let textArr = text.split(' ');
  textArr = textArr.map((element, index) => {
    if (index !== 0) {
    }
  });
};
