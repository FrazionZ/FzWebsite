export default class Language {

    constructor(lang){
        this.lang = lang
        this.loggerReplaceVar = () => [
            { 
                key: '%user_name%', 
                value: log.userOrigin.name 
            }
        ]
    }

    get(key, replaceArr){
        let parts = key.split('.')
        let currentObject = this.lang;
        for (let i = 0; i < parts.length; i++) {
            currentObject = currentObject?.[parts?.[i]];
        }

        if(replaceArr !== undefined)
            if(currentObject !== undefined){
                replaceArr.map((rs) => {
                    currentObject = currentObject.replaceAll(rs.key, rs.value)
                })
            }
            

        return currentObject
    }

    replaceMonth(str)  {
        return str.replaceAll('January', 'Janvier')
            .replaceAll('February', 'Février')
            .replaceAll('March', 'Mars')
            .replaceAll('April', 'Avril')
            .replaceAll('May', 'Mai')
            .replaceAll('June', 'Juin')
            .replaceAll('July', 'Julliet')
            .replaceAll('August', 'Août')
            .replaceAll('September', 'Septembre')
            .replaceAll('October', 'Octobre')
            .replaceAll('November', 'Novembre')
            .replaceAll('December', 'Décembre')
    }
}