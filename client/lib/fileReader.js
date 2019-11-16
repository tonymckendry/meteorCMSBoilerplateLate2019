export const readFile = file =>
    new Promise(resolve => {
        let reader = new FileReader()
        reader.onload = result => {
            resolve({
                path: file.path || file.name,
                preview: URL.createObjectURL(file),
                uri: result.target.result
            })
        }
        reader.readAsDataURL(file)
    })

export const readFiles = files => Promise.all(files.map(readFile))
