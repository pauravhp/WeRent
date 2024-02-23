import { Typography, Box, Container, Paper, styled, AppBar } from '@mui/material';

/*
RUN THIS COMMAND:
npm install @mui/material/Typography @mui/material/Box @mui/material/Container @mui/material/Paper @mui/material/styled @mui/material/AppBar
*/
function App() {

  const MyBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'black', // Change background color to black
  }));

  return (
    <Container>
      <Container>
        <MyBar sx={{ p: 1, textAlign: "left" }} >
          <Typography variant="h4" sx={{ p: 1, textAlign: "left" }}> WERENT</Typography>
        </MyBar>
        <Typography variant="h4" sx={{ p: 1, textAlign: "center" }}> testing</Typography>
      </Container>

      <Box sx={{ pt: 4, display: 'flex', flexDirection: 'row', justifyContent: "space-between", gap: 4 }}>

        <Paper elevation={24}>
          <Typography variant="h3" sx={{ p: 1, textAlign: "center" }}> FOR RENT</Typography>

          <Typography variant="h6" sx={{ p: 1, textAlign: "left" }}>
            Address: 123 Main St, Anytown, USA
            <br />
            Price: $1,500 per month

            <br />
            Location: Anytown, USA
            <br />
            <br />
            Description: Welcome to 123 Main St, a charming two-bedroom, one-bathroom apartment located in the heart of Anytown, USA. This unit boasts a spacious living area, a fully-equipped kitchen, and large windows that let in plenty of natural light. The bedrooms are generously-sized and feature ample closet space.
            <br />
            <br />
            Amenities:&emsp;&bull; Fully-furnished <br /> &emsp;&bull; Washer/Dryer in unit <br /> &emsp;&bull; Central A/C and heating <br /> &emsp;&bull; Private balcony<br /> &emsp;&bull;Secure building with intercom system
            <br />
            <br />
            Nearby: Walking distance to Anytown University <br /> &emsp;&bull; Close to restaurants, shops, and parks <br /> &emsp;&bull;Easy access to public transportation
            <br />
            <br />
            This apartment is perfect for students or young professionals looking for a convenient and comfortable living space in a vibrant neighborhood. Contact us today to schedule a viewing!</Typography>
        </Paper>
        <Paper elevation={24}>
          <Typography variant="h3" sx={{ p: 1, textAlign: "center" }}> FOR RENT</Typography>
          <Typography variant="h6" sx={{ p: 1, textAlign: "left" }}>
            Address: 456 Elm St, Anytown, USA
            <br />
            Price: $1,800 per month
            <br />
            Location: Anytown, USA
            <br />
            <br />
            Description: Welcome to 456 Elm St, a charming two-bedroom, one-bathroom apartment located in the heart of Anytown, USA. This unit boasts a spacious living area, a fully-equipped kitchen, and large windows that let in plenty of natural light. The bedrooms are generously-sized and feature ample closet space.
            <br />
            <br />
            Amenities:&emsp;&bull; Fully-furnished <br /> &emsp;&bull; Washer/Dryer in unit <br /> &emsp;&bull; Central A/C and heating <br /> &emsp;&bull; Private balcony<br /> &emsp;&bull;Secure building with intercom system
            <br />
            <br />
            Nearby: Walking distance to Anytown University <br /> &emsp;&bull; Close to restaurants, shops, and parks <br /> &emsp;&bull;Easy access to public transportation
            <br />
            <br />
            This apartment is perfect for students or young professionals looking for a convenient and comfortable living space in a vibrant neighborhood. Contact us today to schedule a viewing!</Typography>
        </Paper>
      </Box>
    </Container>

  )

}

export default App;

