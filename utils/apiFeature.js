class APIFeatures{
    constructor(query,queryString){
        this.query = query
        this.queryString = queryString 
    }
    filter(){

        const queryObj = {...this.queryString}
        const excludeFields = ['page','limit','sort','fields']
        excludeFields.forEach(el=>{
            delete queryObj[el]
        })
        
        //1.2)Advancd filters
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace( /\b(gt|gte|lt|lte|in)\b/g, '$$'+'$1'   )
        this.query.find(JSON.parse(queryStr))  
        return this      
    }
    sort(){
        
        if(this.queryString.sort){
            const sortParams = this.queryString.sort.split(',').join(' ')
            console.log(sortParams)
            this.query = this.query.sort(sortParams)
        }
        else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    selectedFields(){
        if(this.queryString.fields){
            const selectParams = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(selectParams)
        }else{
            this.query = this.query.select('-__v')
        }
        return this
    }
    pagination(){
        let page = this.queryString.page * 1 || 1
        let limit = this.queryString.limit * 1 || 100
        let skip = (page-1) * limit 
        this.query = this.query.skip(skip).limit(limit)
        return this
    }

}
module.exports = APIFeatures