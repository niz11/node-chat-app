var isRealString = (str) => {
  return typeof str==='string' && str.trim().length > 0; //trim - takes out empty scaces from the end and begin of the strng
};

module.exports = {
  isRealString
}
