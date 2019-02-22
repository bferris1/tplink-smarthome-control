import React from 'react';
import {CustomPicker} from 'react-color';
import { Saturation, Hue }  from 'react-color/lib/components/common';


class ColorPicker extends React.Component {
    
	render () { 
		return (
			<div>
				<p>Color Picker</p>
				<div style={{position: 'relative', width: '100%', height: '20px'}}>
					<Hue{...this.props}/>
				</div>
				<br/><br/>
				<div style={{position: 'relative', width: '200px', height: '200px'}}>
					<Saturation{...this.props}/>
				</div>
				{JSON.stringify(this.props)}			
			</div>);
	}
}
 
export default CustomPicker(ColorPicker);