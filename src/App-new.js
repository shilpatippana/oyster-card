import React, {
    Component
} from 'react';
import './App.css';
import OysterCard, {
    STATIONS
} from './oyster-card';

class App extends Component {
    constructor(props) {
        super(props);

        this.card = new OysterCard(100);
        this.state = {
            credit: 100,
            fare: 0,
            pickedStatStation: false,
            pickedExitStation: false,
            pickedJourneyType: false,
            journeyType: 'Tube'
        }
    }

    setStartJourney = (event) => {
        this.card.startJourney(STATIONS[event.target.value]);
        this.setState({
            credit: this.card.getCredit(),
            fare: this.card.getFare()
        })
    }

    setExitJourney = (event) => {
        if (this.state.journeyType == 'Bus')
            this.card.setBusJourney()
        else
            this.card.exitJourney(STATIONS[event.target.value]);

        console.log(this.card);
        this.setState({
            credit: this.card.getCredit(),
            fare: this.card.getFare()
        })
    }

    handleOptionChange = (event) => {
        this.setState({
            journeyType: event.target.value
        })
    }

    render() {
        return ( <
            div className = "App" >
            <
            div className = "App-header" >
            <
            h1 > Oyster Card < /h1> <
            p > Current credit: {
                this.state.credit
            } < /p> <
            p > Current fare: {
                this.state.fare
            } < /p> <
            p > < /p> <
            /div> <
            h1 > pick stating station < /h1> <
            div className = "App-intro" >
            <
            ul >
            <
            li > < button value = {
                "Holborn"
            }
            onClick = {
                this.setStartJourney
            } > Holborn < /button></li >
            <
            li > < button value = {
                "EarlsCourt"
            }
            onClick = {
                this.setStartJourney
            } > Earl 's Court</button></li> <
            li > < button value = {
                "Wimbledon"
            }
            onClick = {
                this.setStartJourney
            } > Wimbledon < /button></li >
            <
            li > < button value = {
                "Hammersmith"
            }
            onClick = {
                this.setStartJourney
            } > Hammersmith < /button></li >
            <
            /ul> <
            /div> <
            h1 > pick journey type < /h1> <
            div className = "radio" >
            <
            label >
            <
            input type = "radio"
            value = "Tube"
            onChange = {
                this.handleOptionChange
            }
            checked = {
                this.state.journeyType === 'Tube'
            }
            />
            Tube <
            /label> <
            /div> <
            div className = "radio" >
            <
            label >
            <
            input type = "radio"
            value = "Bus"
            onChange = {
                this.handleOptionChange
            }
            checked = {
                this.state.journeyType === 'Bus'
            }
            />
            Bus <
            /label> <
            /div> <
            h1 > pick destination < /h1> <
            div className = "App-intro" >
            <
            ul >
            <
            li > < button value = {
                "Holborn"
            }
            onClick = {
                this.setExitJourney
            } > Holborn < /button></li >
            <
            li > < button value = {
                "EarlsCourt"
            }
            onClick = {
                this.setExitJourney
            } > Earl 's Court</button></li> <
            li > < button value = {
                "Wimbledon"
            }
            onClick = {
                this.setExitJourney
            } > Wimbledon < /button></li >
            <
            li > < button value = {
                "Hammersmith"
            }
            onClick = {
                this.setExitJourney
            } > Hammersmith < /button></li >
            <
            /ul> <
            /div> <
            /div>

        );
    }
}

export default App;