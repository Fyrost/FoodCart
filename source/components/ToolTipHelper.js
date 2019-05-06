import React from 'react'
import { Tooltip, Icon
} from 'react-native-elements'

 export default ToolTipHelper = (props) => (
    <Tooltip
        width={props.width || 'auto'}
        containerStyle={props.containerStyle || {height:'auto', marginHorizontal:10 }}
        backgroundColor={props.backgroundColor || '#11CDEF'}
        popover={props.children}
        {...props}
    >
            <Icon
            raised
            reverse
            name={'question'}
            type={'font-awesome'}
            color={props.iconColor || '#00CC66'}
            size={props.iconSize || 10}
            />
    </Tooltip>
)