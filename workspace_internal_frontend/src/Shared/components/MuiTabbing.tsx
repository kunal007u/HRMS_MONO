import { Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';

interface TabContent {
    label: string;
    content: React.ReactNode;
}

interface Props {
    tabs: TabContent[];
    tabIndex?: (index: number) => void;
}

function CustomTabbing({ tabs,tabIndex }: Props) {
    const [value, setValue] = useState(0);
    tabIndex(value)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div >
            <div className="white-box" style={{ padding: 0 }}>

                <Tabs value={value} onChange={handleChange} aria-label="custom tabs example">
                    {tabs.map((tab, index) => (
                        <Tab key={index} label={tab.label} />
                    ))}
                </Tabs>
            </div>
            <Typography />
            {tabs.map((tab, index) => (
                <div key={index} hidden={value !== index} className='mt-1 mb-1'>
                    {tab.content}
                </div>
            ))}
        </div>
    );
}

export default CustomTabbing;