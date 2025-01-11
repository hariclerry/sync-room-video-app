import { Grid, GridItem } from '@chakra-ui/react';
import Sidebar from '../components/sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"navbar"
               "main"`,
          md: `"navbar navbar"
             "sidebar main"`,
        }}
        gridTemplateRows={{ base: '60px 1fr', md: '52px 1fr' }}
        gridTemplateColumns={{ base: '1fr', md: '280px 1fr' }}
        h="100vh"
      >
        <>
          <GridItem
            area="navbar"
            bg="#222529"
            color="white"
            paddingX={5}
            pt={2}
            w="100vw"
            position={'fixed'}
            zIndex={100}
          >
            <Navbar />
          </GridItem>

          <GridItem area="sidebar" bg="#222529" pl={5} pt="25px">
            <Sidebar />
          </GridItem>
        </>

        {/* Main Content */}
        <GridItem
          area="main"
          bg="#18181b"
          mt={19}
          display="flex"
          width="100%"
          justifyContent={'center'}
        >
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
