import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withTheme} from "@material-ui/core/styles/index";
import Odds from "./Odds";
import CorrectScoreOutcomeCell from './CorrectScoreOutcomeCell';

class CorrectScoreOutcomes extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            marketId: props.marketId,
            outcomesArr: props.outcomesArr,
            fractional: props.fractional,
            odds: {},
            homeScoreArray: CorrectScoreOutcomes.createScoreArray("home"),
            drawScoreArray: CorrectScoreOutcomes.createScoreArray("draw"),
            awayScoreArray: CorrectScoreOutcomes.createScoreArray("away")
        };
    };

    static getDerivedStateFromProps(props, state) {
        if (props.marketId !== state.marketId || props.outcomesArr !== state.outcomesArr|| props.fractional !== state.fractional) {
            return {
                marketId: props.marketId,
                outcomesArr: props.outcomesArr,
                fractional: props.fractional,
                odds: new Odds(props.outcomesArr, props.fractional)
            }
        }
        return null;
    }

    static createScoreArray(type){
        let scoresArray = [];
        let score1;
        let score2;
        switch(type){
            case "home":
                score1 = 1;
                score2 = 0;
                for (let i = 10; i < 990; i += 10){
                    scoresArray.push({
                        displayOrder: i,
                        displayScore: score1 + "-" + score2,
                        displayOdds: "-"
                    });
                    if (score1-score2 === 1){
                        score1++;
                        score2 = 0;
                    } else {
                        score2++;
                    }
                }
                return scoresArray;
            case "draw":
                score1 = 0;
                score2 = 0;
                for (let i = 1010; i < 1990; i += 10){
                    scoresArray.push({
                        displayOrder: i,
                        displayScore: score1 + "-" + score2,
                        displayOdds: "-"
                    });
                    score1++;
                    score2++;
                }
                return scoresArray;
            case "away":
                score1 = 0;
                score2 = 1;
                for (let i = 2000; i < 3000; i += 10){
                    scoresArray.push({
                        displayOrder: i,
                        displayScore: score1 + "-" + score2,
                        displayOdds: "-"
                    });
                    if (score2-score1 === 1){
                        score2++;
                        score1 = 0;
                    } else {
                        score1++;
                    }
                }
                return scoresArray;
            default:
                break;
        }
    }

    static createFilteredIndexedOutcomeArray(outcomeArray, outcomeType){
        let filteredIndexArray = [];

        for (let i = 0; i < outcomeArray.length; i++){
            if (outcomeArray[i].type === outcomeType){
                filteredIndexArray.push({
                    outcomeIndex: i,
                    outcome: outcomeArray[i],
                })
            }
        }
        return filteredIndexArray;
    }

    enrichDisplayScoresWithOdds(displayScores, oddsArray){
        for(let i = 0; i < oddsArray.length; i++){
            const index = displayScores.findIndex(displayScore => displayScore.displayOrder === oddsArray[i].outcome.displayOrder);
            displayScores[index].displayOdds = this.state.odds.getOddsString(oddsArray[i].outcomeIndex);
        }
    }

    render() {
        let outcomeArray = this.state.outcomesArr;//this.state.outcomes[this.state.marketId];
        let allOddsArray = [];

        if (typeof outcomeArray !== 'undefined' && outcomeArray.length > 0){

            let homeOddsArray = CorrectScoreOutcomes.createFilteredIndexedOutcomeArray(outcomeArray, "home");
            let drawOddsArray = CorrectScoreOutcomes.createFilteredIndexedOutcomeArray(outcomeArray, "draw");
            let awayOddsArray = CorrectScoreOutcomes.createFilteredIndexedOutcomeArray(outcomeArray, "away");

            const maxHomeOutcomeDisplayOrder = homeOddsArray
                .reduce( (prev, current)=> (prev.outcome.displayOrder > current.outcome.displayOrder) ? prev : current)
                .outcome.displayOrder;

            const maxDrawOutcomeDisplayOrder = drawOddsArray
                .reduce( (prev, current)=> (prev.outcome.displayOrder > current.outcome.displayOrder) ? prev : current)
                .outcome.displayOrder;

            const maxAwayOutcomeDisplayOrder = awayOddsArray
                .reduce( (prev, current)=> (prev.outcome.displayOrder > current.outcome.displayOrder) ? prev : current)
                .outcome.displayOrder;


            const maxHomeIndex = this.state.homeScoreArray.findIndex(score=> score.displayOrder === maxHomeOutcomeDisplayOrder);
            const maxDrawIndex =  this.state.drawScoreArray.findIndex(score=> score.displayOrder === maxDrawOutcomeDisplayOrder);
            const maxAwayIndex =  this.state.awayScoreArray.findIndex(score=> score.displayOrder === maxAwayOutcomeDisplayOrder);

            const matrixLength = Math.max(...[maxHomeIndex, maxDrawIndex, maxAwayIndex]) + 1;
            let displayHomeScores = this.state.homeScoreArray.slice(0, matrixLength);
            let displayDrawScores = this.state.drawScoreArray.slice(0, matrixLength);
            let displayAwayScores = this.state.awayScoreArray.slice(0, matrixLength);

            this.enrichDisplayScoresWithOdds(displayHomeScores, homeOddsArray);
            this.enrichDisplayScoresWithOdds(displayDrawScores, drawOddsArray);
            this.enrichDisplayScoresWithOdds(displayAwayScores, awayOddsArray);

            for(let i = 0; i < matrixLength; i++){
                let odds = {
                    home: displayHomeScores[i],
                    draw: displayDrawScores[i],
                    away: displayAwayScores[i]
                };
                allOddsArray.push(odds);
            }

            return (
                <Fragment>
                    <Grid container spacing={8} justify="space-between" direction='column' >

                        <Grid item >
                            <Grid container direction= 'row'>
                                <Grid item xs>
                                    <Typography color="primary" component="p" variant='body2' align='center'>
                                        Home
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Typography color="primary" component="p" variant='body2' align='center'>
                                        Draw
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Typography color="primary" component="p" variant='body2' align='center'>
                                        Away
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider/>
                        </Grid>

                        <Grid item >
                            <Grid container spacing={8} justify="space-between" direction='column' >
                                { allOddsArray.map( (odds, index) => (
                                    <Grid key={ index } item>
                                        <Grid  container spacing={8} direction='row' >
                                            <CorrectScoreOutcomeCell
                                                cellContents={odds.home}
                                            />
                                            <CorrectScoreOutcomeCell
                                                cellContents={odds.draw}
                                            />
                                            <CorrectScoreOutcomeCell
                                                cellContents={odds.away}
                                            />
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Fragment>
            )
        } else {
            return (<Fragment/>)
        }
    }
}

CorrectScoreOutcomes.propTypes = {
    marketId: PropTypes.number.isRequired,
    outcomesArr: PropTypes.array.isRequired,
    fractional: PropTypes.bool.isRequired
};

export default withTheme()(CorrectScoreOutcomes);