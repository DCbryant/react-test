import React from 'react';
import { connect } from 'react-redux';
import { loadListData } from '../../store/actions'

class Home extends React.Component{
    componentDidMount(){
        console.log(this.props);
    }

    render() {
        return <div onClick={
            () => {
                loadListData()
                console.log(loadListData())
            }
        }>home</div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      state
    }
}

export default connect(mapStateToProps)(Home);