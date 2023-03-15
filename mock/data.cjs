const Mock = require('mockjs');

const random = Mock.Random;

let listData = [];

for(let i = 0; i < 10000; i++){
  let value = random.cparagraph();
  listData.push({
    // id: i+1,
    value: value
  });
}

module.exports = () => {
    return {listData};
};