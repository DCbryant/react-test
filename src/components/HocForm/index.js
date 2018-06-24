import React from 'react'

export default function HOCForm(Component){
    return class wrapperComponent extends React.Component{
        constructor(props){
            super(props)
            this.state = {}
        }
        handleChange = (key,val) => {
            this.setState({
                [key]:val
            })
        }

        render(){
            return <Component handleChange={this.handleChange} state={this.state} {...this.props} />
        }
    }
}