const Service = require('egg').Service;

class LibraryService extends Service {
  	async index( body ) {

        let {num} = body,
            table = ['choice_question', 'judge_question', 'admiring_question'],
            tableName = ['选择题', '判断题', '欣赏题'],
            tableNameEn = ['choice', 'judge', 'admiring'],            
            quesLength = [],
            result = {},
            data = {},
            self = this,
            res = {}; //最终response

        for (let val of table) {

            result = await self.app.mysql.select(val, {
                columns: ['id']
            });    
            quesLength.push(result.length);
        }

        let index = 0;    

        for (let val of quesLength) {      
            if ( val < num[index] ) {
                return res =  {
                    status: false,
                    msg: `题库中${tableName[index]}只有${val}题`
                }
            } else {
                result = await self.app.mysql.select(table[index]);
                if (result === null ) {
                    return res =  {
                        status: false,
                        msg: '服务器错误'
                    }
                } else {
                    result.forEach(val => {
                        if( val.option ) {
                            val.option = val.option.split('|');
                        }
                    });
                    data[tableNameEn[index]] = result;
                    if( index === quesLength.length - 1 ) {
                        return res = {
                            status: true,
                            msg: '成功读取题库',
                            data
                        }
                    }
                }
            }
            index++;
        }
        return res; 
  	}
}

module.exports = LibraryService;