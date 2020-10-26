import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
    labels: {
        '& > *':{
            color: 'white'
        },
        color: 'white'
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    grid: {
        marginTop: '5%',
        display: 'flex',
    }
}));

function Robo() {
    const classes = useStyles();

    const [disableBtns, setDisableBtns] = useState(true);
    const [X,setX] = useState(0);
    const [Y,setY] = useState(0);
    const [direction,setDirection] = useState('');
    const [msg, setMsg] = useState('');
    const [displayMsg,setDisplayMsg] = useState(false);
    const [isInvalidMove,setIsInvalidMove] = useState(false);

    const onXChange = (e) => {
        if(e.target.value === '') setX(e.target.value);
        else setX(parseInt(e.target.value));
    }

    const onYChange = (e) => {
        if(e.target.value === '') setY(e.target.value);
        else setY(parseInt(e.target.value));
    }

    const handleDirectionChange = (event) => {
        setDirection(event.target.value);
    };

    const onPlaceClick = () => {
        if((X === null || X > 4) || (Y === null || Y > 4) || direction === '') { 
            setDisableBtns(true);
            setIsInvalidMove(true);
            setMsg('Invalid move!');
        }
        else {
            setMsg('');
            setDisableBtns(false);
        }
    }

    const onReportClick = () => {
        console.log(X,Y,direction);
        if(!isInvalidMove) {
            const msg = `Robot is at ${X} ${Y} ${direction}`;
            setMsg(msg);
        }
        setDisplayMsg(true);
    }

    const getDirection = (currentDirection,moveTo) => {
        switch(currentDirection) {
            case 'East':{
                if(moveTo === 'left'){
                    return 'North';
                } else {
                    return 'South';
                }
            }
            case 'West':{
                if(moveTo === 'left'){
                    return 'South';
                } else {
                    return 'North';
                }
            }
            case 'North':{
                if(moveTo === 'left'){
                    return 'West';
                } else {
                    return 'East';
                }
            }
            case 'South':{
                if(moveTo === 'left'){
                    return 'East';
                } else {
                    return 'West';
                }
            }
            default :
                return '';
        }
    }

    const onLeftClick = () => {
        setDisplayMsg(false);
        const changeDirection = getDirection(direction,'left');
        setDirection(changeDirection);
        setIsInvalidMove(false);
    }

    const onRightClick = () => {
        setDisplayMsg(false);
        const changeDirection = getDirection(direction,'right');
        setDirection(changeDirection);
        setIsInvalidMove(false);
    }

    const onMoveClick = () => {
        setDisplayMsg(false);        
        if((Y === 0 && direction === 'South') || (X === 0 && direction === 'West') || (Y === 4 && direction === 'North') || (X === 4 && direction === 'East')) {
            setMsg('Invalid move!');
            setIsInvalidMove(true);
        } else {
            setIsInvalidMove(false);
            if(direction === 'North') {
                setY(Y+1);
            } else if (direction === 'South') {
                setY(Y-1);
            } else if(direction === 'East') {
                setX(X+1);
            } else if(direction === 'West') {
                setX(X-1);
            }
        }
    }

    return(
        <Container maxWidth="md">
            <Grid item xs={12} className='flex'>
                <Grid item xs={8} md={10} className='flex'>
                        <Grid item xs={4}><TextField data-testid="input-x" id="input-x" name="input-x" type="number" value={X} label="X" className={classes.labels} onChange={(e) => onXChange(e)} /></Grid>
                        <Grid item xs={4}><TextField data-testid="input-y" name="input-y" type="number" value={Y} label="Y" className={classes.labels} onChange={(e) => onYChange(e)} /></Grid>
                        <Grid item xs={4}>
                            <InputLabel className={classes.labels}>Direction</InputLabel>
                            <Select
                                data-testid="select-direction"
                                className="w-90 labels"
                                labelId="demo-simple-select-label"
                                id="select-label"
                                value={direction}
                                onChange={handleDirectionChange}
                                >
                                <MenuItem value='East'>East</MenuItem>
                                <MenuItem value='West'>West</MenuItem>
                                <MenuItem value='North'>North</MenuItem>
                                <MenuItem value='South'>South</MenuItem>
                            </Select>
                        </Grid>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Button variant="contained" color="primary" className='full-width place' onClick={onPlaceClick}>
                        Place
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.grid}>
                <Grid item xs={8} md={10} className='flex'>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" disabled={disableBtns} onClick={onLeftClick} className='w-90'>
                            Left
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" disabled={disableBtns} onClick={onRightClick} className='w-90'>
                            Right
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={onMoveClick} disabled={disableBtns} className='w-90 move'>
                            Move
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Button variant="contained" color="primary" disabled={disableBtns} onClick={onReportClick} className='w-90 report'>
                        Report
                    </Button>
                </Grid>
            </Grid>
            {displayMsg && <Grid item xs={12} className={classes.grid}>
            <Chip
              label={msg}
              className='full-width chip-msg'
            />
        </Grid> }
        </Container>
    )
}

export default Robo;