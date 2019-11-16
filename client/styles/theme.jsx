import { createMuiTheme } from '@material-ui/core/styles'
import { amber, red, green } from '@material-ui/core/colors'

// It doesnt say you have to use createMuiTheme in the docs,
// but we couldnt get MUI+Theme to work without it - TM
export default createMuiTheme({
    palette: {
        warning: {
            main: amber[700]
        },
        error: {
            main: red[600]
        },
        success: {
            main: green[600]
        },
        info: {
            main: '#385fdc'
        }
    }
})
