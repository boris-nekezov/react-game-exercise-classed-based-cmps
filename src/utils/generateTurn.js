const generateTurn = (isPlayer, mode, units) => {

    let text = null;

    switch(mode) {
        case 'playerHits':
            text = `Player hits Monster for ${units}`;
            break;
        case 'playerHeals':
            text = `Player heals himself for ${units}`;
            break;
        case 'monsterHits':
            text = `Player heals himself for ${units}`;
            break;
        default: 
            text = `Wrong parameter! Use of the followings: "playerHits", "playerHeals", "monsterHits"`;  
    }

    return {
        isPlayer,
        text 
    }
}

export default generateTurn;