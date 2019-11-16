import { Meteor } from 'meteor/meteor'

import cloudinary from 'cloudinary/lib/cloudinary'

Meteor.methods({
    uploadPic: function (id, files, type, mobile, name) {
        if (mobile) {
            return uploadPic(id, files, name.replace(/[&\/\\#, +()$~%.‘“:*?<>{}]/g, ''), type)
        } else {
            return uploadPic(
                id,
                files[0].uri,
                files[0].path.replace(/[&\/\\#, +()$~%.‘“:*?<>{}]/g, ''),
                type
            )
        }
    }
})

export const uploadPic = (id, file, fileName, type) => {
    let presetName, folderStructure
    let theFile = file

    switch (type) {
        case 'profilePic':
            presetName = 'fwdc06e0'
            folderStructure = 'profilePic/' + id + '/' + fileName
            break
    }

    return cloudinary.v2.uploader.unsigned_upload(
        theFile,
        presetName,
        {
            cloud_name: '',
            public_id: folderStructure
        },
        Meteor.bindEnvironment((err, result) => {
            if (err) {
                console.log(err)
                return { error: err }
            } else {
                switch (type) {
                    case 'profilePic':
                        Meteor.users.update(
                            { _id: id },
                            { $set: { 'profile.picture': result.secure_url } }
                        )
                        break
                }
            }
        })
    )
}
