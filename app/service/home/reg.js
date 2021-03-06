const Service = require('egg').Service;

class RegService extends Service {
  	async checkReg( body ) {
        let {name, id} = body;
        let _class = body.class;
        let result = await this.app.mysql.get('student', {id});

    	if( result ) {
            return {
                status: false,
                msg: '学号已存在'
            }
        } else {
            await this.app.mysql.insert('student', {
                name,
                id,
                class: _class
            });
    
            return {
                status: true,
                msg: '注册成功'
            }
        } 

  	}
}

module.exports = RegService;