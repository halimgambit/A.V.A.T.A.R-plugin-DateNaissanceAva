export async function init () {
    await Avatar.lang.addPluginPak('DateNaissanceAva');
}

export async function action(data, callback) {
    
    try {

        const L = await Avatar.lang.getPak('DateNaissanceAva', data.language);

        const tblActions = {
            birthDay: () => birthDay(data.client, L)                   
        };
        
        info("DateNaissanceAva:", data.action.command, L.get("plugin.from"), data.client);
        
        if (tblActions[data.action.command]) {
            await tblActions[data.action.command]();
        }
    } catch (err) {
        if (data.client) Avatar.Speech.end(data.client);
        error("Erreur DateNaissanceAva:", err.message || err);
    }   

    callback();
}

const birthDay = (client, L) => {

    const getAge = (birthday) => {
        const birthDate = new Date(birthday);
        const diff = Date.now() - birthDate.getTime();
        return Math.floor(diff / 31536000000);
    };
        
    const avatarAge = getAge("2017-10-01");
    
    Avatar.speak(L.get("speech.avatar", avatarAge), client);

};