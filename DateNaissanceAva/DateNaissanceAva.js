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

     const birthDate = Config?.modules?.DateNaissanceAva?.birthDate;

    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();

    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    Avatar.speak(L.get("speech.avatar", age), client, () => Avatar.Speech.end(client));

};
