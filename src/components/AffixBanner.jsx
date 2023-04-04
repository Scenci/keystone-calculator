import React from 'react';
import './AffixBanner.css';

//TODO: Affixes will be variable by season. This needs to change.
const affixColorMapping = {
    //Alternating by Week
    'Fortified': '#00FFCE',
    'Tyrannical': '#00FFCE',

    //Easy
    'Volcanic': '#3dff00',
    'Storming': '#3dff00',

    //Medium
    'Explosive': '#Ffa800',
    'Spiteful': '#Ffa800',
    'Bolstering': '#Ffa800',
    'Grievous': '#Ffa800',
    'Bursting': '#Ffa800',

    //Hard
    'Raging': '##FF0037',
    'Quaking': '#FF0037',
    'Sanguine': '#FF0037',

    //Seasonal
    'Thundering':'#3399dd',

    '': 'white'
  };


const parseAffixes = (affixesString) => {
    console.log("affixesString value:", affixesString);
    console.log("affixesString type:", typeof affixesString);
    return affixesString.split(`, `).map(affix => affix.trim());
};


//component starts here
const AffixBanner = ({ affixes }) => {
    
    const affixNames = parseAffixes(affixes);
    

    return(
            <div className="affix-header" style={{ backgroundColor: '#282a36' }}> 
                {affixNames.reduce((acc, affix, index) => {

            acc.push(
                <span key={affix} style={{ color: affixColorMapping[affix], marginLeft: '6px', marginRight:'6px'}}>
                {affix}
                </span>
            );

            if (index !== affixNames.length - 1) {
                acc.push(' ');
            }
            return acc;
            }, [])}
            </div>  

    );

};

export default AffixBanner;