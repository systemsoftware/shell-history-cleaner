const fs = require('fs')
const electron = require('electron')
const { homedir } = require('os')
const { join } = require("path")

const promptIsInstalled = () => {
    try {
        require.resolve('electron-prompt')
        return true
    } catch (e) {
        return false
    }
}

electron.app.on('ready', async () => {
try{
electron.app.dock.hide()
const d = await electron.dialog.showMessageBox(null,{
    buttons:[
        "Zsh",
        "Bash",
        "Other",
        "Cancel"
    ],
    message:"Which one?"
})
if(d.response == 3) return electron.app.quit()
const type = d.response == 2 ? await require('electron-prompt')({
    title: "Custom type",
    label: `What type?`
}) : d.response == 0 ? 'zsh' : "bash"
const path = join(homedir(), `.${type}_history`)
if(!fs.existsSync(path)) {
    await electron.dialog.showMessageBox(null, { message:`${homedir()}/.${type}_history does not exist.` })
    return electron.app.quit() 
}
if(promptIsInstalled()) {
const lines = await require('electron-prompt')({
    title: "Number of lines",
    label: `How many lines? (0 to clear)`,
})
if (lines === null) return electron.app.quit()
if(lines == 0) {
    const confirm = await electron.dialog.showMessageBox(null, {
        message: "Are you sure you want to clear the history?",
        buttons: ["Yes", "No"]
    })
    if(confirm.response == 1) return electron.app.quit()
    fs.writeFileSync(path, '')
    await electron.dialog.showMessageBox(null, { message:`Cleared ${type} history` })
    return electron.app.quit()
}
const data = fs.readFileSync(path, 'utf8').split('\n')
const newData = data.slice(lines).join('\n')
fs.writeFile(path, newData, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});
}else{
const confirm = await electron.dialog.showMessageBox(null, {
    message: "Are you sure you want to clear the history?",
    buttons: ["Yes", "No"]
})
if(confirm.response == 1) return electron.app.quit()
fs.writeFileSync(path, '')
await electron.dialog.showMessageBox(null, { message:`Cleared ${type} history` })
}
electron.app.quit()
}catch (e) {
electron.dialog.showErrorBox("Error", e.message)
electron.app.quit()
}
})