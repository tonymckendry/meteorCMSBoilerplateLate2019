import React from 'react'
/**
 *
 * Higher Order Component for determining window size and passing dimensions as props
 *
 */
export default function windowSize (Component) {
    class WindowSizeComponent extends React.Component {
        /**************************************************************
         * COMPONENT LIFECYCLE
         *************************************************************/
        componentWillMount () {
            this.setState({
                innerHeight: window.innerHeight,
                innerWidth: window.innerWidth
            })
        }
        componentDidMount () {
            window.addEventListener('resize', this.handleWindowResize, false)
        }
        componentWillUnmount () {
            window.removeEventListener('resize', this.handleWindowResize, false)
        }
        /**************************************************************
         * EVENT HANDLING
         *************************************************************/
        handleWindowResize = () => {
            this.setState({
                innerHeight: window.innerHeight,
                innerWidth: window.innerWidth
            })
        }
        /**************************************************************
         * RENDERING
         *************************************************************/
        render () {
            return <Component {...this.props} {...this.state} />
        }
    }
    /**************************************************************
     * RETURN COMPONENT
     *************************************************************/
    return WindowSizeComponent
}
