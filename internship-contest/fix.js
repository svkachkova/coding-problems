module.exports = function(participants, sports) {  
    /**  
     * Подобно оператору new создает экземпляр объекта,  
     * используя функцию-конструктор и параметры для нее  
     */  
    function constructFrom(fnConstructor, ...params) {  
        const res = {}; 

        fnConstructor.apply(res, params); 
        Object.setPrototypeOf(res, fnConstructor.prototype);  
 
        return res;  
    }  

    /**  
     * Создает пары вида [’вид спорта’, ’имя участника’],  
     * где первому виду спорта соответствует последний участник  
     */  
    function assignParicipants() {  
        const participants = this.participants;  
        const sports = this.sports;  
        let orderIndexes = [];  
        
        for (let i = 0; i < sports.length; i++) {
            orderIndexes.push([sports[i], participants[sports.length - 1 - i]]);
        }
        
        return orderIndexes;
    } 
 
    function Contest(participants, sports) {  
        this.participants = participants;  
        this.sports = sports;  
    }

    Contest.prototype.assignParicipants = assignParicipants;

    const contest = constructFrom(Contest, participants, sports);

    return contest.assignParicipants();  
}