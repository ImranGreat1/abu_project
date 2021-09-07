const slugify = require('slugify');

exports.isSameLevelAndDepartment = (user, doc) => {
   // you have to represent the department and level or be an admin to delete a document
   if (
      (user.department !== doc.department || user.level.toString() !== doc.level)
      &&
      user.role !== 'admin'
      ) {
      return false;
    }

    return true;
}


exports.generateUniqueSlug = (text) => {
   // Slugify the first 20 characters of the description or all if < 20
   if (text.length > 20) {
      text = text.substr(0, 20);
   }
   
   let slug = slugify(text, { lower: true, replacement: '-' });
 
   // Generate random string to add to slug
   const randomString =  Date.now().toString() + Math.random().toString().replace('.', 'a');
   slug += randomString;;

   return slug;
 };