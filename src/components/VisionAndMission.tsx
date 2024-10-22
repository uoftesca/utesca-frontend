import React from 'react';

/**
 * VisionAndMission component displays the vision and mission statement.
 */
const VisionAndMission: React.FC = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Our Vision & Mission</h2>
            <p style={styles.paragraph}>
                UTESCA began with a simple idea: How can we bring engineering
                students together to give back to our local community? Over
                time, this has evolved into our three core offerings:
            </p>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '912px',
        margin: '0 auto',
        padding: '0 16px',
        textAlign: 'center',
    },
    heading: {
        fontSize: '1.875rem', // 3xl
        fontWeight: 'bold',
        color: '#991B1B', // red-800
    },
    paragraph: {
        marginTop: '1rem',
        color: '#4B5563', // gray-700
    },
};

export default VisionAndMission;
