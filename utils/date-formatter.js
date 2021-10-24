const shortMonths = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'
]

exports.formatDate = dateObject => {
  return `${dateObject.getDate()} ${shortMonths[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
}