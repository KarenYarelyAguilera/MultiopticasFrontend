import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const steps = [
  {
    label: 'Registro',
    description: `Rellene todos los campos`,
  },
  {
    label: 'Datos Personales',
    description: 'Rellene todos los campos',
  },
];

export default function VerticalLinearStepper({ activeStep, indexx }) {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <Box sx={{ width: 700 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Información completa</Typography>
        </Paper>
      )}
      {/* <div className="btnStepper">
        <Button className="btnNext" onClick={handleNext}>
          Continue
        </Button>
        <Button className="btnBack" onClick={handleBack}>
          Back
        </Button>
      </div> */}
    </Box>
  );
}
