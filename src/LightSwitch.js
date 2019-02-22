import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class LightSwitch extends Component {
	render (){
		return (<button className='btn btn-default' onClick = {this.props.onToggle}>Toggle Power</button>);
	}
}

LightSwitch.propTypes = {
	onToggle: PropTypes.func
};