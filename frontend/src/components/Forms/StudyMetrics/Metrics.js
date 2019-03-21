import React, { Fragment, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/styles'
import { KeyboardArrowLeft as LeftIcon, KeyboardArrowRight as RightIcon } from '@material-ui/icons'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import { Grid, Card, CardHeader, CardContent, CardActions, Divider, Button } from '@material-ui/core'
import { ApiContext } from '../../../contexts/ApiContext'
import Subheading from '../../Typography/Subheading'
import StudyCharacteristicsForm from './Characterstics'
import LinkedStudiesForm from './LinkedStudies'
import StudyArchitectureForm from './Architecture'
import StudyFundingForm from './Funding'

export const MetricsFormContext = React.createContext({})

const useStyles = makeStyles(theme => ({
    navigation: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    formContainer: {
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}))

const emptyFormValues = ({
    proposalID: null,
    // Characteristics
    network: '',
    primaryStudyType: '',
    tic: '',
    ric: '',
    collaborativeTic: '',
    collaborativeTicDetails: '',
    dcc: '',
    ccc: '',
    // Linked Data
    hasSuperStudy: '',
    superStudy: '',
    hasSubStudy: '',
    subStudy: '',
    studyDesign: '',
    // Architecture
    isRandomized: '',
    randomizationUnit: '',
    randomizationFeatures: [],
    ascertainment: '',
    phase: '',
    usesRegistryData: '',
    usesEhrDataTransfer: '',
    ehrDataTransferType: '',
    isConsentRequired: '',
    efic: '',
    irbTypes: [],
    regulatoryClassifications: [],
    clinicalTrialsGovId: '',
    isDsmbDmcRequired: '',
    // Funding
    pilotOrDemo: '',
    initialParticipatingSiteNumber: '',
    enrollmentGoal: '',
    initialProjectedEnrollmentDuration: '',
    leadPiNames: '',
    awardeeSiteAcronym: '',
    primaryFundingType: '',
    primarilyFundedByInfrastructure: '',
    fundingSource: '',
    fundingAwardDate: '',
    previousFunding: '',
})

const MetricsForm = props => {
    const { proposalID } = props
    const [values, setValues] = useState(emptyFormValues)
    const [currentSubformNumber, setCurrentSubformNumer] = useState(0)
    const api = useContext(ApiContext)
    const classes = useStyles()
    
    useEffect(() => {
        setCurrentSubformNumer(0)
        setValues({ ...emptyFormValues, proposalID: proposalID })
    }, [props.proposalID])

    const handleNavigate = value => event => {
        setCurrentSubformNumer((currentSubformNumber + value + subformHeaders.length) % subformHeaders.length)
    }

    const handleSave = () => {
        console.log(values)
        axios.post(api.studyMetrics, values)
            .then(response => console.log(response))
            .catch(error => console.log('Error', error))
    }

    const subformHeaders = ['Study Characteristics', 'Linked Studies', 'Study Architecture', 'Study Funding']
    
    const formNavigation = (
        <Fragment>
            <Button disabled={ currentSubformNumber === 0 } color="secondary" onClick={ handleNavigate(-1) }>
                <LeftIcon />
                { currentSubformNumber > 0 ? subformHeaders[currentSubformNumber - 1] : null }
            </Button>
            <div className="flexer"/>
            <Button disabled={ currentSubformNumber === subformHeaders.length - 1 } color="secondary" onClick={ handleNavigate(1) }>
                { currentSubformNumber < subformHeaders.length ? subformHeaders[currentSubformNumber + 1] : null }
                <RightIcon />
            </Button>
        </Fragment>
    )

    return (
        <MetricsFormContext.Provider value={ [values, setValues] }>
            <div style={{ width: '100%' }}>
                <CardActions className={ classes.navigation }>
                    { formNavigation }
                </CardActions>
                <CardHeader style={{textAlign: 'center' }} title={ subformHeaders[currentSubformNumber] } />
                <CardContent className={ classes.formContainer }>
                    { currentSubformNumber === 0 && <StudyCharacteristicsForm /> }
                    { currentSubformNumber === 1 && <LinkedStudiesForm /> }
                    { currentSubformNumber === 2 && <StudyArchitectureForm /> }
                    { currentSubformNumber === 3 && <StudyFundingForm /> }
                </CardContent>
                <CardActions className={ classes.navigation }>
                    { formNavigation }
                </CardActions>
                <Divider />
                <CardActions className={ classes.actions }>
                    <Button color="primary" onClick={ handleSave }>Save</Button>
                </CardActions>
            </div>
        </MetricsFormContext.Provider>
    )
}

export default MetricsForm