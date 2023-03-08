const Mock = require('mockjs');

const random = Mock.Random;

let listData = [];

for(let i = 0; i < 100; i++){
  let value = random.cparagraph();
  listData.push({
    id: i+1,
    value: value
  });
}

module.exports = () => {
    return {listData};
};