import React, { useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import PropTypes from 'prop-types'
import { useStore } from 'state'
//MUI
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
//Icons
import ExitToApp from '@material-ui/icons/ExitToApp'
import Password from '@material-ui/icons/LockOpen'
import IconCamera from '@material-ui/icons/CameraAlt'
//Local Imports
import EditableListItem from 'components/lists/editableListItem'
import UploaderDialog from 'components/uploader/dialog'
import ChangePasswordDialog from 'components/dialogs/changePassword'

import { useWindowSize } from 'lib/useWindowSize'

const Profile = () => {
    const { authStore } = useStore()
    const { height, width } = useWindowSize()
    const store = useStore()
    const classes = useStyles({ height, width })
    const inputRef = useRef(null)
    const isMobile = width < 600
    const user = authStore.currentUser
    const headerStore = store.rootStore.header

    const [openChangePassword, setOpenChangePassword] = useState(false)
    const [uploaderOpen, setUploaderOpen] = useState(false)
    const [hover, setHover] = useState(false)

    const handleSaveClick = key => value => authStore.updateUser(key, value)

    const toggleDialog = state => () => {
        setUploaderOpen(state)
        setHover(false)
    };

    // this is only for mobile
    const convertFile = file => {
        let reader = new FileReader()
        let blob
        reader.onload = function (e) {
            blob = e.target.result
            handleUpload(blob, file.name)
        };

        reader.readAsDataURL(file)
    };

    // this is only for mobile
    const handleUpload = (blob, name) => {
        Meteor.call(
            'uploadPic',
            user.id,
            blob,
            'profilePic',
            true,
            name,
            (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    setUploaderOpen(false)
                }
            }
        )
    };

    useEffect(() => {
        headerStore.setTitle('Profile')
    }, [])

    return (
        <div className={classes.root}>
            <ChangePasswordDialog
                open={openChangePassword}
                setOpen={setOpenChangePassword} />
            <div
                className={classes.profileImage}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                <img
                    src={
                        user.picture
                        && user.picture

                    }
                    alt={user.fullName}
                    className={classes.avatar} />
                {(hover || isMobile) && (
                    <div className={classes.cameraContainer}>
                        {isMobile ? (
                            <label htmlFor="profile-image">
                                <IconCamera className={classes.cameraIcon} />
                                <input
                                    id="profile-image"
                                    name="profile-image"
                                    type="file"
                                    className={classes.file}
                                    onChange={e => {
                                        convertFile(e.target.files[0])
                                    }}
                                    onClick={() => {
                                        inputRef.current.value = null
                                    }}
                                    ref={inputRef} />
                            </label>
                        ) : (
                                <IconCamera
                                    onClick={toggleDialog(true)}
                                    className={classes.cameraIcon} />
                            )}
                    </div>
                )}
            </div>
            <UploaderDialog
                open={uploaderOpen}
                setOpen={setUploaderOpen}
                title={'Upload Profile Picture'}
                type="profilePic"
                databaseId={user.id}
                single={true} />
            <List>
                <Typography variant="h4" gutterBottom>
                    {user.fullName}
                </Typography>
                <EditableListItem
                    onChange={handleSaveClick('profile.firstName')}
                    value={user.firstName} />
                <EditableListItem
                    onChange={handleSaveClick('profile.lastName')}
                    value={user.lastName} />
                <EditableListItem
                    onChange={handleSaveClick('emails.0.address')}
                    value={user.email} />
                <EditableListItem
                    onChange={handleSaveClick('profile.phone')}
                    value={user.phone} />
                <ListItem divider button onClick={setOpenChangePassword}>
                    <ListItemIcon>
                        <Password />
                    </ListItemIcon>
                    <ListItemText primary={<span>Change Password</span>} />
                </ListItem>
                <ListItem
                    className={classes.signOutButton}
                    divider
                    button
                    onClick={() => authStore.logout()}>
                    <ListItemIcon>
                        <ExitToApp className={classes.iconLogout} />
                    </ListItemIcon>
                    <ListItemText primary={<span>Sign Out</span>} />
                </ListItem>
            </List>
        </div>
    )
};
Profile.propTypes = {
    classes: PropTypes.object
}

const useStyles = makeStyles(theme => ({
    avatar: {
        marginBottom: '2rem',
        borderRadius: 100,
        height: props => (props.height < 600 ? 150 : 200)
    },
    root: {
        textAlign: 'center',
        minHeight: 'calc(100vh)',
        padding: '1rem 1.6rem',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            paddingTop: 55,
            paddingBottom: 55
        }
    },

    signOutButton: {
        background: '#15334a12'
    },
    profileImage: {
        display: 'inline-block',
        marginBottom: '1.6rem',
        position: 'relative'
    },
    cameraContainer: {
        position: 'absolute',
        left: '50%',
        top: '45%',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer'
    },
    cameraIcon: {
        fill: 'white',
        height: 40,
        width: 40
    },
    file: {
        display: 'none'
    }
}))

export default observer(Profile)
