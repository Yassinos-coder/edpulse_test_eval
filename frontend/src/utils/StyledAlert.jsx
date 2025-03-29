import React, { useEffect, useState } from 'react';
import './StyledAlert.css';

function StyledAlert(props) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (props.status !== 'unknown') {
            setIsVisible(true); // Show the alert when status is success or failed
        } else {
            setIsVisible(false); // Hide alert when status is unknown
        }
    }, [props.status]);

    return (
        <div className={`alert ${isVisible ? 'dropIn' : ''}`}>
            {isVisible && (
                <p>
                    {props.status === 'success' && 'Form Submitted Successfully'}
                    {props.status === 'failed' && 'Form Submission Failed'}
                </p>
            )}
        </div>
    );
}

export default StyledAlert;
