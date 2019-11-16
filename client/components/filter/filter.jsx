import React from 'react'
import { observer, useObserver } from 'mobx-react-lite'

import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'

import FilterListIcon from '@material-ui/icons/FilterList'
import Clear from '@material-ui/icons/Clear'

import { useStore } from 'state'

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.common.white
    }
}))

const Filter = () => {
    const store = useStore()
    const headerStore = store.rootStore.header
    const classes = useStyles()
    const handleFilterClick = (e, bool) => {
        e.stopPropagation()
        headerStore.handleFilterState(bool)
    }

    return useObserver(() => (
        <IconButton
            classes={{ label: classes.mobileLabel }}
            onClick={e => handleFilterClick(e, true)}
            aria-label="filter list"
            className={`${classes.fullWidth}`}>
            <FilterListIcon className={`${classes.mobileIcon} ${classes.icon}`} />
            <Drawer anchor="right" open={headerStore.retrieveFilterState}>
                <IconButton
                    onClick={e => handleFilterClick(e, false)}
                    classes={{ label: classes.flexEnd }}
                    aria-label="filter list"
                    className={`${classes.fullWidth}`}>
                    <Clear className={classes.mobileIcon} />
                </IconButton>
                <List>
                    <ListItem>
                        <Typography variant="h5" gutterBottom>
                            {' '}
                            Filter by:
                        </Typography>
                    </ListItem>
                    {headerStore.retrieveFilterData.map(data => {
                        return (
                            <ListItem key={data.key}>
                                <RadioGroup
                                    aria-label="radio"
                                    name="radio"
                                    className={classes.group}>
                                    <FormControlLabel
                                        value={data.key}
                                        control={<Radio />}
                                        label={data.name} />
                                </RadioGroup>
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
        </IconButton>
    ))
}

export default observer(Filter)
